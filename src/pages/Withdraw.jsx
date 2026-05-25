

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/withdraw.css";
// import { FiArrowLeft } from "react-icons/fi";
// import { useCurrency } from "../context/CurrencyContext";

// const Withdraw = () => {
//   const navigate = useNavigate();
//   const { currency } = useCurrency();

//   const [amount, setAmount] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [wallet, setWallet] = useState("");
//   const [network, setNetwork] = useState("");

//   const API = process.env.REACT_APP_API_URL;

//   // =========================
//   // SAFE NUMBER CONVERSION
//   // =========================
//   const numericAmount = Number(amount) || 0;

//   // =========================
//   // CALCULATIONS
//   // =========================
//   const fee = numericAmount * 0.03;
//   const receive = numericAmount - fee;

//   // =========================
//   // FORMAT LOCAL CURRENCY
//   // =========================
//   const formatLocal = (value) =>
//     `${currency.symbol}${(Number(value) * currency.rate).toLocaleString()}`;

//   // =========================
//   // FETCH USER PROFILE
//   // =========================
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${API}/api/user/profile`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setWallet(data.user.walletAddress || "");
//           setNetwork(data.user.network || "");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//   }, [API]);

//   // =========================
//   // HANDLE WITHDRAWAL
//   // =========================
//   const handleWithdraw = async () => {
//     // MINIMUM CHECK
//     if (!numericAmount || numericAmount < 50) {
//       return alert("Minimum withdrawal is $50");
//     }

//     // PASSWORD CHECK
//     if (!password) {
//       return alert("Enter withdrawal password");
//     }

//     // WALLET CHECK
//     if (!wallet) {
//       return alert("No wallet bound. Please bind wallet first.");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${API}/api/withdraw`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           amount: numericAmount,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Withdrawal failed");
//       }

//       alert("Withdrawal request submitted. Awaiting admin approval.");

//       // RESET
//       setAmount("");
//       setPassword("");

//       navigate("/profile");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="withdraw-page">

//       {/* HEADER */}
//       <div className="withdraw-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>

//         <h2>Withdraw</h2>
//       </div>

//       {/* AMOUNT */}
//       <div className="section">
//         <label>Enter Amount (USD)</label>

//         <input
//           type="number"
//           placeholder="Minimum $50"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         {numericAmount > 0 && (
//           <p className="converted">
//             ≈{" "}
//             <span className="converted-value">
//               {formatLocal(numericAmount)}
//             </span>
//           </p>
//         )}
//       </div>

//       {/* WALLET */}
//       <div className="section">
//         <label>Wallet Address</label>

//         <input
//           type="text"
//           value={wallet}
//           disabled
//         />
//       </div>

//       {/* NETWORK */}
//       <div className="section">
//         <label>Network</label>

//         <input
//           type="text"
//           value={network}
//           disabled
//         />
//       </div>

//       {/* PASSWORD */}
//       <div className="section">
//         <label>Withdrawal Password</label>

//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       {/* SUMMARY */}
//       <div className="summary-box">

//         <div>
//           <span>Withdrawal Amount</span>
//           <span>${numericAmount.toFixed(2)}</span>
//         </div>

//         <div>
//           <span>Fee (3%)</span>
//           <span>${fee.toFixed(2)}</span>
//         </div>

//         <div>
//           <span>You Receive</span>
//           <span>${receive.toFixed(2)}</span>
//         </div>

//         {numericAmount > 0 && (
//           <div className="local-preview">
//             ≈ {formatLocal(receive)}
//           </div>
//         )}
//       </div>

//       {/* BUTTON */}
//       <button
//         className="primary-btn"
//         onClick={handleWithdraw}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Confirm Withdrawal"}
//       </button>

//     </div>
//   );
// };

// export default Withdraw;

