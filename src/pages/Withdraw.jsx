import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/withdraw.css";
import { FiArrowLeft, FiDollarSign, FiLock } from "react-icons/fi";

const Withdraw = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="withdraw-page">

      {/* HEADER */}
      <div className="withdraw-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Withdraw</h2>
      </div>

      {/* CARD */}
      <div className="withdraw-card">

        <div className="withdraw-item">
          <FiDollarSign />
          <div>
            <h4>Amount ($)</h4>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="withdraw-item">
          <FiDollarSign />
          <div>
            <h4>Wallet Address</h4>
            <input
              type="text"
              placeholder="Enter wallet address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
        </div>

        <div className="withdraw-item">
          <FiLock />
          <div>
            <h4>Withdrawal Password</h4>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* BUTTON */}
      <button className="primary-btn">
        Confirm Withdrawal
      </button>

    </div>
  );
};

export default Withdraw;
