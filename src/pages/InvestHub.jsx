// // import React, { useState, useEffect } from "react";
// // import "../styles/investHub.css";

// // import { useCurrency } from "../context/CurrencyContext";
// // import { useBalance } from "../context/BalanceContext";

// // export default function InvestHub() {
// //   const { currency } = useCurrency();
// //   const { balance, setBalance } = useBalance();

// //   const [plans, setPlans] = useState([]);
// //   const [loadingPlans, setLoadingPlans] = useState(true);

// //   const [showInvestModal, setShowInvestModal] = useState(false);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);

// //   const [selectedPlan, setSelectedPlan] = useState(null);

// //   const [amount, setAmount] = useState("");

// //   const [loading, setLoading] = useState(false);

// //   const [liveROI, setLiveROI] = useState({});

// //   // ================= FETCH PLANS =================
// //   useEffect(() => {
// //     const fetchPlans = async () => {
// //       try {
// //         const res = await fetch(
// //           `${process.env.REACT_APP_API_URL}/api/plans`
// //         );

// //         const data = await res.json();

// //         setPlans(data.plans || []);

// //       } catch (err) {
// //         console.error("Failed to fetch plans:", err);

// //       } finally {
// //         setLoadingPlans(false);
// //       }
// //     };

// //     fetchPlans();
// //   }, []);

// //   // ================= LIVE ROI =================
// //   useEffect(() => {
// //     if (!plans.length) return;

// //     const interval = setInterval(() => {
// //       const updated = {};

// //       plans.forEach((plan) => {
// //         let volatility = 2;

// //         if (plan.percent > 1000) {
// //           volatility = 15;

// //         } else if (plan.percent > 100) {
// //           volatility = 6;
// //         }

// //         const change =
// //           Math.random() * volatility - volatility / 2;

// //         updated[plan._id] = plan.percent + change;
// //       });

// //       setLiveROI(updated);

// //     }, 3000);

// //     return () => clearInterval(interval);

// //   }, [plans]);

// //   const getROI = (plan) =>
// //     liveROI[plan._id] ?? plan.percent;

// //   // ================= MODALS =================
// //   const openInvestModal = (plan) => {
// //     setSelectedPlan(plan);
// //     setAmount("");
// //     setShowInvestModal(true);
// //   };

// //   const openDetailsModal = (plan) => {
// //     setSelectedPlan(plan);
// //     setShowDetailsModal(true);
// //   };

// //   const closeModal = () => {
// //     if (loading) return;

// //     setShowInvestModal(false);
// //     setShowDetailsModal(false);

// //     setSelectedPlan(null);

// //     setAmount("");
// //   };

// //   // ================= CALCULATIONS =================
// //   const numAmount = Number(amount) || 0;

// //   const expectedIncome =
// //     numAmount && selectedPlan
// //       ? (numAmount * getROI(selectedPlan)) / 100
// //       : 0;

// //   const format = (value) =>
// //     `${currency.symbol}${Number(
// //       value * currency.rate
// //     ).toLocaleString(undefined, {
// //       maximumFractionDigits: 2
// //     })}`;

// //   // ================= INVEST =================
// //   const handleInvest = async () => {
// //     if (
// //       !selectedPlan ||
// //       !numAmount ||
// //       isNaN(numAmount)
// //     ) {
// //       return;
// //     }

// //     if (numAmount < (selectedPlan.minimum || 10)) {
// //       alert(
// //         `Minimum investment is $${
// //           selectedPlan.minimum || 10
// //         }`
// //       );

// //       return;
// //     }

// //     if (numAmount > balance) {
// //       alert("Insufficient balance");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");

// //       if (!token) {
// //         alert("Authentication required");
// //         return;
// //       }

// //       const res = await fetch(
// //         `${process.env.REACT_APP_API_URL}/api/invest`,
// //         {
// //           method: "POST",

// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`
// //           },

// //           body: JSON.stringify({
// //             planId: selectedPlan._id,
// //             amount: Number(numAmount)
// //           })
// //         }
// //       );

// //       const data = await res.json();

// //       if (!res.ok) {
// //         alert(data.message || "Investment failed");
// //         return;
// //       }

// //       if (data.newBalance !== undefined) {
// //         setBalance(data.newBalance);
// //       }

// //       alert("Investment successful!");

// //       closeModal();

