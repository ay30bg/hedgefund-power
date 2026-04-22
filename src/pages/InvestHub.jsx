// // import React, { useState, useEffect } from "react";
// // import "../styles/investHub.css";

// // import { useCurrency } from "../context/CurrencyContext";
// // import { useBalance } from "../context/BalanceContext";

// // import goldCoin from "../assets/gold-coins.png";
// // import goldBar from "../assets/gold-bar.png";
// // import goldBarStack from "../assets/gold-bar-stack.png";
// // import goldBarStacked from "../assets/gold-bar-stacked.png";
// // import goldVault from "../assets/gold-vault.png";

// // export const plans = [
// //   { name: "Starter Gold Farm", days: 7, percent: 18, img: goldCoin },
// //   { name: "Silver Growth Farm", days: 14, percent: 36, img: goldBar },
// //   { name: "Golden Harvest Farm", days: 35, percent: 160, img: goldBarStack },
// //   { name: "Diamond Yield Farm", days: 120, percent: 1200, img: goldBarStacked },
// //   { name: "Ultimate Vault Farm", days: 200, percent: 2500, img: goldVault }
// // ];

// // export default function InvestHub() {
// //   const { currency } = useCurrency();

// //   // ✅ FIXED: removed unused "balance"
// //   const { setBalance } = useBalance();

// //   const [showInvestModal, setShowInvestModal] = useState(false);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [amount, setAmount] = useState("");

// //   const [loading, setLoading] = useState(false);
// //   const [liveROI, setLiveROI] = useState({});

// //   // ===== LIVE ROI =====
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const updated = {};

// //       plans.forEach((plan) => {
// //         let volatility = 2;

// //         if (plan.percent > 1000) volatility = 15;
// //         else if (plan.percent > 100) volatility = 6;

// //         const change = Math.random() * volatility - volatility / 2;
// //         updated[plan.name] = plan.percent + change;
// //       });

// //       setLiveROI(updated);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   const getROI = (plan) => liveROI[plan.name] ?? plan.percent;

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
// //     setShowInvestModal(false);
// //     setShowDetailsModal(false);
// //     setSelectedPlan(null);
// //     setAmount("");
// //   };

// //   const numAmount = parseFloat(amount) || 0;

// //   const expectedIncome =
// //     numAmount && selectedPlan
// //       ? (numAmount * getROI(selectedPlan)) / 100
// //       : 0;

// //   const format = (value) =>
// //     `${currency.symbol}${Number(value * currency.rate).toLocaleString(undefined, {
// //       maximumFractionDigits: 2
// //     })}`;

// //   // ===== SECURE INVEST HANDLER =====
// //   const handleInvest = async () => {
// //     if (!selectedPlan || !numAmount) return;

// //     if (numAmount < 10) {
// //       alert("Minimum investment is $10");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await fetch(
// //         `${process.env.REACT_APP_API_URL}/api/invest/invest`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`
// //           },
// //           body: JSON.stringify({
// //             plan: selectedPlan.name,
// //             amount: numAmount,
// //             roi: getROI(selectedPlan),
// //             days: selectedPlan.days
// //           })
// //         }
// //       );

// //       const data = await res.json();

// //       if (!res.ok) {
// //         alert(data.message || "Investment failed");
// //         return;
// //       }

// //       // ✅ update global balance from backend
// //       if (data.newBalance !== undefined) {
// //         setBalance(data.newBalance);
// //       }

// //       alert("Investment successful!");
// //       closeModal();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Network error. Try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="invest-container">

// //       {/* PLANS */}
// //       {plans.map((plan, index) => {
// //         const roi = getROI(plan);

// //         return (
// //           <div className="plan-card" key={index}>

// //             <div className="plan-header">
// //               <img src={plan.img} alt="plan" />

// //               <div className="plan-name">
// //                 <h3>{plan.name}</h3>
// //                 <span className="plan-tag">Investment Plan</span>
// //               </div>
// //             </div>

// //             <div className="plan-info">

// //               <div>
// //                 <span className="plan-value">+{roi.toFixed(1)}%</span>
// //                 <p>Total Return</p>
// //               </div>

// //               <div>
// //                 <span className="plan-value">{plan.days}</span>
// //                 <p>Days</p>
// //               </div>

