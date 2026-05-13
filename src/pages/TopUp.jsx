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
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // CREATE PAYMENT
  // ==============================
  const createPayment = async () => {
    setError("");

    // MINIMUM = $5
    if (!amount || Number(amount) < 5) {
      return setError("Minimum deposit is $5");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "User not authenticated. Please login again."
        );
      }

      const res = await fetch(
        `${API_URL}/api/payments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Payment creation failed"
        );
      }

      setPaymentData(data);

      setStatus(data.payment_status || "waiting");
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
    if (!paymentData?.paymentId) return;

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_URL}/api/payments/status/${paymentData.paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setStatus(data.payment_status);

        if (
          data.payment_status === "finished" ||
          data.payment_status === "failed" ||
          data.payment_status === "expired"
        ) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentData]);

  // ==============================
  // COPY ADDRESS
  // ==============================
  const copyAddress = async () => {
    if (!paymentData?.address) return;

    try {
      await navigator.clipboard.writeText(
        paymentData.address
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // ==============================
  // COPY MEMO
  // ==============================
  const copyMemo = async () => {
    if (!paymentData?.memo) return;

    try {
      await navigator.clipboard.writeText(
        paymentData.memo
      );

      setCopiedMemo(true);

      setTimeout(() => {
        setCopiedMemo(false);
      }, 2000);
    } catch (err) {
      console.error("Copy memo failed", err);
    }
  };

  return (
    <div className="topup-page">

      {/* HEADER */}
      <div className="topup-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>

        <h2>Top-Up</h2>
      </div>

      {/* AMOUNT INPUT */}
      <div className="section">
        <label>Enter Amount (USD)</label>

        <input
          type="number"
          placeholder="Minimum $5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {amount && (
          <p className="converted">
            ≈{" "}
            <span className="converted-value">
              {currency.symbol}
              {(
                amount * currency.rate
              ).toLocaleString()}
            </span>
          </p>
        )}

        {/* QUICK AMOUNTS */}
        <div className="quick-amounts">
          {[10, 50, 100, 500, 1000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
            >
              ${amt}
            </button>
          ))}
        </div>

        {error && (
          <p className="error-text">{error}</p>
        )}
      </div>

      {/* GENERATE BUTTON */}
      {!paymentData && (
        <button
          className="primary-btn"
          onClick={createPayment}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate TON Address"}
        </button>
      )}

      {/* PAYMENT DETAILS */}
      {paymentData && (
        <>

          {/* ADDRESS */}
          <div className="section">
            <label>
              Deposit Address (USDT - TON)
            </label>

            <div className="wallet-box">
              <span>{paymentData.address}</span>

              <button onClick={copyAddress}>
                <FiCopy />
              </button>
            </div>

            {copied && (
              <p className="success-text">
                Address copied!
              </p>
            )}
          </div>

          {/* MEMO */}
          {paymentData.memo && (
            <div className="section">
              <label>TON Memo / Comment</label>

              <div className="wallet-box">
                <span>{paymentData.memo}</span>

                <button onClick={copyMemo}>
                  <FiCopy />
                </button>
              </div>

              {copiedMemo && (
                <p className="success-text">
                  Memo copied!
                </p>
              )}

              <p className="warning">
                ⚠️ Include this memo/comment when
                sending USDT TON
              </p>
            </div>
          )}

          {/* AMOUNT */}
          <div className="section">
            <label>Amount to Send</label>

            <div className="wallet-box">
              <span>
                {paymentData.amount} USDT
              </span>
            </div>
          </div>

          {/* QR CODE */}
          {paymentData.address && (
            <div className="section qr-section">
              <label>Scan QR Code</label>

              <div className="qr-wrapper">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    `${paymentData.address}?amount=${paymentData.amount}`
                  )}`}
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
                {status === "waiting" &&
                  "Waiting for payment..."}

                {status === "confirming" &&
                  "Confirming transaction..."}

                {status === "finished" &&
                  "Payment confirmed ✅"}

                {status === "failed" &&
                  "Payment failed ❌"}

                {status === "expired" &&
                  "Payment expired ⏱️"}
              </strong>
            </p>
          </div>
        </>
      )}

      {/* INFO */}
      <div className="info-box">
        <p>• Send only USDT (TON Network)</p>

        <p>
          • Sending via wrong network may result
          in loss of funds
        </p>

        <p>• Minimum deposit: $5</p>

        <p>
          • Funds are credited after admin approval
        </p>
      </div>

      {/* WARNING */}
      <p className="warning">
        ⚠️ Only use TON Network. Do NOT use
        TRC20, ERC20, or BEP20.
      </p>
    </div>
  );
};

export default TopUp;
