// // import React, { useState } from "react";
// // import "../styles/market.css";

// // import { useCurrency } from "../context/CurrencyContext";

// // import pp1 from "../assets/pp1 1.png";
// // import pp4 from "../assets/pp4 1.png";
// // import pp5 from "../assets/pp5 1.png";
// // import pp6 from "../assets/pp6 1.png";
// // import pp8 from "../assets/pp8 1.png";
// // import pp9 from "../assets/pp9 1.png";
// // import pp10 from "../assets/pp10 1.png";
// // import pp11 from "../assets/pp11 1.png";

// // export const machines = [
// //   { name: "Flash Speed Power Pumping Machine", price: 10, profit: 0.0264, duration: 21, img: pp1 },
// //   { name: "Godspeed Power Pumping Machine", price: 20, profit: 0.0529, duration: 21, img: pp4 },
// //   { name: "Surge Power Pumping Machine", price: 35, profit: 0.0925, duration: 21, img: pp5 },
// //   { name: "Speedy Power Pumping Machine", price: 50, profit: 0.1322, duration: 21, img: pp6 },
// //   { name: "Light Speed Pumping Machine", price: 100, profit: 0.2645, duration: 21, img: pp8 },
// //   { name: "Sound Speed Power Pumping Machine", price: 500, profit: 1.3224, duration: 21, img: pp9 },
// //   { name: "Sonic Power Pumping Machine", price: 1000, profit: 2.6445, duration: 21, img: pp10 },
// //   { name: "Spark Power Pumping Machine", price: 5000, profit: 13.2242, duration: 21, img: pp11 }
// // ];

// // export default function PurchaseHall() {

// //   const { currency } = useCurrency(); // ✅ GLOBAL

// //   const [showDetails, setShowDetails] = useState(false);
// //   const [showBuy, setShowBuy] = useState(false);
// //   const [selectedMachine, setSelectedMachine] = useState(null);

// //   const format = (value) => {
// //     return `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
// //       maximumFractionDigits: 4
// //     })}`;
// //   };

// //   const openDetails = (machine) => {
// //     setSelectedMachine(machine);
// //     setShowDetails(true);
// //   };

// //   const openBuy = (machine) => {
// //     setSelectedMachine(machine);
// //     setShowBuy(true);
// //   };

// //   const closeModal = () => {
// //     setShowDetails(false);
// //     setShowBuy(false);
// //     setSelectedMachine(null);
// //   };

// //   const handleBuy = () => {
// //     const purchaseDate = new Date();

// //     const expiryDate = new Date();
// //     expiryDate.setDate(expiryDate.getDate() + selectedMachine.duration);

// //     const ownedMachine = {
// //       ...selectedMachine,
// //       purchaseDate,
// //       expiryDate,
// //       status: "running"
// //     };

// //     console.log("Purchased Machine:", ownedMachine);
// //     alert("Machine purchased successfully!");

// //     closeModal();
// //   };

// //   return (
// //     <div className="purchase-container">

// //       {/* MACHINES */}
// //       {machines.map((machine, index) => (
// //         <div className="machine-card" key={index}>

// //           <div className="machine-header">
// //             <img src={machine.img} alt="machine" />

// //             <div className="name-tag">
// //               <h3>{machine.name}</h3>
// //               <span className="tag">Clean energy</span>
// //             </div>
// //           </div>

// //           <div className="machine-info">

// //             <div className="profit">
// //               <span className="value">
// //                 {format(machine.profit)}
// //               </span>
// //               <p>Profit / Hour</p>
// //             </div>

// //             <div className="price">
// //               <span className="value">
// //                 {format(machine.price)}
// //               </span>
// //               <p>Price</p>
// //             </div>

// //           </div>

// //           <div className="machine-actions">

// //             <button className="details" onClick={() => openDetails(machine)}>
// //               Details
// //             </button>

// //             <button className="buy" onClick={() => openBuy(machine)}>
// //               Buy
// //             </button>

// //           </div>

// //         </div>
// //       ))}

// //       {/* DETAILS MODAL */}
// //       {showDetails && selectedMachine && (
// //         <div className="modal-overlay">

// //           <div className="details-modal">

// //             <img src={selectedMachine.img} alt="" />
// //             <h2>{selectedMachine.name}</h2>

// //             <div className="details-grid">

// //               <div>
// //                 <span>{format(selectedMachine.price)}</span>
// //                 <p>Machine Price</p>
// //               </div>

// //               <div>
// //                 <span>{format(selectedMachine.profit)}</span>
// //                 <p>Profit / Hour</p>
// //               </div>

// //               <div>
// //                 <span>{format(selectedMachine.profit * 24)}</span>
// //                 <p>Daily Profit</p>
// //               </div>

// //               <div>
// //                 <span>{selectedMachine.duration} Days</span>
// //                 <p>Duration</p>
// //               </div>

// //             </div>

