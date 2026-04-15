import React, { useState } from "react";
import "../styles/withdraw.css";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");

  const handleWithdraw = () => {
    if (!amount || !wallet || !password) {
      return alert("All fields are required");
    }

    alert(`Withdraw $${amount} to ${wallet}`);
  };

  return (
    <div className="withdraw-page">
      <h2>Withdraw</h2>

      {/* AMOUNT */}
      <div className="withdraw-card">
        <h4>Amount ($)</h4>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* WALLET */}
      <div className="withdraw-card">
        <h4>Wallet Address</h4>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="withdraw-card">
        <h4>Withdrawal Password</h4>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button className="withdraw-btn" onClick={handleWithdraw}>
        Confirm Withdrawal
      </button>
    </div>
  );
};

export default Withdraw;
