import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topup.css";
import { FiArrowLeft, FiCopy } from "react-icons/fi";

const TopUp = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const walletAddress = "0xA1B2C3D4E5F6G7H8";

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="topup-page">

      {/* HEADER */}
      <div className="topup-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Deposit</h2>
      </div>

      {/* BALANCE */}
      <div className="balance-card">
        <p>Current Balance</p>
        <h1>$12,500</h1>
      </div>

      {/* AMOUNT */}
      <div className="section">
        <label>Enter Amount</label>
        <input
          type="number"
          placeholder="Minimum $10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* QUICK AMOUNTS */}
        <div className="quick-amounts">
          {[50, 100, 500, 1000].map((amt) => (
            <button key={amt} onClick={() => setAmount(amt)}>
              ${amt}
            </button>
          ))}
        </div>
      </div>

      {/* WALLET */}
      <div className="section">
        <label>Deposit Address (USDT - TRC20)</label>
        <div className="wallet-box">
          <span>{walletAddress}</span>
          <button onClick={copyAddress}>
            <FiCopy />
          </button>
        </div>
        {copied && <p className="success-text">Copied!</p>}
      </div>

      {/* INFO */}
      <div className="info-box">
        <p>• Send only USDT (TRC20)</p>
        <p>• Minimum deposit: $10</p>
        <p>• Funds arrive within 1–5 minutes</p>
      </div>

      {/* BUTTON */}
      <button className="primary-btn">
        I Have Made Payment
      </button>

    </div>
  );
};

export default TopUp;