// //             <button
// //               className="details-buy"
// //               onClick={() => {
// //                 setShowDetails(false);
// //                 setShowBuy(true);
// //               }}
// //             >
// //               Buy Machine
// //             </button>

// //             <button className="details-close" onClick={closeModal}>
// //               Close
// //             </button>

// //           </div>

// //         </div>
// //       )}

// //       {/* BUY MODAL */}
// //       {showBuy && selectedMachine && (
// //         <div className="modal-overlay">

// //           <div className="details-modal">

// //             <img src={selectedMachine.img} alt="" />
// //             <h2>Confirm Purchase</h2>

// //             <div className="details-grid">

// //               <div>
// //                 <span>{format(selectedMachine.price)}</span>
// //                 <p>Machine Price</p>
// //               </div>

// //               <div>
// //                 <span>{format(selectedMachine.profit)}</span>
// //                 <p>Profit / Hour</p>
// //               </div>

// //               <div>
// //                 <span>{format(selectedMachine.profit * 24)}</span>
// //                 <p>Daily Profit</p>
// //               </div>

// //               <div>
// //                 <span>{selectedMachine.duration} Days</span>
// //                 <p>Duration</p>
// //               </div>

// //             </div>

// //             <button className="details-buy" onClick={handleBuy}>
// //               Confirm Purchase
// //             </button>

// //             <button className="details-close" onClick={closeModal}>
// //               Cancel
// //             </button>

// //           </div>

// //         </div>
// //       )}

// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import "../styles/market.css";

// import { useCurrency } from "../context/CurrencyContext";
// import { useBalance } from "../context/BalanceContext"; // ✅ IMPORT

// import pp1 from "../assets/pp1 1.png";
// import pp4 from "../assets/pp4 1.png";
// import pp5 from "../assets/pp5 1.png";
// import pp6 from "../assets/pp6 1.png";
// import pp8 from "../assets/pp8 1.png";
// import pp9 from "../assets/pp9 1.png";
// import pp10 from "../assets/pp10 1.png";
// import pp11 from "../assets/pp11 1.png";

// export const machines = [
//   { name: "Flash Speed Power Pumping Machine", price: 10, profit: 0.0264, duration: 21, img: pp1 },
//   { name: "Godspeed Power Pumping Machine", price: 20, profit: 0.0529, duration: 21, img: pp4 },
//   { name: "Surge Power Pumping Machine", price: 35, profit: 0.0925, duration: 21, img: pp5 },
//   { name: "Speedy Power Pumping Machine", price: 50, profit: 0.1322, duration: 21, img: pp6 },
//   { name: "Light Speed Pumping Machine", price: 100, profit: 0.2645, duration: 21, img: pp8 },
//   { name: "Sound Speed Power Pumping Machine", price: 500, profit: 1.3224, duration: 21, img: pp9 },
//   { name: "Sonic Power Pumping Machine", price: 1000, profit: 2.6445, duration: 21, img: pp10 },
//   { name: "Spark Power Pumping Machine", price: 5000, profit: 13.2242, duration: 21, img: pp11 }
// ];

// export default function PurchaseHall() {
//   const { currency } = useCurrency();
//   const { balance, setBalance } = useBalance(); // ✅ USE BALANCE

//   const [showDetails, setShowDetails] = useState(false);
//   const [showBuy, setShowBuy] = useState(false);
//   const [selectedMachine, setSelectedMachine] = useState(null);

//   const format = (value) => {
//     return `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 4
//     })}`;
//   };

//   const openDetails = (machine) => {
//     setSelectedMachine(machine);
//     setShowDetails(true);
//   };

//   const openBuy = (machine) => {
//     setSelectedMachine(machine);
//     setShowBuy(true);
//   };

//   const closeModal = () => {
//     setShowDetails(false);
//     setShowBuy(false);
//     setSelectedMachine(null);
//   };

//   const handleBuy = () => {
//     if (!selectedMachine) return;

//     // ❌ Prevent purchase if insufficient balance
//     if (balance < selectedMachine.price) {
//       alert("Insufficient balance!");
//       return;
//     }

//     const purchaseDate = new Date();

//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + selectedMachine.duration);

//     const ownedMachine = {
//       ...selectedMachine,
//       purchaseDate,
//       expiryDate,
//       status: "running"
//     };

//     // ✅ Deduct balance
//     setBalance(balance - selectedMachine.price);

//     console.log("Purchased Machine:", ownedMachine);
//     alert("Machine purchased successfully!");

//     closeModal();
//   };

//   return (
//     <div className="purchase-container">

//       {/* MACHINES */}
//       {machines.map((machine, index) => (
//         <div className="machine-card" key={index}>

//           <div className="machine-header">
//             <img src={machine.img} alt="machine" />

//             <div className="name-tag">
//               <h3>{machine.name}</h3>
//               <span className="tag">Clean energy</span>
//             </div>
//           </div>

//           <div className="machine-info">

//             <div className="profit">
//               <span className="value">
//                 {format(machine.profit)}
//               </span>
//               <p>Profit / Hour</p>
//             </div>

