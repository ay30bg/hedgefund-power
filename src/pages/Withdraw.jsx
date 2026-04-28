import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/withdraw.css";
import { FiArrowLeft } from "react-icons/fi";
import { useCurrency } from "../context/CurrencyContext";

const Withdraw = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fee = amount ? amount * 0.05 : 0;
  const receive = amount ? amount - fee : 0;

  const formatLocal = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString()}`;

  // =========================
  // HANDLE WITHDRAWAL
  // =========================
  const handleWithdraw = async () => {
    if (!amount || amount < 20) {
      return alert("Minimum withdrawal is $20");
    }

    if (!wallet || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            amount: Number(amount),
            walletAddress: wallet,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Withdrawal failed");
      }

      alert("Withdrawal request submitted. Awaiting admin approval.");

      // reset form
      setAmount("");
      setWallet("");
      setPassword("");

      navigate("/profile");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <label>Enter Amount (USD)</label>

        <input
          type="number"
          placeholder="Minimum $20"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {amount && (
          <p className="converted">
            ≈{" "}
            <span className="converted-value">
              {formatLocal(amount)}
            </span>
          </p>
        )}
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

      {/* SUMMARY */}
      <div className="summary-box">
        <div>
          <span>Fee (5%)</span>
          <span>${fee.toFixed(2)}</span>
        </div>

        <div>
          <span>You Receive</span>
          <span>${receive.toFixed(2)}</span>
        </div>

        {amount && (
          <div className="local-preview">
            ≈ {formatLocal(receive)}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button
        className="primary-btn"
        onClick={handleWithdraw}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Withdrawal"}
      </button>

    </div>
  );
};

export default Withdraw;