// //     } catch (err) {
// //       console.error("Investment Error:", err);

// //       alert("Network error. Please try again.");

// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ================= LOADING =================
// //   if (loadingPlans) {
// //     return (
// //       <div className="invest-container">
// //         {[1, 2, 3, 4].map((i) => (
// //           <div
// //             className="plan-card skeleton-card"
// //             key={i}
// //           >
// //             <div className="plan-header">
// //               <div className="skeleton plan-img"></div>

// //               <div className="plan-name">
// //                 <div className="skeleton line short"></div>

// //                 <div className="skeleton line tiny"></div>
// //               </div>
// //             </div>

// //             <div className="plan-info">
// //               <div className="skeleton box"></div>

// //               <div className="skeleton box"></div>
// //             </div>

// //             <div className="plan-actions">
// //               <div className="skeleton button"></div>

// //               <div className="skeleton button"></div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   }

// //   // ================= UI =================
// //   return (
// //     <div className="invest-container">

// //       {/* ================= PLANS ================= */}
// //       {plans.map((plan) => {
// //         const roi = getROI(plan);

// //         return (
// //           <div
// //             className="plan-card"
// //             key={plan._id}
// //           >

// //             <div className="plan-header">
// //               <img
// //                 src={`${process.env.REACT_APP_API_URL}${plan.image}`}
// //                 alt={plan.name}
// //               />

// //               <div className="plan-name">
// //                 <h3>{plan.name}</h3>

// //                 <span className="plan-tag">
// //                   Investment Plan
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="plan-info">

// //               <div>
// //                 <span className="plan-value">
// //                   +{roi.toFixed(1)}%
// //                 </span>

// //                 <p>Total Return</p>
// //               </div>

// //               <div>
// //                 <span className="plan-value">
// //                   {plan.days}
// //                 </span>

// //                 <p>Days</p>
// //               </div>

// //             </div>

// //             <div className="plan-actions">

// //               <button
// //                 className="plan-details"
// //                 onClick={() =>
// //                   openDetailsModal(plan)
// //                 }
// //               >
// //                 Details
// //               </button>

// //               <button
// //                 className={`plan-invest ${
// //                   loadingPlans ||
// //                   balance < (plan.minimum || 10)
// //                     ? "disabled"
// //                     : ""
// //                 }`}
// //                 disabled={
// //                   loadingPlans ||
// //                   balance < (plan.minimum || 10)
// //                 }
// //                 onClick={() =>
// //                   openInvestModal(plan)
// //                 }
// //               >
// //                 Invest
// //               </button>

// //             </div>

// //           </div>
// //         );
// //       })}

// //       {/* ================= DETAILS MODAL ================= */}
// //       {showDetailsModal && selectedPlan && (
// //         <div className="invest-overlay">
// //           <div className="details-modal">

// //             <img
// //               src={`${process.env.REACT_APP_API_URL}${selectedPlan.image}`}
// //               alt={selectedPlan.name}
// //             />

// //             <h2>{selectedPlan.name}</h2>

// //             <div className="details-grid">

// //               <div>
// //                 <span>
// //                   {getROI(selectedPlan).toFixed(1)}%
// //                 </span>

// //                 <p>Total ROI</p>
// //               </div>

// //               <div>
// //                 <span>{selectedPlan.days}</span>

// //                 <p>Duration</p>
// //               </div>

// //               <div>
// //                 <span>
// //                   {(
// //                     getROI(selectedPlan) /
// //                     selectedPlan.days
// //                   ).toFixed(2)}
// //                   %
// //                 </span>

// //                 <p>Daily ROI</p>
// //               </div>

// //             </div>

// //             <button
// //               className="details-invest"
// //               onClick={() => {
// //                 setShowDetailsModal(false);

// //                 openInvestModal(selectedPlan);
// //               }}
// //             >
// //               Invest Now
// //             </button>

// //             <button
// //               className="details-close"
// //               onClick={closeModal}
// //             >
// //               Close
// //             </button>

// //           </div>
// //         </div>
// //       )}

// //       {/* ================= INVEST MODAL ================= */}
// //       {showInvestModal && selectedPlan && (
// //         <div className="invest-overlay">
// //           <div className="invest-modal">

// //             <h3>
// //               Invest ({selectedPlan.days} Days)
// //             </h3>

