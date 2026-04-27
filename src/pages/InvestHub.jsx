// import React, { useState, useEffect } from "react";
// import "../styles/investHub.css";

// import { useCurrency } from "../context/CurrencyContext";
// import { useBalance } from "../context/BalanceContext";

// export default function InvestHub() {
//   const { currency } = useCurrency();
//   const { setBalance } = useBalance();

//   const [plans, setPlans] = useState([]);
//   const [loadingPlans, setLoadingPlans] = useState(true);

//   const [showInvestModal, setShowInvestModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [amount, setAmount] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [liveROI, setLiveROI] = useState({});

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

//   // ================= LIVE ROI =================
//   useEffect(() => {
//     if (!plans.length) return;

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
//   }, [plans]);

//   const getROI = (plan) => liveROI[plan.name] ?? plan.percent;

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
//   const numAmount = parseFloat(amount) || 0;

//   const expectedIncome =
//     numAmount && selectedPlan
//       ? (numAmount * getROI(selectedPlan)) / 100
//       : 0;

//   const format = (value) =>
//     `${currency.symbol}${Number(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 2
//     })}`;

//   // ================= INVEST =================
//   const handleInvest = async () => {
//     if (!selectedPlan || !numAmount) return;

//     if (numAmount < 10) {
//       alert("Minimum investment is $10");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/invest`,
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

//   // ================= SKELETON LOADER =================
//   if (loadingPlans) {
//     return (
//       <div className="invest-container">
//         {[1, 2, 3, 4].map((i) => (
//           <div className="plan-card skeleton-card" key={i}>

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
//       {plans.map((plan, index) => {
//         const roi = getROI(plan);

//         return (
//           <div className="plan-card" key={index}>

//             <div className="plan-header">
//               <img
//                 src={`${process.env.REACT_APP_API_URL}${plan.image}`}
//                 alt="plan"
//               />

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

//       {/* ================= DETAILS MODAL ================= */}
//       {showDetailsModal && selectedPlan && (
//         <div className="invest-overlay">
//           <div className="details-modal">

//             <img
//               src={`${process.env.REACT_APP_API_URL}${selectedPlan.image}`}
//               alt=""
//             />

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

//       {/* ================= INVEST MODAL ================= */}
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
import "../styles/portfolio.css";

import { useCurrency } from "../context/CurrencyContext";

import goldImg from "../assets/gold-coins.png";
import goldBarStack from "../assets/gold-bar-stack.png";

import pp1 from "../assets/pp1 1.png";
import pp4 from "../assets/pp4 1.png";
import pp5 from "../assets/pp5 1.png";
import pp6 from "../assets/pp6 1.png";
import pp8 from "../assets/pp8 1.png";
import pp9 from "../assets/pp9 1.png";
import pp10 from "../assets/pp10 1.png";
import pp11 from "../assets/pp11 1.png";

/* ---------------- Machine Image Map ---------------- */
const machineImages = {
  "Flash Speed Power Pumping Machine": pp1,
  "Godspeed Power Pumping Machine": pp4,
  "Surge Power Pumping Machine": pp5,
  "Speedy Power Pumping Machine": pp6,
  "Light Speed Pumping Machine": pp8,
  "Sound Speed Power Pumping Machine": pp9,
  "Sonic Power Pumping Machine": pp10,
  "Spark Power Pumping Machine": pp11,
};

/* ---------------- Helpers ---------------- */
const getStatus = (start, end) => {
  if (!start || !end) return "waiting";

  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now >= startDate && now < endDate) return "running";
  if (now >= endDate) return "claimable";
  return "waiting";
};

const getProgress = (start, end) => {
  if (!start || !end) return 0;

  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  const total = endDate - startDate;
  const current = now - startDate;

  return Math.min(Math.max((current / total) * 100, 0), 100);
};

