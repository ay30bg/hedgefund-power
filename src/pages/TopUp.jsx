// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/topup.css";
// import { FiArrowLeft, FiCopy } from "react-icons/fi";
// import { useCurrency } from "../context/CurrencyContext";

// const TopUp = () => {
//   const navigate = useNavigate();
//   const { currency } = useCurrency(); // for conversion display only

//   const [amount, setAmount] = useState("");
//   const [copied, setCopied] = useState(false);

//   const walletAddress = "0xA1B2C3D4E5F6G7H8";

//   const copyAddress = () => {
//     navigator.clipboard.writeText(walletAddress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="topup-page">

//       {/* HEADER */}
//       <div className="topup-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>
//         <h2>Top-Up</h2>
//       </div>

//       {/* AMOUNT */}
//       <div className="section">
//         <label>Enter Amount (USD)</label>

//         <input
//           type="number"
//           placeholder="Minimum $10"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//        {amount && (
//   <p className="converted">
//     ≈ <span className="converted-value">
//       {currency.symbol}
//       {(amount * currency.rate).toLocaleString()}
//     </span>
//   </p>
// )}

//         {/* QUICK AMOUNTS (USD ONLY) */}
//         <div className="quick-amounts">
//           {[50, 100, 500, 1000].map((amt) => (
//             <button key={amt} onClick={() => setAmount(amt)}>
//               ${amt}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* WALLET */}
//       <div className="section">
//         <label>Deposit Address (USDT - TRC20)</label>

//         <div className="wallet-box">
//           <span>{walletAddress}</span>
//           <button onClick={copyAddress}>
//             <FiCopy />
//           </button>
//         </div>

//         {copied && <p className="success-text">Copied!</p>}
//       </div>

//       {/* INFO */}
//       <div className="info-box">
//         <p>• Send only USDT (TRC20)</p>
//         <p>• All deposits must be made in USD</p>
//         <p>• Minimum deposit: $10</p>
//         <p>• Funds arrive within 1–5 minutes</p>
//       </div>

//       {/* BUTTON */}
//       <button className="primary-btn">
//         I Have Made Payment
//       </button>

//     </div>
//   );
// };

// export default TopUp;

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
  // CREATE PAYMENT
  // ==============================
  const createPayment = async () => {
    setError("");

    if (!amount || Number(amount) < 10) {
      return setError("Minimum deposit is $10");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for auth cookie (if used)
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
        const res = await fetch(
          `${API_URL}/api/payments/status/${paymentData.payment_id}`,
          {
            credentials: "include",
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
            <div className="section">
              <label>Scan QR Code</label>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${paymentData.pay_address}`}
                alt="QR Code"
              />
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
