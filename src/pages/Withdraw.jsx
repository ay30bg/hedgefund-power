import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/withdraw.css";
import { FiArrowLeft } from "react-icons/fi";

const Withdraw = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");

  const fee = amount ? (amount * 0.05).toFixed(2) : 0;
  const receive = amount ? (amount - fee).toFixed(2) : 0;

  return (
    <div className="withdraw-page">

      {/* HEADER */}
      <div className="withdraw-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Withdraw</h2>
      </div>

      {/* AMOUNT */}
      <div className="section">
        <label>Enter Amount</label>
        <input
          type="number"
          placeholder="Minimum $20"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* WALLET */}
      <div className="section">
        <label>Wallet Address</label>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="section">
        <label>Withdrawal Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* FEE BREAKDOWN */}
      <div className="summary-box">
        <div>
          <span>Fee (5%)</span>
          <span>${fee}</span>
        </div>
        <div>
          <span>You Receive</span>
          <span>${receive}</span>
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
