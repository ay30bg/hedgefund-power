import React, { useState } from "react";
import "../styles/topup.css";

const TopUp = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");

  const walletAddress = "0xA1B2C3D4E5F6G7H8";

  const handleTopUp = () => {
    if (!amount) return alert("Enter amount");
    alert(`Deposit $${amount} via ${method}`);
  };

  return (
    <div className="topup-page">
      <h2>Top-up</h2>

      {/* METHOD */}
      <div className="topup-card">
        <h4>Select Method</h4>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="crypto">Crypto</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      {/* AMOUNT */}
      <div className="topup-card">
        <h4>Enter Amount ($)</h4>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* WALLET */}
      {method === "crypto" && (
        <div className="topup-card">
          <h4>Wallet Address</h4>
          <p className="wallet">{walletAddress}</p>
          <span>Send only USDT (TRC20)</span>
        </div>
      )}

      {/* BUTTON */}
      <button className="topup-btn" onClick={handleTopUp}>
        Confirm Top-up
      </button>
    </div>
  );
};

export default TopUp;