// //             <label>
// //               Deposit Amount (USD)
// //             </label>

// //             <input
// //               type="number"
// //               min={selectedPlan.minimum || 10}
// //               step="0.01"
// //               inputMode="decimal"
// //               placeholder={`Minimum $${
// //                 selectedPlan.minimum || 10
// //               }`}
// //               value={amount}
// //               onChange={(e) => {
// //                 const value = e.target.value;

// //                 if (value === "") {
// //                   setAmount("");
// //                   return;
// //                 }

// //                 const numericValue =
// //                   Number(value);

// //                 if (
// //                   !Number.isFinite(numericValue)
// //                 ) {
// //                   return;
// //                 }

// //                 if (numericValue < 0) {
// //                   return;
// //                 }

// //                 setAmount(value);
// //               }}
// //             />

// //             {amount && (
// //               <p className="converted">
// //                 ≈{" "}
// //                 <span className="converted-value">
// //                   {format(numAmount)}
// //                 </span>
// //               </p>
// //             )}

// //             <div className="expected-income">
// //               Expected Income:

// //               <b>
// //                 ${expectedIncome.toFixed(2)}
// //               </b>
// //             </div>

// //             <div className="modal-actions">

// //               <button
// //                 className="modal-cancel"
// //                 onClick={closeModal}
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 className="modal-confirm"
// //                 onClick={handleInvest}
// //                 disabled={
// //                   loading ||
// //                   !numAmount ||
// //                   numAmount <
// //                     (selectedPlan.minimum || 10) ||
// //                   numAmount > balance
// //                 }
// //               >
// //                 {loading
// //                   ? "Processing..."
// //                   : "Confirm Investment"}
// //               </button>

// //             </div>

// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import "../styles/investHub.css";

// import { useCurrency } from "../context/CurrencyContext";
// import { useBalance } from "../context/BalanceContext";

// export default function InvestHub() {
//   const { currency } = useCurrency();
//   const { balance, setBalance } = useBalance();

//   const [plans, setPlans] = useState([]);
//   const [loadingPlans, setLoadingPlans] = useState(true);

//   const [showInvestModal, setShowInvestModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const [amount, setAmount] = useState("");

//   const [loading, setLoading] = useState(false);