const formatDateTime = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Portfolio() {
  const { currency } = useCurrency();

  const [activeTab, setActiveTab] = useState("investments");

  const [machines, setMachines] = useState([]);
  const [investments, setInvestments] = useState([]);

  const [loadingId, setLoadingId] = useState(null);

  const [loadingInvestments, setLoadingInvestments] = useState(true);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const [, forceUpdate] = useState(0);

  /* live refresh */
  useEffect(() => {
    const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- FETCH ---------------- */
  const fetchMachines = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/market/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok) setMachines(data.machines || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMachines(false);
    }
  };

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/invest/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok) setInvestments(data.investments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInvestments(false);
    }
  };

  useEffect(() => {
    fetchMachines();
    fetchInvestments();
  }, []);

  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  /* ---------------- CLAIM ---------------- */
  const handleClaimInvestment = async (id) => {
    try {
      setLoadingId(id);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/invest/claim/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Claim failed");
        return;
      }

      alert("Investment claimed successfully");
      await fetchInvestments();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleClaimMachine = async (id) => {
    try {
      setLoadingId(id);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/market/claim/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Claim failed");
        return;
      }

      alert("Machine profit claimed");
      await fetchMachines();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="portfolio-page">

      {/* ================= TABS ================= */}
      <div className="portfolio-tabs">
        <button
          className={`portfolio-tab ${activeTab === "investments" ? "active" : ""}`}
          onClick={() => setActiveTab("investments")}
        >
          Investments
        </button>

        <button
          className={`portfolio-tab ${activeTab === "machines" ? "active" : ""}`}
          onClick={() => setActiveTab("machines")}
        >
          Machines
        </button>
      </div>

      {/* ================= INVESTMENTS ================= */}
      {activeTab === "investments" && (
        <section className="investments-section">

          <div className="invest-cards">

            {loadingInvestments ? (
              [...Array(3)].map((_, i) => (
                <div className="invest-card skeleton-card" key={i}>

                  <div className="invest-header">
                    <div className="skeleton img"></div>

                    <div className="name-tag">
                      <div className="skeleton line short"></div>
                      <div className="skeleton line tiny"></div>
                    </div>

                    <div className="skeleton badge"></div>
                  </div>

                  <div className="invest-info">
                    <div className="skeleton box"></div>
                    <div className="skeleton box"></div>
                  </div>

                  <div className="skeleton progress"></div>
                  <div className="skeleton line full"></div>
                  <div className="skeleton button"></div>

                </div>
              ))
            ) : investments.length === 0 ? (
              <p>No investments yet</p>
            ) : (
              investments.map((inv) => {
                const status = getStatus(inv.startDate, inv.endDate);
                const progress = getProgress(inv.startDate, inv.endDate);

                return (
                  <div className="invest-card" key={inv._id}>
                    <div className="invest-header">
                      <img
                        src={inv.days > 10 ? goldBarStack : goldImg}
                        alt={inv.name}
                      />

                      <div className="name-tag">
                        <h3>{inv.name}</h3>
                        <span className="tag">{inv.days} Day(s)</span>
                      </div>

                      <span className={`status-badge ${status}`}>
                        {status}
                      </span>
                    </div>

                    <div className="invest-info">
                      <div>
                        <span>Deposit</span>
                        <strong>{format(inv.amount)}</strong>
                      </div>

                      <div>
                        <span>Total Profit</span>
                        <strong>{format(inv.profit)}</strong>
                      </div>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="invest-dates">
                      {formatDateTime(inv.startDate)} -{" "}
                      {formatDateTime(inv.endDate)}
                    </p>

                    {status === "claimable" && (
                      <button
                        className="claim-btn"
                        onClick={() => handleClaimInvestment(inv._id)}
                        disabled={loadingId === inv._id}
                      >
                        {loadingId === inv._id ? "Processing..." : "Claim Profit"}
                      </button>
                    )}
                  </div>
                );
              })
            )}

          </div>
        </section>
      )}

      {/* ================= MACHINES ================= */}
      {activeTab === "machines" && (
        <section className="machines-section">

          <div className="machine-cards">

            {loadingMachines ? (
              [...Array(3)].map((_, i) => (
                <div className="machine-card skeleton-card" key={i}>

                  <div className="machine-header">
                    <div className="skeleton img"></div>

                    <div className="name-tag">
                      <div className="skeleton line short"></div>
                      <div className="skeleton line tiny"></div>
                    </div>

                    <div className="skeleton badge"></div>
                  </div>

                  <div className="machine-info">
                    <div className="skeleton box"></div>
                    <div className="skeleton box"></div>
                  </div>

                  <div className="skeleton progress"></div>
                  <div className="skeleton button"></div>

                </div>
              ))
            ) : machines.length === 0 ? (
              <p>No machines purchased yet</p>
            ) : (
              machines.map((machine) => {
                const status = getStatus(machine.purchaseDate, machine.expiryDate);
                const progress = getProgress(machine.purchaseDate, machine.expiryDate);

                return (
                  <div className="machine-card" key={machine._id}>
                    <div className="machine-header">
                      <img
                        src={machineImages[machine.name]}
                        alt={machine.name}
                      />

                      <div className="name-tag">
                        <h3>{machine.name}</h3>
                        <span className="tag">{machine.duration} Days</span>
                      </div>

                      <span className={`status-badge ${status}`}>
                        {status}
                      </span>
                    </div>

                    <div className="machine-info">
                      <div>
                        <span>Profit / Hour</span>
                        <strong>{format(machine.profit)}</strong>
                      </div>

                      <div>
                        <span>Daily Profit</span>
                        <strong>{format(machine.profit * 24)}</strong>
                      </div>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {status === "claimable" && (
                      <button
                        className="claim-btn"
                        onClick={() => handleClaimMachine(machine._id)}
                        disabled={loadingId === machine._id}
                      >
                        {loadingId === machine._id
                          ? "Processing..."
                          : "Claim Profit"}
                      </button>
                    )}
                  </div>
                );
              })
            )}

          </div>
        </section>
      )}

    </div>
  );
}
