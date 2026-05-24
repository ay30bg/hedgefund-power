// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/transaction.css";

// import { useCurrency } from "../context/CurrencyContext";

// import {
//   FiArrowLeft,
//   FiArrowDownLeft,
//   FiArrowUpRight
// } from "react-icons/fi";

// const ITEMS_PER_PAGE = 6;

// const TransactionHistory = () => {
//   const navigate = useNavigate();
//   const { currency } = useCurrency();

//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [filter, setFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // ✅ GLOBAL SUMMARY FROM BACKEND
//   const [summary, setSummary] = useState({
//     totalDeposits: 0,
//     totalWithdrawals: 0,
//   });

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const API_URL = process.env.REACT_APP_API_URL;

//   // ===== FETCH =====
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(
//           `${API_URL}/api/transactions/${userId}?type=${filter}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         setTransactions(data.data);
//         setTotalPages(data.totalPages);

//         // ✅ FIXED GLOBAL TOTALS
//         setSummary({
//           totalDeposits: data.totalDeposits,
//           totalWithdrawals: data.totalWithdrawals,
//         });

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId && API_URL) fetchTransactions();
//   }, [userId, API_URL, token, filter, currentPage]);

//   // ===== FORMAT =====
//   const format = (value) =>
//     `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 2,
//     })}`;

//   // ===== DATE GROUP =====
//   const getDateLabel = (date) => {
//     const d = new Date(date);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     if (d.toDateString() === today.toDateString()) return "Today";
//     if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

