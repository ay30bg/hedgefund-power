// import React, { useState, useEffect } from "react";
// import "../styles/portfolio.css";

// import goldImg from "../assets/gold-coins.png";
// import goldBarStack from "../assets/gold-bar-stack.png";
// import pp1 from "../assets/pp1 1.png";
// import pp4 from "../assets/pp4 1.png";
// import pp5 from "../assets/pp5 1.png";

// /* ---------------- Sample Investments ---------------- */
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

// /* ---------------- Sample Machines ---------------- */
// const ownedMachines = [
//   {
//     id: 1,
//     name: "Flash Speed Power Pumping Machine",
//     level: 1,
//     start: "2026-03-10T12:00:00",
//     end: "2026-03-15T12:00:00",
//     img: pp1,
//     profit: 0.0179,
//   },
//   {
//     id: 2,
//     name: "Godspeed Power Pumping Machine",
//     level: 1,
//     start: "2026-03-08T12:00:00",
//     end: "2026-03-13T12:00:00",
//     img: pp4,
//     profit: 0.0358,
//   },
//   {
//     id: 3,
//     name: "Surge Power Pumping Machine",
//     level: 1,
//     start: "2026-03-12T12:00:00",
//     end: "2026-03-18T12:00:00",
//     img: pp5,
//     profit: 0.0627,
//   },
// ];

// /* ---------------- Status & Progress Functions ---------------- */
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
//   const [activeTab, setActiveTab] = useState("investments");

//   /* -------- Live Refresh -------- */
//   const [, forceUpdate] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="portfolio-page">
//       {/* -------- Tabs -------- */}
//       <div className="portfolio-tabs">
//         <button
//           className={`portfolio-tab ${
//             activeTab === "investments" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("investments")}
//         >
//           Investments
//         </button>

//         <button
//           className={`portfolio-tab ${
//             activeTab === "machines" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("machines")}
//         >
//           Machines
//         </button>
//       </div>

//       {/* -------- Investments -------- */}
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
//                       <strong>${inv.deposit}</strong>
//                     </div>
//                     <div>
//                       <span>Revenue</span>
//                       <strong>${inv.revenue}</strong>
//                     </div>
//                   </div>

//                   <div className="progress-bar">
//                     <div
//                       className="progress-fill"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>

//                   <p className="invest-dates">
//                     {inv.start} - {inv.end}
//                   </p>

//                   {status === "claimable" && (
//                     <button className="claim-btn">Claim Profit</button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}

//       {/* -------- Machines -------- */}
//       {activeTab === "machines" && (
//         <section className="machines-section">
//           <div className="machine-cards">
//             {ownedMachines.map((machine) => {
//               const status = getStatus(machine.start, machine.end);
//               const progress = getProgress(machine.start, machine.end);

//               return (
//                 <div className="machine-card" key={machine.id}>
//                   <div className="machine-header">
//                     <img src={machine.img} alt={machine.name} />

//                     <div className="name-tag">
//                       <h3>{machine.name}</h3>
//                       <span className="tag">Level {machine.level}</span>
//                     </div>

//                     <span className={`status-badge ${status}`}>
//                       {status === "running" ? "Running" : "Claimable"}
//                     </span>
//                   </div>

//                   <div className="machine-info">
//                     <div>
//                       <span>Profit / Hour</span>
//                       <strong>${machine.profit.toFixed(4)}</strong>
//                     </div>

//                     <div>
//                       <span>Daily Profit</span>
//                       <strong>${(machine.profit * 24).toFixed(4)}</strong>
//                     </div>
//                   </div>

//                   <div className="progress-bar">
//                     <div
//                       className="progress-fill"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>

//                   {status === "claimable" && (
//                     <button className="claim-btn">Claim Profit</button>
//                   )}
//                 </div>
//               );
//             })}
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

