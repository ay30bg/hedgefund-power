import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/transaction.css";

import { useCurrency } from "../context/CurrencyContext";

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
  const { currency } = useCurrency(); // ✅ GLOBAL

  // ===== FORMATTER =====
  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

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
          <div className="value">
            +{format(totalDeposits)}
          </div>
        </div>

        <div className="summary-card withdrawals">
          <div className="label">Total Withdrawals</div>
          <div className="value">
            -{format(totalWithdrawals)}
          </div>
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

    </div>
  );
};

export default TransactionHistory;
