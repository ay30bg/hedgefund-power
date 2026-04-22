// import React, { useState, useEffect } from "react";
// import "../styles/portfolio.css";

// import { useCurrency } from "../context/CurrencyContext";

// import goldImg from "../assets/gold-coins.png";
// import goldBarStack from "../assets/gold-bar-stack.png";

// import pp1 from "../assets/pp1 1.png";
// import pp4 from "../assets/pp4 1.png";
// import pp5 from "../assets/pp5 1.png";
// import pp6 from "../assets/pp6 1.png";
// import pp8 from "../assets/pp8 1.png";
// import pp9 from "../assets/pp9 1.png";
// import pp10 from "../assets/pp10 1.png";
// import pp11 from "../assets/pp11 1.png";

// /* ---------------- Machine Image Map ---------------- */
// const machineImages = {
//   "Flash Speed Power Pumping Machine": pp1,
//   "Godspeed Power Pumping Machine": pp4,
//   "Surge Power Pumping Machine": pp5,
//   "Speedy Power Pumping Machine": pp6,
//   "Light Speed Pumping Machine": pp8,
//   "Sound Speed Power Pumping Machine": pp9,
//   "Sonic Power Pumping Machine": pp10,
//   "Spark Power Pumping Machine": pp11,
// };

// /* ---------------- Sample Investments (unchanged) ---------------- */
// const sampleInvestments = [
//   {
//     id: 1,
//     name: "Golden Harvest Farm",
//     deposit: 1000,
//     revenue: 2600,
//     days: 35,
//     start: "2026-03-01T12:00:00",
//     end: "2026-04-05T12:00:00",
//     img: goldBarStack,
//   },
//   {
//     id: 2,
//     name: "Starter Gold Farm",
//     deposit: 500,
//     revenue: 590,
//     days: 7,
//     start: "2026-03-01T12:00:00",
//     end: "2026-03-08T12:00:00",
//     img: goldImg,
//   },
// ];

// /* ---------------- Status Functions ---------------- */
// const getStatus = (start, end) => {
//   const now = new Date();
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   if (now >= startDate && now < endDate) return "running";
//   if (now >= endDate) return "claimable";

//   return "waiting";
// };

// const getProgress = (start, end) => {
//   const now = new Date();
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   const total = endDate - startDate;
//   const current = now - startDate;

//   const progress = (current / total) * 100;
//   return Math.min(Math.max(progress, 0), 100);
// };

// export default function Portfolio() {
//   const { currency } = useCurrency();

//   const [activeTab, setActiveTab] = useState("investments");

//   // ✅ NEW STATE
//   const [machines, setMachines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ⏱️ Force UI refresh every second
//   const [, forceUpdate] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ FETCH MACHINES FROM BACKEND
//   useEffect(() => {
//     const fetchMachines = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/market/user/${localStorage.getItem("userId")}`
//         );

//         const data = await res.json();

//         if (!res.ok) {
//           console.error(data.message);
//           return;
//         }

//         setMachines(data.machines);
//       } catch (err) {
//         console.error("Fetch machines error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMachines();
//   }, []);

//   // ===== FORMATTER =====
//   const format = (value) =>
//     `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 2,
//     })}`;

//   return (
//     <div className="portfolio-page">

//       {/* -------- Tabs -------- */}
//       <div className="portfolio-tabs">
//         <button
//           className={`portfolio-tab ${activeTab === "investments" ? "active" : ""}`}
//           onClick={() => setActiveTab("investments")}
//         >
//           Investments
//         </button>

//         <button
//           className={`portfolio-tab ${activeTab === "machines" ? "active" : ""}`}
//           onClick={() => setActiveTab("machines")}
//         >
//           Machines
//         </button>
//       </div>

//       {/* -------- INVESTMENTS -------- */}
//       {activeTab === "investments" && (
//         <section className="investments-section">
//           <div className="invest-cards">
//             {sampleInvestments.map((inv) => {
//               const status = getStatus(inv.start, inv.end);
//               const progress = getProgress(inv.start, inv.end);

//               return (
//                 <div className="invest-card" key={inv.id}>
//                   <div className="invest-header">
//                     <img src={inv.img} alt={inv.name} />
//                     <div>
//                       <h3>{inv.name}</h3>
//                       <span>{inv.days} Day(s)</span>
//                     </div>

//                     <span className={`status-badge ${status}`}>
//                       {status === "running" ? "Running" : "Claimable"}
//                     </span>
//                   </div>

//                   <div className="invest-info">
//                     <div>
//                       <span>Deposit</span>
//                       <strong>{format(inv.deposit)}</strong>
//                     </div>

//                     <div>
//                       <span>Revenue</span>
//                       <strong>{format(inv.revenue)}</strong>
//                     </div>
//                   </div>

//                   <div className="progress-bar">
//                     <div className="progress-fill" style={{ width: `${progress}%` }} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}

//       {/* -------- MACHINES -------- */}
//       {activeTab === "machines" && (
//         <section className="machines-section">
//           <div className="machine-cards">

//             {loading ? (
//               <p>Loading machines...</p>
//             ) : machines.length === 0 ? (
//               <p>No machines purchased yet</p>
//             ) : (
//               machines.map((machine) => {
//                 const status = getStatus(machine.purchaseDate, machine.expiryDate);
//                 const progress = getProgress(machine.purchaseDate, machine.expiryDate);

//                 return (
//                   <div className="machine-card" key={machine._id}>
//                     <div className="machine-header">
//                       <img
//                         src={machineImages[machine.name]}
//                         alt={machine.name}
//                       />

//                       <div className="name-tag">
//                         <h3>{machine.name}</h3>
//                         <span className="tag">{machine.duration} Days</span>
//                       </div>

//                       <span className={`status-badge ${status}`}>
//                         {status === "running" ? "Running" : "Claimable"}
//                       </span>
//                     </div>

//                     <div className="machine-info">
//                       <div>
//                         <span>Profit / Hour</span>
//                         <strong>{format(machine.profit)}</strong>
//                       </div>

//                       <div>
//                         <span>Daily Profit</span>
//                         <strong>{format(machine.profit * 24)}</strong>
//                       </div>
//                     </div>

//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>

//                     {status === "claimable" && (
//                       <button className="claim-btn">Claim Profit</button>
//                     )}
//                   </div>
//                 );
//               })
//             )}

//           </div>
//         </section>
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

/* ---------------- Status Functions ---------------- */
const getStatus = (start, end) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now >= startDate && now < endDate) return "running";
  if (now >= endDate) return "claimable";
  return "waiting";
};

const getProgress = (start, end) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  const total = endDate - startDate;
  const current = now - startDate;

  const progress = (current / total) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

export default function Portfolio() {
  const { currency } = useCurrency();

  const [activeTab, setActiveTab] = useState("investments");
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [, forceUpdate] = useState(0);

  // ⏱️ UI refresh
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔐 FIXED: JWT-based fetch (NO userId)
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/market/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        setMachines(data.machines);
      } catch (err) {
        console.error("Fetch machines error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="portfolio-page">

      {/* -------- Tabs -------- */}
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

      {/* -------- MACHINES -------- */}
      {activeTab === "machines" && (
        <section className="machines-section">
          <div className="machine-cards">

            {loading ? (
              <p>Loading machines...</p>
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
                        {status === "running" ? "Running" : "Claimable"}
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
                      <button className="claim-btn">
                        Claim Profit
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