/* ---------------- Sample Investments ---------------- */
const sampleInvestments = [
  {
    id: 1,
    name: "Golden Harvest Farm",
    deposit: 1000,
    revenue: 2600,
    days: 35,
    start: "2026-03-01T12:00:00",
    end: "2026-04-05T12:00:00",
    img: goldBarStack,
  },
  {
    id: 2,
    name: "Starter Gold Farm",
    deposit: 500,
    revenue: 590,
    days: 7,
    start: "2026-03-01T12:00:00",
    end: "2026-03-08T12:00:00",
    img: goldImg,
  },
];

/* ---------------- Sample Machines ---------------- */
const ownedMachines = [
  {
    id: 1,
    name: "Flash Speed Power Pumping Machine",
    level: 1,
    start: "2026-03-10T12:00:00",
    end: "2026-03-15T12:00:00",
    img: pp1,
    profit: 0.0179,
  },
  {
    id: 2,
    name: "Godspeed Power Pumping Machine",
    level: 1,
    start: "2026-03-08T12:00:00",
    end: "2026-03-13T12:00:00",
    img: pp4,
    profit: 0.0358,
  },
  {
    id: 3,
    name: "Surge Power Pumping Machine",
    level: 1,
    start: "2026-03-12T12:00:00",
    end: "2026-03-18T12:00:00",
    img: pp5,
    profit: 0.0627,
  },
];

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

  const { currency } = useCurrency(); // ✅ GLOBAL

  const [activeTab, setActiveTab] = useState("investments");

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // ===== FORMATTER =====
  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="portfolio-page">

      {/* -------- Tabs -------- */}
      <div className="portfolio-tabs">
        <button
          className={`portfolio-tab ${
            activeTab === "investments" ? "active" : ""
          }`}
          onClick={() => setActiveTab("investments")}
        >
          Investments
        </button>

        <button
          className={`portfolio-tab ${
            activeTab === "machines" ? "active" : ""
          }`}
          onClick={() => setActiveTab("machines")}
        >
          Machines
        </button>
      </div>

      {/* -------- INVESTMENTS -------- */}
      {activeTab === "investments" && (
        <section className="investments-section">
          <div className="invest-cards">

            {sampleInvestments.map((inv) => {
              const status = getStatus(inv.start, inv.end);
              const progress = getProgress(inv.start, inv.end);

              return (
                <div className="invest-card" key={inv.id}>

                  <div className="invest-header">
                    <img src={inv.img} alt={inv.name} />
                    <div>
                      <h3>{inv.name}</h3>
                      <span>{inv.days} Day(s)</span>
                    </div>

                    <span className={`status-badge ${status}`}>
                      {status === "running" ? "Running" : "Claimable"}
                    </span>
                  </div>

                  <div className="invest-info">
                    <div>
                      <span>Deposit</span>
                      <strong>{format(inv.deposit)}</strong>
                    </div>

                    <div>
                      <span>Revenue</span>
                      <strong>{format(inv.revenue)}</strong>
                    </div>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="invest-dates">
                    {inv.start} - {inv.end}
                  </p>

                  {status === "claimable" && (
                    <button className="claim-btn">Claim Profit</button>
                  )}

                </div>
              );
            })}

          </div>
        </section>
      )}

      {/* -------- MACHINES -------- */}
      {activeTab === "machines" && (
        <section className="machines-section">
          <div className="machine-cards">

            {ownedMachines.map((machine) => {
              const status = getStatus(machine.start, machine.end);
              const progress = getProgress(machine.start, machine.end);

              return (
                <div className="machine-card" key={machine.id}>

                  <div className="machine-header">
                    <img src={machine.img} alt={machine.name} />

                    <div className="name-tag">
                      <h3>{machine.name}</h3>
                      <span className="tag">Level {machine.level}</span>
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
                    <button className="claim-btn">Claim Profit</button>
                  )}

                </div>
              );
            })}

          </div>
        </section>
      )}

    </div>
  );
}