// //             </div>

// //             <div className="plan-actions">

// //               <button
// //                 className="plan-details"
// //                 onClick={() => openDetailsModal(plan)}
// //               >
// //                 Details
// //               </button>

// //               <button
// //                 className="plan-invest"
// //                 onClick={() => openInvestModal(plan)}
// //               >
// //                 Invest
// //               </button>

// //             </div>

// //           </div>
// //         );
// //       })}

// //       {/* DETAILS MODAL */}
// //       {showDetailsModal && selectedPlan && (
// //         <div className="invest-overlay">
// //           <div className="details-modal">

// //             <img src={selectedPlan.img} alt="" />
// //             <h2>{selectedPlan.name}</h2>

// //             <div className="details-grid">

// //               <div>
// //                 <span>{getROI(selectedPlan).toFixed(1)}%</span>
// //                 <p>Total ROI</p>
// //               </div>

// //               <div>
// //                 <span>{selectedPlan.days}</span>
// //                 <p>Duration</p>
// //               </div>

// //               <div>
// //                 <span>
// //                   {(getROI(selectedPlan) / selectedPlan.days).toFixed(2)}%
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

// //             <button className="details-close" onClick={closeModal}>
// //               Close
// //             </button>

// //           </div>
// //         </div>
// //       )}

// //       {/* INVEST MODAL */}
// //       {showInvestModal && selectedPlan && (
// //         <div className="invest-overlay">
// //           <div className="invest-modal">

// //             <h3>Invest ({selectedPlan.days} Days)</h3>

// //             <label>Deposit Amount (USD)</label>

// //             <input
// //               type="number"
// //               placeholder="Minimum $10"
// //               value={amount}
// //               onChange={(e) => setAmount(e.target.value)}
// //             />

// //             {amount && (
// //               <p className="converted">
// //                 ≈ <span className="converted-value">{format(numAmount)}</span>
// //               </p>
// //             )}

// //             <div className="expected-income">
// //               Expected Income:
// //               <b> ${expectedIncome.toFixed(2)} </b>

// //               {amount && (
// //                 <span className="converted small">
// //                   ≈ {format(expectedIncome)}
// //                 </span>
// //               )}
// //             </div>

// //             <div className="modal-actions">

// //               <button className="modal-cancel" onClick={closeModal}>
// //                 Cancel
// //               </button>

// //               <button
// //                 className="modal-confirm"
// //                 onClick={handleInvest}
// //                 disabled={loading}
// //               >
// //                 {loading ? "Processing..." : "Confirm Investment"}
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

// import goldCoin from "../assets/gold-coins.png";
// import goldBar from "../assets/gold-bar.png";
// import goldBarStack from "../assets/gold-bar-stack.png";
// import goldBarStacked from "../assets/gold-bar-stacked.png";
// import goldVault from "../assets/gold-vault.png";

// export const plans = [
//   { name: "Starter Gold Farm", days: 7, percent: 18, img: goldCoin },
//   { name: "Silver Growth Farm", days: 14, percent: 36, img: goldBar },
//   { name: "Golden Harvest Farm", days: 35, percent: 160, img: goldBarStack },
//   { name: "Diamond Yield Farm", days: 120, percent: 1200, img: goldBarStacked },
//   { name: "Ultimate Vault Farm", days: 200, percent: 2500, img: goldVault }
// ];

// export default function InvestHub() {
//   const { currency } = useCurrency();

//   // ✅ FIXED: removed unused "balance"
//   const { setBalance } = useBalance();

//   const [showInvestModal, setShowInvestModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [amount, setAmount] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [liveROI, setLiveROI] = useState({});

//   // ===== LIVE ROI =====
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updated = {};

//       plans.forEach((plan) => {
//         let volatility = 2;

//         if (plan.percent > 1000) volatility = 15;
//         else if (plan.percent > 100) volatility = 6;

//         const change = Math.random() * volatility - volatility / 2;
//         updated[plan.name] = plan.percent + change;
//       });

//       setLiveROI(updated);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const getROI = (plan) => liveROI[plan.name] ?? plan.percent;

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
//     setShowInvestModal(false);
//     setShowDetailsModal(false);
//     setSelectedPlan(null);
//     setAmount("");
//   };