//             <div className="price">
//               <span className="value">
//                 {format(machine.price)}
//               </span>
//               <p>Price</p>
//             </div>

//           </div>

//           <div className="machine-actions">

//             <button
//               className="details"
//               onClick={() => openDetails(machine)}
//             >
//               Details
//             </button>

//             <button
//               className="buy"
//               disabled={balance < machine.price} // ✅ DISABLE IF LOW BALANCE
//               onClick={() => openBuy(machine)}
//             >
//               Buy
//             </button>

//           </div>

//         </div>
//       ))}

//       {/* DETAILS MODAL */}
//       {showDetails && selectedMachine && (
//         <div className="modal-overlay">

//           <div className="details-modal">

//             <img src={selectedMachine.img} alt="" />
//             <h2>{selectedMachine.name}</h2>

//             <div className="details-grid">

//               <div>
//                 <span>{format(selectedMachine.price)}</span>
//                 <p>Machine Price</p>
//               </div>

//               <div>
//                 <span>{format(selectedMachine.profit)}</span>
//                 <p>Profit / Hour</p>
//               </div>

//               <div>
//                 <span>{format(selectedMachine.profit * 24)}</span>
//                 <p>Daily Profit</p>
//               </div>

//               <div>
//                 <span>{selectedMachine.duration} Days</span>
//                 <p>Duration</p>
//               </div>

//             </div>

//             <button
//               className="details-buy"
//               onClick={() => {
//                 setShowDetails(false);
//                 setShowBuy(true);
//               }}
//             >
//               Buy Machine
//             </button>

//             <button className="details-close" onClick={closeModal}>
//               Close
//             </button>

//           </div>

//         </div>
//       )}

//       {/* BUY MODAL */}
//       {showBuy && selectedMachine && (
//         <div className="modal-overlay">

//           <div className="details-modal">

//             <img src={selectedMachine.img} alt="" />
//             <h2>Confirm Purchase</h2>

//             <div className="details-grid">

//               <div>
//                 <span>{format(selectedMachine.price)}</span>
//                 <p>Machine Price</p>
//               </div>

//               <div>
//                 <span>{format(selectedMachine.profit)}</span>
//                 <p>Profit / Hour</p>
//               </div>

//               <div>
//                 <span>{format(selectedMachine.profit * 24)}</span>
//                 <p>Daily Profit</p>
//               </div>

//               <div>
//                 <span>{selectedMachine.duration} Days</span>
//                 <p>Duration</p>
//               </div>

//             </div>

//             <button className="details-buy" onClick={handleBuy}>
//               Confirm Purchase
//             </button>

//             <button className="details-close" onClick={closeModal}>
//               Cancel
//             </button>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../styles/investHub.css";

import { useCurrency } from "../context/CurrencyContext";

import goldCoin from "../assets/gold-coins.png";
import goldBar from "../assets/gold-bar.png";
import goldBarStack from "../assets/gold-bar-stack.png";
import goldBarStacked from "../assets/gold-bar-stacked.png";
import goldVault from "../assets/gold-vault.png";

export const plans = [
  { name: "Starter Gold Farm", days: 7, percent: 18, img: goldCoin },
  { name: "Silver Growth Farm", days: 14, percent: 36, img: goldBar },
  { name: "Golden Harvest Farm", days: 35, percent: 160, img: goldBarStack },
  { name: "Diamond Yield Farm", days: 120, percent: 1200, img: goldBarStacked },
  { name: "Ultimate Vault Farm", days: 200, percent: 2500, img: goldVault }
];

export default function InvestHub() {
  const { currency } = useCurrency();

  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");

  const [liveROI, setLiveROI] = useState({});

  // ===== LIVE ROI =====
  useEffect(() => {
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
  }, []);

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
  };

  // ===== SAFE NUMBER =====
  const numAmount = parseFloat(amount) || 0;

  const expectedIncome =
    numAmount && selectedPlan
      ? (numAmount * getROI(selectedPlan)) / 100
      : 0;

  // ===== FORMATTER =====
  const format = (value) =>
    `${currency.symbol}${Number(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2
    })}`;

  return (
    <div className="invest-container">

      {/* PLANS */}
      {plans.map((plan, index) => {
        const roi = getROI(plan);

        return (
          <div className="plan-card" key={index}>

            <div className="plan-header">
              <img src={plan.img} alt="plan" />

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

      {/* DETAILS MODAL */}
      {showDetailsModal && selectedPlan && (
        <div className="invest-overlay">

          <div className="details-modal">

            <img src={selectedPlan.img} alt="" />
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

      {/* INVEST MODAL */}
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

            {/* ===== BINANCE STYLE CONVERSION ===== */}
            {amount && (
              <p className="converted">
                ≈ <span className="converted-value">
                  {format(numAmount)}
                </span>
              </p>
            )}

            {/* EXPECTED INCOME */}
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

              <button className="modal-confirm">
                Confirm Investment
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
