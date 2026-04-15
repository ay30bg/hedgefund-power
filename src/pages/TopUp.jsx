import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topup.css";
import { FiArrowLeft, FiCreditCard, FiDollarSign } from "react-icons/fi";

const TopUp = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");

  const walletAddress = "0xA1B2C3D4E5F6G7H8";

  return (
    <div className="topup-page">

      {/* HEADER */}
      <div className="topup-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Top-up</h2>
      </div>

      {/* CARD */}
      <div className="topup-card">

        <div className="topup-item">
          <FiCreditCard />
          <div>
            <h4>Payment Method</h4>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="crypto">Crypto</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div className="topup-item">
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

        {method === "crypto" && (
          <div className="topup-item">
            <FiCreditCard />
            <div>
              <h4>Wallet Address</h4>
              <p className="wallet">{walletAddress}</p>
              <span>Send only USDT (TRC20)</span>
            </div>
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button className="primary-btn">
        Confirm Top-up
      </button>

    </div>
  );
};

export default TopUp;