//   const numAmount = parseFloat(amount) || 0;

//   const expectedIncome =
//     numAmount && selectedPlan
//       ? (numAmount * getROI(selectedPlan)) / 100
//       : 0;

//   const format = (value) =>
//     `${currency.symbol}${Number(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 2
//     })}`;

//   // ===== SECURE INVEST HANDLER =====
//   const handleInvest = async () => {
//     if (!selectedPlan || !numAmount) return;

//     if (numAmount < 10) {
//       alert("Minimum investment is $10");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/invest/invest`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           },
//           body: JSON.stringify({
//             plan: selectedPlan.name,
//             amount: numAmount,
//             roi: getROI(selectedPlan),
//             days: selectedPlan.days
//           })
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Investment failed");
//         return;
//       }

//       // ✅ update global balance from backend
//       if (data.newBalance !== undefined) {
//         setBalance(data.newBalance);
//       }

//       alert("Investment successful!");
//       closeModal();
//     } catch (err) {
//       console.error(err);
//       alert("Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="invest-container">

//       {/* PLANS */}
//       {plans.map((plan, index) => {
//         const roi = getROI(plan);

//         return (
//           <div className="plan-card" key={index}>

//             <div className="plan-header">
//               <img src={plan.img} alt="plan" />

//               <div className="plan-name">
//                 <h3>{plan.name}</h3>
//                 <span className="plan-tag">Investment Plan</span>
//               </div>
//             </div>

//             <div className="plan-info">

//               <div>
//                 <span className="plan-value">+{roi.toFixed(1)}%</span>
//                 <p>Total Return</p>
//               </div>

//               <div>
//                 <span className="plan-value">{plan.days}</span>
//                 <p>Days</p>
//               </div>

//             </div>

//             <div className="plan-actions">

//               <button
//                 className="plan-details"
//                 onClick={() => openDetailsModal(plan)}
//               >
//                 Details
//               </button>

//               <button
//                 className="plan-invest"
//                 onClick={() => openInvestModal(plan)}
//               >
//                 Invest
//               </button>

//             </div>

//           </div>
//         );
//       })}

//       {/* DETAILS MODAL */}
//       {showDetailsModal && selectedPlan && (
//         <div className="invest-overlay">
//           <div className="details-modal">

//             <img src={selectedPlan.img} alt="" />
//             <h2>{selectedPlan.name}</h2>

//             <div className="details-grid">

//               <div>
//                 <span>{getROI(selectedPlan).toFixed(1)}%</span>
//                 <p>Total ROI</p>
//               </div>

//               <div>
//                 <span>{selectedPlan.days}</span>
//                 <p>Duration</p>
//               </div>

//               <div>
//                 <span>
//                   {(getROI(selectedPlan) / selectedPlan.days).toFixed(2)}%
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

//             <button className="details-close" onClick={closeModal}>
//               Close
//             </button>

//           </div>
//         </div>
//       )}

//       {/* INVEST MODAL */}
//       {showInvestModal && selectedPlan && (
//         <div className="invest-overlay">
//           <div className="invest-modal">

//             <h3>Invest ({selectedPlan.days} Days)</h3>

//             <label>Deposit Amount (USD)</label>

//             <input
//               type="number"
//               placeholder="Minimum $10"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />

//             {amount && (
//               <p className="converted">
//                 ≈ <span className="converted-value">{format(numAmount)}</span>
//               </p>
//             )}

//             <div className="expected-income">
//               Expected Income:
//               <b> ${expectedIncome.toFixed(2)} </b>

//               {amount && (
//                 <span className="converted small">
//                   ≈ {format(expectedIncome)}
//                 </span>
//               )}
//             </div>

//             <div className="modal-actions">

//               <button className="modal-cancel" onClick={closeModal}>
//                 Cancel
//               </button>

