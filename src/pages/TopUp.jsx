import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topup.css";
import { FiArrowLeft, FiCopy } from "react-icons/fi";
import { useCurrency } from "../context/CurrencyContext";

const API_URL = process.env.REACT_APP_API_URL;

const TopUp = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const [amount, setAmount] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // CREATE PAYMENT (JWT FIXED)
  // ==============================
  const createPayment = async () => {
    setError("");

    if (!amount || Number(amount) < 5) {
      return setError("Minimum deposit is $5");
    }

    try {
      setLoading(true);

      // ✅ GET TOKEN
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated. Please login again.");
      }

      const res = await fetch(`${API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Payment failed");

      setPaymentData(data);
      setStatus(data.payment_status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // POLL PAYMENT STATUS
  // ==============================
  useEffect(() => {
    if (!paymentData?.payment_id) return;

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_URL}/api/payments/status/${paymentData.payment_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setStatus(data.payment_status);

        if (data.payment_status === "finished") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [paymentData]);

  // ==============================
  // COPY ADDRESS
  // ==============================
  const copyAddress = () => {
    if (!paymentData?.pay_address) return;

    navigator.clipboard.writeText(paymentData.pay_address);
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
        <h2>Top-Up</h2>
      </div>

      {/* AMOUNT INPUT */}
      <div className="section">
        <label>Enter Amount (USD)</label>

        <input
          type="number"
          placeholder="Minimum $10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {amount && (
          <p className="converted">
            ≈{" "}
            <span className="converted-value">
              {currency.symbol}
              {(amount * currency.rate).toLocaleString()}
            </span>
          </p>
        )}

        {/* QUICK AMOUNTS */}
        <div className="quick-amounts">
          {[50, 100, 500, 1000].map((amt) => (
            <button key={amt} onClick={() => setAmount(amt)}>
              ${amt}
            </button>
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}
      </div>

      {/* GENERATE BUTTON */}
      {!paymentData && (
        <button
          className="primary-btn"
          onClick={createPayment}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Payment Address"}
        </button>
      )}

      {/* PAYMENT DETAILS */}
      {paymentData && (
        <>
          <div className="section">
            <label>Deposit Address (USDT - BEP20)</label>

            <div className="wallet-box">
              <span>{paymentData.pay_address}</span>
              <button onClick={copyAddress}>
                <FiCopy />
              </button>
            </div>

            {copied && <p className="success-text">Copied!</p>}
          </div>

          <div className="section">
            <label>Amount to Send</label>
            <div className="wallet-box">
              <span>{paymentData.pay_amount} USDT</span>
            </div>
          </div>

         {/* QR CODE */}
{paymentData.pay_address && (
  <div className="section qr-section">
    <label>Scan QR Code</label>

    <div className="qr-wrapper">
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${paymentData.pay_address}`}
        alt="QR Code"
      />
    </div>
  </div>
)}

          {/* STATUS */}
          <div className="info-box">
            <p>
              Status:{" "}
              <strong>
                {status === "waiting" && "Waiting for payment..."}
                {status === "confirming" && "Confirming transaction..."}
                {status === "finished" && "Payment confirmed ✅"}
                {status === "failed" && "Payment failed ❌"}
                {status === "expired" && "Payment expired ⏱️"}
              </strong>
            </p>
          </div>
        </>
      )}

      {/* INFO */}
      <div className="info-box">
        <p>• Send only USDT (BEP20 - BSC Network)</p>
        <p>• Sending via wrong network will result in loss of funds</p>
        <p>• Minimum deposit: $10</p>
        <p>• Funds arrive within 1–5 minutes</p>
      </div>

      {/* WARNING */}
      <p className="warning">
        ⚠️ Only use BSC (BEP20). Do NOT use TRC20 or ERC20.
      </p>

    </div>
  );
};

export default TopUp;
