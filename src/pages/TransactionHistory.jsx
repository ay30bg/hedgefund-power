import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/transaction.css";
import {
  FiArrowLeft,
  FiArrowDownLeft,
  FiArrowUpRight
} from "react-icons/fi";

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 200,
    status: "success",
    date: "Apr 17, 2026",
  },
  {
    id: 2,
    type: "withdraw",
    amount: 150,
    status: "pending",
    date: "Apr 16, 2026",
  },
  {
    id: 3,
    type: "deposit",
    amount: 500,
    status: "failed",
    date: "Apr 15, 2026",
  },
];

const TransactionHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="tx-page">
      
      <div className="tx-header">
  <button className="back-btn" onClick={() => navigate(-1)}>
    <FiArrowLeft />
  </button>

  <h2>Transaction History</h2>
</div>

      {/* SUMMARY CARDS */}
<div className="tx-summary">
  <div className="summary-card">
    <p>Total Deposits</p>
    <h3>$700</h3>
  </div>

  <div className="summary-card">
    <p>Total Withdrawals</p>
    <h3>$150</h3>
  </div>
</div>

      {/* LIST */}
      <div className="tx-list">
        {transactions.map((tx) => (
          <div className="tx-card" key={tx.id}>
            
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
                <span className="tx-date">{tx.date}</span>
              </div>
            </div>

            <div className="tx-right">
              <p className={`tx-amount ${tx.type}`}>
                {tx.type === "deposit" ? "+" : "-"}${tx.amount}
              </p>

              <span className={`tx-status ${tx.status}`}>
                {tx.status}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default TransactionHistory;