//   // ================= FETCH PLANS =================
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/plans`
//         );

//         const data = await res.json();

//         setPlans(data.plans || []);

//       } catch (err) {
//         console.error("Failed to fetch plans:", err);

//       } finally {
//         setLoadingPlans(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   // ================= STATIC ROI =================
//   const getROI = (plan) => plan.percent;

//   // ================= MODALS =================
//   const openInvestModal = (plan) => {
//     setSelectedPlan(plan);

//     setAmount("");

//     setShowInvestModal(true);
//   };

//   const openDetailsModal = (plan) => {
//     setSelectedPlan(plan);

//     setShowDetailsModal(true);
//   };

//   const closeModal = () => {
//     if (loading) return;

//     setShowInvestModal(false);

//     setShowDetailsModal(false);

//     setSelectedPlan(null);

//     setAmount("");
//   };

//   // ================= CALCULATIONS =================
//   const numAmount = Number(amount) || 0;

//   const expectedIncome =
//     numAmount && selectedPlan
//       ? (numAmount * getROI(selectedPlan)) / 100
//       : 0;

//   const format = (value) =>
//     `${currency.symbol}${Number(
//       value * currency.rate
//     ).toLocaleString(undefined, {
//       maximumFractionDigits: 2
//     })}`;

//   // ================= INVEST =================
//   const handleInvest = async () => {
//     if (
//       !selectedPlan ||
//       !numAmount ||
//       isNaN(numAmount)
//     ) {
//       return;
//     }

//     if (numAmount < (selectedPlan.minimum || 10)) {
//       alert(
//         `Minimum investment is $${
//           selectedPlan.minimum || 10
//         }`
//       );

//       return;
//     }

//     if (numAmount > balance) {
//       alert("Insufficient balance");

//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Authentication required");

//         return;
//       }

//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/invest`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",

//             Authorization: `Bearer ${token}`
//           },

//           body: JSON.stringify({
//             planId: selectedPlan._id,
//             amount: Number(numAmount)
//           })
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Investment failed");

//         return;
//       }

//       if (data.newBalance !== undefined) {
//         setBalance(data.newBalance);
//       }

//       alert("Investment successful!");

//       closeModal();

//     } catch (err) {
//       console.error("Investment Error:", err);

//       alert("Network error. Please try again.");

//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= LOADING =================
//   if (loadingPlans) {
//     return (
//       <div className="invest-container">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             className="plan-card skeleton-card"
//             key={i}
//           >
//             <div className="plan-header">
//               <div className="skeleton plan-img"></div>

//               <div className="plan-name">
//                 <div className="skeleton line short"></div>

//                 <div className="skeleton line tiny"></div>
//               </div>
//             </div>

//             <div className="plan-info">
//               <div className="skeleton box"></div>

//               <div className="skeleton box"></div>
//             </div>

//             <div className="plan-actions">
//               <div className="skeleton button"></div>

//               <div className="skeleton button"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // ================= UI =================
//   return (
//     <div className="invest-container">

//       {/* ================= PLANS ================= */}
//       {plans.map((plan) => (
//         <div
//           className="plan-card"
//           key={plan._id}
//         >

//           <div className="plan-header">
//             <img
//               src={`${process.env.REACT_APP_API_URL}${plan.image}`}
//               alt={plan.name}
//             />

//             <div className="plan-name">
//               <h3>{plan.name}</h3>

//               <span className="plan-tag">
//                 Investment Plan
//               </span>
//             </div>
//           </div>

//           <div className="plan-info">

//             <div>
//               <span className="plan-value">
//                 +{getROI(plan).toFixed(1)}%
//               </span>

//               <p>Total Return</p>
//             </div>

//             <div>
//               <span className="plan-value">
//                 {plan.days}
//               </span>

//               <p>Days</p>
//             </div>

//           </div>

//           <div className="plan-actions">

//             <button
//               className="plan-details"
//               onClick={() =>
//                 openDetailsModal(plan)
//               }
//             >
//               Details
//             </button>

//             <button
//               className={`plan-invest ${
//                 loadingPlans ||
//                 balance < (plan.minimum || 10)
//                   ? "disabled"
//                   : ""
//               }`}
//               disabled={
//                 loadingPlans ||
//                 balance < (plan.minimum || 10)
//               }
//               onClick={() =>
//                 openInvestModal(plan)
//               }
//             >
//               Invest
//             </button>

//           </div>

//         </div>
//       ))}

//       {/* ================= DETAILS MODAL ================= */}
//       {showDetailsModal && selectedPlan && (
//         <div className="invest-overlay">
//           <div className="details-modal">

//             <img
//               src={`${process.env.REACT_APP_API_URL}${selectedPlan.image}`}
//               alt={selectedPlan.name}
//             />

//             <h2>{selectedPlan.name}</h2>

//             <div className="details-grid">

//               <div>
//                 <span>
//                   {getROI(selectedPlan).toFixed(1)}%
//                 </span>

//                 <p>Total ROI</p>
//               </div>

//               <div>
//                 <span>{selectedPlan.days}</span>

//                 <p>Duration</p>
//               </div>

//               <div>
//                 <span>
//                   {(
//                     getROI(selectedPlan) /
//                     selectedPlan.days
//                   ).toFixed(2)}
//                   %
//                 </span>

//                 <p>Daily ROI</p>
//               </div>

//             </div>

//             <button
//               className="details-invest"
//               onClick={() => {
//                 setShowDetailsModal(false);

//                 openInvestModal(selectedPlan);
//               }}
//             >
//               Invest Now
//             </button>

//             <button
//               className="details-close"
//               onClick={closeModal}
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}

//       {/* ================= INVEST MODAL ================= */}
//       {showInvestModal && selectedPlan && (
//         <div className="invest-overlay">
//           <div className="invest-modal">

//             <h3>
//               Invest ({selectedPlan.days} Days)
//             </h3>

//             <label>
//               Deposit Amount (USD)
//             </label>

//             <input
//               type="number"
//               min={selectedPlan.minimum || 10}
//               step="0.01"
//               inputMode="decimal"
//               placeholder={`Minimum $${
//                 selectedPlan.minimum || 10
//               }`}
//               value={amount}
//               onChange={(e) => {
//                 const value = e.target.value;

//                 if (value === "") {
//                   setAmount("");

//                   return;
//                 }

//                 const numericValue =
//                   Number(value);

//                 if (
//                   !Number.isFinite(numericValue)
//                 ) {
//                   return;
//                 }

//                 if (numericValue < 0) {
//                   return;
//                 }

//                 setAmount(value);
//               }}
//             />

//             {amount && (
//               <p className="converted">
//                 ≈{" "}
//                 <span className="converted-value">
//                   {format(numAmount)}
//                 </span>
//               </p>
//             )}

//             <div className="expected-income">
//               Expected Income:

//               <b>
//                 ${expectedIncome.toFixed(2)}
//               </b>
//             </div>

//             <div className="modal-actions">

//               <button
//                 className="modal-cancel"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="modal-confirm"
//                 onClick={handleInvest}
//                 disabled={
//                   loading ||
//                   !numAmount ||
//                   numAmount <
//                     (selectedPlan.minimum || 10) ||
//                   numAmount > balance
//                 }
//               >
//                 {loading
//                   ? "Processing..."
//                   : "Confirm Investment"}
//               </button>

//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../styles/investHub.css";

import { useCurrency } from "../context/CurrencyContext";
import { useBalance } from "../context/BalanceContext";

export default function InvestHub() {
  const { currency } = useCurrency();
  const { balance, setBalance } = useBalance();

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  // ================= FETCH PLANS =================
  useEffect(() => {
    let mounted = true;

    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_URL}/api/plans`, {
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error("Failed to fetch plans");
        }

        const data = await res.json();

        if (mounted) {
          setPlans(
            Array.isArray(data.plans)
              ? data.plans.filter(
                  (plan) =>
                    plan &&
                    plan._id &&
                    typeof plan.percent === "number"
                )
              : []
          );
        }

      } catch (err) {
        console.error("Failed to fetch plans");

      } finally {
        if (mounted) {
          setLoadingPlans(false);
        }
      }
    };

    fetchPlans();

    return () => {
      mounted = false;
    };
  }, [API_URL]);

  // ================= STATIC ROI =================
  const getROI = (plan) => {
    const roi = Number(plan?.percent || 0);

    return Number.isFinite(roi) ? roi : 0;
  };

  // ================= MODALS =================
  const openInvestModal = (plan) => {
    if (!plan) return;

    setSelectedPlan(plan);

    setAmount("");

    setShowInvestModal(true);
  };

  const openDetailsModal = (plan) => {
    if (!plan) return;

    setSelectedPlan(plan);

    setShowDetailsModal(true);
  };

  const closeModal = () => {
    if (loading) return;

    setShowInvestModal(false);

    setShowDetailsModal(false);

    setSelectedPlan(null);

    setAmount("");
  };

  // ================= CALCULATIONS =================
  const numAmount = Number(amount);

  const safeAmount =
    Number.isFinite(numAmount) && numAmount > 0
      ? numAmount
      : 0;

  const expectedIncome =
    safeAmount && selectedPlan
      ? (safeAmount * getROI(selectedPlan)) / 100
      : 0;

  const format = (value) =>
    `${currency.symbol}${Number(
      value * currency.rate
    ).toLocaleString(undefined, {
      maximumFractionDigits: 2
    })}`;

  // ================= INVEST =================
  const handleInvest = async () => {
    if (loading) return;

    if (!selectedPlan?._id) {
      return;
    }

    if (
      !Number.isFinite(safeAmount) ||
      safeAmount <= 0
    ) {
      alert("Enter a valid amount");

      return;
    }

    const minimum = Number(
      selectedPlan.minimum || 10
    );

    if (safeAmount < minimum) {
      alert(`Minimum investment is $${minimum}`);

      return;
    }

    if (safeAmount > balance) {
      alert("Insufficient balance");

      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/invest`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            planId: selectedPlan._id,
            amount: Number(safeAmount.toFixed(2))
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Investment failed");

        return;
      }

      if (
        typeof data.newBalance === "number"
      ) {
        setBalance(data.newBalance);
      }

      alert("Investment successful!");

      closeModal();

    } catch (err) {
      console.error("Investment request failed");

      alert("Network error. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loadingPlans) {
    return (
      <div className="invest-container">
        {[1, 2, 3, 4].map((i) => (
          <div
            className="plan-card skeleton-card"
            key={i}
          >
            <div className="plan-header">
              <div className="skeleton plan-img"></div>

              <div className="plan-name">
                <div className="skeleton line short"></div>

                <div className="skeleton line tiny"></div>
              </div>
            </div>

            <div className="plan-info">
              <div className="skeleton box"></div>

              <div className="skeleton box"></div>
            </div>

            <div className="plan-actions">
              <div className="skeleton button"></div>

              <div className="skeleton button"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="invest-container">

      {plans.map((plan) => {
        const minimum = Number(
          plan.minimum || 10
        );

        return (
          <div
            className="plan-card"
            key={plan._id}
          >

            <div className="plan-header">

              <img
                src={`${API_URL}${plan.image}`}
                alt={plan.name}
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              <div className="plan-name">
                <h3>{plan.name}</h3>

                <span className="plan-tag">
                  Investment Plan
                </span>
              </div>

            </div>

            <div className="plan-info">

              <div>
                <span className="plan-value">
                  +{getROI(plan).toFixed(1)}%
                </span>

                <p>Total Return</p>
              </div>

              <div>
                <span className="plan-value">
                  {plan.days}
                </span>

                <p>Days</p>
              </div>

            </div>

            <div className="plan-actions">

              <button
                className="plan-details"
                onClick={() =>
                  openDetailsModal(plan)
                }
              >
                Details
              </button>

              <button
                className={`plan-invest ${
                  loading ||
                  balance < minimum
                    ? "disabled"
                    : ""
                }`}
                disabled={
                  loading ||
                  balance < minimum
                }
                onClick={() =>
                  openInvestModal(plan)
                }
              >
                Invest
              </button>

            </div>

          </div>
        );
      })}

      {/* ================= DETAILS MODAL ================= */}
      {showDetailsModal && selectedPlan && (
        <div className="invest-overlay">
          <div className="details-modal">

            <img
              src={`${API_URL}${selectedPlan.image}`}
              alt={selectedPlan.name}
              loading="lazy"
            />

            <h2>{selectedPlan.name}</h2>

            <div className="details-grid">

              <div>
                <span>
                  {getROI(selectedPlan).toFixed(1)}%
                </span>

                <p>Total ROI</p>
              </div>

              <div>
                <span>{selectedPlan.days}</span>

                <p>Duration</p>
              </div>

              <div>
                <span>
                  {(
                    getROI(selectedPlan) /
                    selectedPlan.days
                  ).toFixed(2)}
                  %
                </span>

                <p>Daily ROI</p>
              </div>

            </div>

            <button
              className="details-invest"
              onClick={() => {
                setShowDetailsModal(false);

                openInvestModal(selectedPlan);
              }}
            >
              Invest Now
            </button>

            <button
              className="details-close"
              onClick={closeModal}
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* ================= INVEST MODAL ================= */}
      {showInvestModal && selectedPlan && (
        <div className="invest-overlay">
          <div className="invest-modal">

            <h3>
              Invest ({selectedPlan.days} Days)
            </h3>

            <label>
              Deposit Amount (USD)
            </label>

            <input
              type="number"
              min={selectedPlan.minimum || 10}
              step="0.01"
              inputMode="decimal"
              autoComplete="off"
              placeholder={`Minimum $${
                selectedPlan.minimum || 10
              }`}
              value={amount}
              onChange={(e) => {
                const value =
                  e.target.value.trim();

                if (value === "") {
                  setAmount("");

                  return;
                }

                const numericValue =
                  Number(value);

                if (
                  !Number.isFinite(numericValue)
                ) {
                  return;
                }

                if (numericValue < 0) {
                  return;
                }

                if (numericValue > 100000000) {
                  return;
                }

                setAmount(value);
              }}
            />

            {safeAmount > 0 && (
              <p className="converted">
                ≈{" "}
                <span className="converted-value">
                  {format(safeAmount)}
                </span>
              </p>
            )}

            <div className="expected-income">
              Expected Income:

              <b>
                ${expectedIncome.toFixed(2)}
              </b>
            </div>

            <div className="modal-actions">

              <button
                className="modal-cancel"
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="modal-confirm"
                onClick={handleInvest}
                disabled={
                  loading ||
                  !safeAmount ||
                  safeAmount <
                    (selectedPlan.minimum || 10) ||
                  safeAmount > balance
                }
              >
                {loading
                  ? "Processing..."
                  : "Confirm Investment"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