//     return d.toLocaleDateString(undefined, {
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const groupedTransactions = transactions.reduce((acc, tx) => {
//     const label = getDateLabel(tx.date);

//     if (!acc[label]) acc[label] = [];
//     acc[label].push(tx);

//     return acc;
//   }, {});

//   return (
//     <div className="tx-page">

//       {/* HEADER */}
//       <div className="tx-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>
//         <h2>Transaction History</h2>
//       </div>

//       {/* SUMMARY (FIXED - FROM BACKEND) */}
//       <div className="tx-summary">
//         <div className="summary-card deposits">
//           <div className="label">Total Deposits</div>
//           <div className="value">
//             +{format(summary.totalDeposits)}
//           </div>
//         </div>

//         <div className="summary-card withdrawals">
//           <div className="label">Total Withdrawals</div>
//           <div className="value">
//             -{format(summary.totalWithdrawals)}
//           </div>
//         </div>
//       </div>

//       {/* FILTER */}
//       <div className="tx-filters">
//         <button
//           className={filter === "all" ? "active" : ""}
//           onClick={() => {
//             setFilter("all");
//             setCurrentPage(1);
//           }}
//         >
//           All
//         </button>

//         <button
//           className={filter === "deposit" ? "active" : ""}
//           onClick={() => {
//             setFilter("deposit");
//             setCurrentPage(1);
//           }}
//         >
//           Deposits
//         </button>

//         <button
//           className={filter === "withdraw" ? "active" : ""}
//           onClick={() => {
//             setFilter("withdraw");
//             setCurrentPage(1);
//           }}
//         >
//           Withdrawals
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="tx-list">

//         {loading ? (
//           <p className="tx-loading">Loading...</p>
//         ) : transactions.length === 0 ? (
//           <p className="tx-empty">No transactions found</p>
//         ) : (
//           Object.keys(groupedTransactions).map((date) => (
//             <div key={date}>

//               <p className="tx-date-group">{date}</p>

//               {groupedTransactions[date].map((tx) => (
//                 <div className="tx-card" key={tx.id}>

//                   <div className="tx-left">
//                     <div className={`tx-icon ${tx.type}`}>
//                       {tx.type === "deposit" ? (
//                         <FiArrowDownLeft />
//                       ) : (
//                         <FiArrowUpRight />
//                       )}
//                     </div>

//                     <div>
//                       <p className="tx-type">
//                         {tx.type === "deposit" ? "Deposit" : "Withdraw"}
//                       </p>
//                       <span className="tx-date">
//                         {new Date(tx.date).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="tx-right">
//                     <p className={`tx-amount ${tx.type}`}>
//                       {tx.type === "deposit" ? "+" : "-"}
//                       {format(tx.amount)}
//                     </p>

//                     <span className={`tx-status ${tx.status}`}>
//                       {tx.status}
//                     </span>
//                   </div>

//                 </div>
//               ))}

//             </div>
//           ))
//         )}

//       </div>

//       {/* PAGINATION */}
//       {!loading && totalPages > 1 && (
//         <div className="tx-pagination">

//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(p => p - 1)}
//           >
//             Prev
//           </button>

//           <span>
//             {currentPage} / {totalPages}
//           </span>

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(p => p + 1)}
//           >
//             Next
//           </button>

//         </div>
//       )}

//     </div>
//   );
// };

// export default TransactionHistory;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/transaction.css";

import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";

import {
  FiArrowLeft,
  FiArrowDownLeft,
  FiArrowUpRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 6;

const TransactionHistory = () => {
  const navigate = useNavigate();

  const { currency } = useCurrency();

  const { userId, token } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ===== GLOBAL SUMMARY =====
  const [summary, setSummary] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
  });

  const API_URL = process.env.REACT_APP_API_URL;

  // ===== FETCH TRANSACTIONS =====
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/transactions/${userId}?type=${filter}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message || "Failed to fetch transactions");
          return;
        }

        setTransactions(data.data || []);

        setTotalPages(data.totalPages || 1);

        // ===== SUMMARY =====
        setSummary({
          totalDeposits: data.totalDeposits || 0,
          totalWithdrawals: data.totalWithdrawals || 0,
        });

      } catch (error) {
        console.error("TRANSACTION FETCH ERROR:", error);

      } finally {
        setLoading(false);
      }
    };

    if (userId && token && API_URL) {
      fetchTransactions();
    }
  }, [
    API_URL,
    userId,
    token,
    filter,
    currentPage,
  ]);

  // ===== FORMAT CURRENCY =====
  const format = (value) =>
    `${currency.symbol}${(
      value * currency.rate
    ).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  // ===== DATE LABEL =====
  const getDateLabel = (date) => {
    const d = new Date(date);

    const today = new Date();

    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (
      d.toDateString() === yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return d.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // ===== GROUP TRANSACTIONS =====
  const groupedTransactions =
    transactions.reduce((acc, tx) => {
      const label = getDateLabel(tx.date);

      if (!acc[label]) {
        acc[label] = [];
      }

      acc[label].push(tx);

      return acc;
    }, {});

  return (
    <div className="tx-page">

      {/* ===== HEADER ===== */}
      <div className="tx-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>

        <h2>Transaction History</h2>

      </div>

      {/* ===== SUMMARY ===== */}
      <div className="tx-summary">

        <div className="summary-card deposits">

          <div className="label">
            Total Deposits
          </div>

          <div className="value">
            +{format(summary.totalDeposits)}
          </div>

        </div>

        <div className="summary-card withdrawals">

          <div className="label">
            Total Withdrawals
          </div>

          <div className="value">
            -{format(summary.totalWithdrawals)}
          </div>

        </div>

      </div>

      {/* ===== FILTERS ===== */}
      <div className="tx-filters">

        <button
          className={
            filter === "all" ? "active" : ""
          }
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}
        >
          All
        </button>

        <button
          className={
            filter === "deposit"
              ? "active"
              : ""
          }
          onClick={() => {
            setFilter("deposit");
            setCurrentPage(1);
          }}
        >
          Deposits
        </button>

        <button
          className={
            filter === "withdraw"
              ? "active"
              : ""
          }
          onClick={() => {
            setFilter("withdraw");
            setCurrentPage(1);
          }}
        >
          Withdrawals
        </button>

      </div>

      {/* ===== TRANSACTION LIST ===== */}
      <div className="tx-list">

        {loading ? (

          <p className="tx-loading">
            Loading...
          </p>

        ) : transactions.length === 0 ? (

          <p className="tx-empty">
            No transactions found
          </p>

        ) : (

          Object.keys(groupedTransactions).map(
            (date) => (
              <div key={date}>

                <p className="tx-date-group">
                  {date}
                </p>

                {groupedTransactions[
                  date
                ].map((tx) => (
                  <div
                    className="tx-card"
                    key={tx._id || tx.id}
                  >

                    <div className="tx-left">

                      <div
                        className={`tx-icon ${tx.type}`}
                      >
                        {tx.type ===
                        "deposit" ? (
                          <FiArrowDownLeft />
                        ) : (
                          <FiArrowUpRight />
                        )}
                      </div>

                      <div>

                        <p className="tx-type">
                          {tx.type ===
                          "deposit"
                            ? "Deposit"
                            : "Withdraw"}
                        </p>

                        <span className="tx-date">
                          {new Date(
                            tx.date
                          ).toLocaleString()}
                        </span>

                      </div>

                    </div>

                    <div className="tx-right">

                      <p
                        className={`tx-amount ${tx.type}`}
                      >
                        {tx.type ===
                        "deposit"
                          ? "+"
                          : "-"}

                        {format(tx.amount)}
                      </p>

                      <span
                        className={`tx-status ${tx.status}`}
                      >
                        {tx.status}
                      </span>

                    </div>

                  </div>
                ))}

              </div>
            )
          )

        )}

      </div>

      {/* ===== PAGINATION ===== */}
      {!loading && totalPages > 1 && (

        <div className="tx-pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Prev
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
};

export default TransactionHistory;
