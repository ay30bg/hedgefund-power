// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/transaction.css";

// import { useCurrency } from "../context/CurrencyContext";

// import {
//   FiArrowLeft,
//   FiArrowDownLeft,
//   FiArrowUpRight
// } from "react-icons/fi";

// const TransactionHistory = () => {

//   const navigate = useNavigate();
//   const { currency } = useCurrency();

//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const API_URL = process.env.REACT_APP_API_URL;

//   // ===== FETCH FROM BACKEND =====
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await fetch(
//           `${API_URL}/api/transactions/${userId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch transactions");
//         }

//         const data = await res.json();
//         setTransactions(data);

//       } catch (err) {
//         console.error("Failed to fetch transactions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId && API_URL) fetchTransactions();
//   }, [userId, API_URL, token]);

//   // ===== FORMATTER =====
//   const format = (value) =>
//     `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 2,
//     })}`;

//   const totalDeposits = transactions
//     .filter(tx => tx.type === "deposit")
//     .reduce((sum, tx) => sum + tx.amount, 0);

//   const totalWithdrawals = transactions
//     .filter(tx => tx.type === "withdraw")
//     .reduce((sum, tx) => sum + tx.amount, 0);

//   return (
//     <div className="tx-page">

//       {/* HEADER */}
//       <div className="tx-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>

//         <h2>Transaction History</h2>
//       </div>

//       {/* SUMMARY */}
//       <div className="tx-summary">

//         <div className="summary-card deposits">
//           <div className="label">Total Deposits</div>
//           <div className="value">
//             +{format(totalDeposits)}
//           </div>
//         </div>

//         <div className="summary-card withdrawals">
//           <div className="label">Total Withdrawals</div>
//           <div className="value">
//             -{format(totalWithdrawals)}
//           </div>
//         </div>

//       </div>

//       {/* LIST */}
//       <div className="tx-list">

//         {loading ? (
//           <p className="tx-loading">Loading transactions...</p>
//         ) : transactions.length === 0 ? (
//           <p className="tx-empty">No transactions found</p>
//         ) : (
//           transactions.map((tx) => (
//             <div className="tx-card" key={tx._id || tx.id}>

//               <div className="tx-left">
//                 <div className={`tx-icon ${tx.type}`}>
//                   {tx.type === "deposit" ? (
//                     <FiArrowDownLeft />
//                   ) : (
//                     <FiArrowUpRight />
//                   )}
//                 </div>

//                 <div>
//                   <p className="tx-type">
//                     {tx.type === "deposit" ? "Deposit" : "Withdraw"}
//                   </p>
//                   <span className="tx-date">
//                     {new Date(tx.createdAt || tx.date).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>

//               <div className="tx-right">
//                 <p className={`tx-amount ${tx.type}`}>
//                   {tx.type === "deposit" ? "+" : "-"}
//                   {format(tx.amount)}
//                 </p>

//                 <span className={`tx-status ${tx.status}`}>
//                   {tx.status}
//                 </span>
//               </div>

//             </div>
//           ))
//         )}

//       </div>

//     </div>
//   );
// };

// export default TransactionHistory;

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/transaction.css";

import { useCurrency } from "../context/CurrencyContext";

import {
  FiArrowLeft,
  FiArrowDownLeft,
  FiArrowUpRight
} from "react-icons/fi";

const ITEMS_PER_PAGE = 6;

const TransactionHistory = () => {

  const navigate = useNavigate();
  const { currency } = useCurrency();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATES
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  // ===== FETCH =====
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/transactions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTransactions(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && API_URL) fetchTransactions();
  }, [userId, API_URL, token]);

  // ===== FORMAT =====
  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  // ===== FILTERED =====
  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter(tx => tx.type === filter);
  }, [transactions, filter]);

  // ===== PAGINATION =====
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  // ===== DATE LABEL =====
  const getDateLabel = (date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = d.toDateString() === today.toDateString();
    const isYesterday = d.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return d.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric"
    });
  };

  // ===== GROUP BY DATE =====
  const groupedTransactions = useMemo(() => {
    const groups = {};

    paginatedTransactions.forEach(tx => {
      const label = getDateLabel(tx.createdAt || tx.date);

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(tx);
    });

    return groups;
  }, [paginatedTransactions]);

  // ===== TOTALS =====
  const totalDeposits = transactions
    .filter(tx => tx.type === "deposit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalWithdrawals = transactions
    .filter(tx => tx.type === "withdraw")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="tx-page">

      {/* HEADER */}
      <div className="tx-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Transaction History</h2>
      </div>

      {/* SUMMARY */}
      <div className="tx-summary">
        <div className="summary-card deposits">
          <div className="label">Total Deposits</div>
          <div className="value">+{format(totalDeposits)}</div>
        </div>

        <div className="summary-card withdrawals">
          <div className="label">Total Withdrawals</div>
          <div className="value">-{format(totalWithdrawals)}</div>
        </div>
      </div>

      {/* ✅ FILTER */}
      <div className="tx-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}
        >
          All
        </button>

        <button
          className={filter === "deposit" ? "active" : ""}
          onClick={() => {
            setFilter("deposit");
            setCurrentPage(1);
          }}
        >
          Deposits
        </button>

        <button
          className={filter === "withdraw" ? "active" : ""}
          onClick={() => {
            setFilter("withdraw");
            setCurrentPage(1);
          }}
        >
          Withdrawals
        </button>
      </div>

      {/* LIST */}
      <div className="tx-list">

        {loading ? (
          <p className="tx-loading">Loading...</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="tx-empty">No transactions found</p>
        ) : (
          Object.keys(groupedTransactions).map(date => (
            <div key={date}>

              {/* DATE HEADER */}
              <p className="tx-date-group">{date}</p>

              {groupedTransactions[date].map((tx) => (
                <div className="tx-card" key={tx._id || tx.id}>

                  <div className="tx-left">
                    <div className={`tx-icon ${tx.type}`}>
                      {tx.type === "deposit" ? (
                        <FiArrowDownLeft />
                      ) : (
                        <FiArrowUpRight />
                      )}
                    </div>

                    <div>
                      <p className="tx-type">
                        {tx.type === "deposit" ? "Deposit" : "Withdraw"}
                      </p>
                      <span className="tx-date">
                        {new Date(tx.createdAt || tx.date).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="tx-right">
                    <p className={`tx-amount ${tx.type}`}>
                      {tx.type === "deposit" ? "+" : "-"}
                      {format(tx.amount)}
                    </p>

                    <span className={`tx-status ${tx.status}`}>
                      {tx.status}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          ))
        )}

      </div>

      {/* ✅ PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="tx-pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default TransactionHistory;