//               <button
//                 className="modal-confirm"
//                 onClick={handleInvest}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Confirm Investment"}
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
  const { setBalance } = useBalance();

  const [plans, setPlans] = useState([]); // ✅ now from backend
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [liveROI, setLiveROI] = useState({});

  // ================= FETCH PLANS =================
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/plans`
        );
        const data = await res.json();

        setPlans(data.plans); // ✅ IMPORTANT
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      }
    };

    fetchPlans();
  }, []);

  // ================= LIVE ROI =================
  useEffect(() => {
    if (!plans.length) return;

    const interval = setInterval(() => {
      const updated = {};

      plans.forEach((plan) => {
        let volatility = 2;

        if (plan.percent > 1000) volatility = 15;
        else if (plan.percent > 100) volatility = 6;

        const change = Math.random() * volatility - volatility / 2;
        updated[plan.name] = plan.percent + change;
      });

      setLiveROI(updated);
    }, 3000);

    return () => clearInterval(interval);
  }, [plans]);

  const getROI = (plan) => liveROI[plan.name] ?? plan.percent;

  const openInvestModal = (plan) => {
    setSelectedPlan(plan);
    setAmount("");
    setShowInvestModal(true);
  };

  const openDetailsModal = (plan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowInvestModal(false);
    setShowDetailsModal(false);
    setSelectedPlan(null);
    setAmount("");
  };

  const numAmount = parseFloat(amount) || 0;

  const expectedIncome =
    numAmount && selectedPlan
      ? (numAmount * getROI(selectedPlan)) / 100
      : 0;

  const format = (value) =>
    `${currency.symbol}${Number(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2
    })}`;

  // ================= INVEST =================
  const handleInvest = async () => {
    if (!selectedPlan || !numAmount) return;

    if (numAmount < 10) {
      alert("Minimum investment is $10");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/invest/invest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            plan: selectedPlan.name,
            amount: numAmount,
            roi: getROI(selectedPlan),
            days: selectedPlan.days
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Investment failed");
        return;
      }

      if (data.newBalance !== undefined) {
        setBalance(data.newBalance);
      }

      alert("Investment successful!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invest-container">

      {/* ================= PLANS ================= */}
      {plans.map((plan, index) => {
        const roi = getROI(plan);

        return (
          <div className="plan-card" key={index}>

            <div className="plan-header">
              <img
                src={`${process.env.REACT_APP_API_URL}${plan.image}`}
                alt="plan"
              />

              <div className="plan-name">
                <h3>{plan.name}</h3>
                <span className="plan-tag">Investment Plan</span>
              </div>
            </div>

            <div className="plan-info">

              <div>
                <span className="plan-value">+{roi.toFixed(1)}%</span>
                <p>Total Return</p>
              </div>

              <div>
                <span className="plan-value">{plan.days}</span>
                <p>Days</p>
              </div>

            </div>

            <div className="plan-actions">

              <button
                className="plan-details"
                onClick={() => openDetailsModal(plan)}
              >
                Details
              </button>

              <button
                className="plan-invest"
                onClick={() => openInvestModal(plan)}
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
              src={`${process.env.REACT_APP_API_URL}${selectedPlan.img}`}
              alt=""
            />

            <h2>{selectedPlan.name}</h2>

            <div className="details-grid">

              <div>
                <span>{getROI(selectedPlan).toFixed(1)}%</span>
                <p>Total ROI</p>
              </div>

              <div>
                <span>{selectedPlan.days}</span>
                <p>Duration</p>
              </div>

              <div>
                <span>
                  {(getROI(selectedPlan) / selectedPlan.days).toFixed(2)}%
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

            <button className="details-close" onClick={closeModal}>
              Close
            </button>

          </div>
        </div>
      )}

      {/* ================= INVEST MODAL ================= */}
      {showInvestModal && selectedPlan && (
        <div className="invest-overlay">
          <div className="invest-modal">

            <h3>Invest ({selectedPlan.days} Days)</h3>

            <label>Deposit Amount (USD)</label>

            <input
              type="number"
              placeholder="Minimum $10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {amount && (
              <p className="converted">
                ≈ <span className="converted-value">{format(numAmount)}</span>
              </p>
            )}

            <div className="expected-income">
              Expected Income:
              <b> ${expectedIncome.toFixed(2)} </b>

              {amount && (
                <span className="converted small">
                  ≈ {format(expectedIncome)}
                </span>
              )}
            </div>

            <div className="modal-actions">

              <button className="modal-cancel" onClick={closeModal}>
                Cancel
              </button>

              <button
                className="modal-confirm"
                onClick={handleInvest}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Investment"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