import React, {
  useState,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import "../styles/withdraw.css";

import { FiArrowLeft } from "react-icons/fi";

import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";

const Withdraw = () => {
  const navigate = useNavigate();

  const { currency } =
    useCurrency();

  const { token, logout } =
    useAuth();

  const [amount, setAmount] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [wallet, setWallet] =
    useState("");

  const [network, setNetwork] =
    useState("");

  const API =
    process.env.REACT_APP_API_URL;

  // =========================
  // SAFE NUMBER CONVERSION
  // =========================
  const numericAmount =
    Number(amount) || 0;

  // =========================
  // CALCULATIONS
  // =========================
  const fee =
    numericAmount * 0.03;

  const receive =
    numericAmount - fee;

  // =========================
  // FORMAT LOCAL CURRENCY
  // =========================
  const formatLocal = (value) =>
    `${currency.symbol}${(
      Number(value) *
      currency.rate
    ).toLocaleString()}`;

  // =========================
  // FETCH USER PROFILE
  // =========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;

        const res = await fetch(
          `${API}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        // INVALID TOKEN
        if (
          res.status === 401 ||
          res.status === 403
        ) {
          logout();

          return;
        }

        if (res.ok) {
          setWallet(
            data.user
              .walletAddress || ""
          );

          setNetwork(
            data.user.network || ""
          );
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();

  }, [API, token, logout]);

  // =========================
  // HANDLE WITHDRAWAL
  // =========================
  const handleWithdraw =
    async () => {
      // MINIMUM CHECK
      if (
        !numericAmount ||
        numericAmount < 20
      ) {
        return alert(
          "Minimum withdrawal is $20"
        );
      }

      // PASSWORD CHECK
      if (!password) {
        return alert(
          "Enter withdrawal password"
        );
      }

      // WALLET CHECK
      if (!wallet) {
        return alert(
          "No wallet bound. Please bind wallet first."
        );
      }

      try {
        setLoading(true);

        const res = await fetch(
          `${API}/api/withdraw`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              amount:
                numericAmount,

              password,
            }),
          }
        );

        const data =
          await res.json();

        // INVALID TOKEN
        if (
          res.status === 401 ||
          res.status === 403
        ) {
          logout();

          return;
        }

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Withdrawal failed"
          );
        }

        alert(
          "Withdrawal request submitted. Awaiting admin approval."
        );

        // RESET
        setAmount("");

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
        <button
          className="back-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          <FiArrowLeft />
        </button>

        <h2>Withdraw</h2>
      </div>

      {/* AMOUNT */}
      <div className="section">
        <label>
          Enter Amount (USD)
        </label>

        <input
          type="number"
          placeholder="Minimum $20"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
        />

        {numericAmount > 0 && (
          <p className="converted">
            ≈{" "}
            <span className="converted-value">
              {formatLocal(
                numericAmount
              )}
            </span>
          </p>
        )}
      </div>

      {/* WALLET */}
      <div className="section">
        <label>
          Wallet Address
        </label>

        <input
          type="text"
          value={wallet}
          disabled
        />
      </div>

      {/* NETWORK */}
      <div className="section">
        <label>Network</label>

        <input
          type="text"
          value={network}
          disabled
        />
      </div>

      {/* PASSWORD */}
      <div className="section">
        <label>
          Withdrawal Password
        </label>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />
      </div>

      {/* SUMMARY */}
      <div className="summary-box">

        <div>
          <span>
            Withdrawal Amount
          </span>

          <span>
            $
            {numericAmount.toFixed(
              2
            )}
          </span>
        </div>

        <div>
          <span>Fee (3%)</span>

          <span>
            ${fee.toFixed(2)}
          </span>
        </div>

        <div>
          <span>
            You Receive
          </span>

          <span>
            $
            {receive.toFixed(2)}
          </span>
        </div>

        {numericAmount > 0 && (
          <div className="local-preview">
            ≈{" "}
            {formatLocal(
              receive
            )}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button
        className="primary-btn"
        onClick={handleWithdraw}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : "Confirm Withdrawal"}
      </button>

    </div>
  );
};

export default Withdraw;
