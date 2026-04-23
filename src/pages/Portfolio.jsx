// import React, { useState, useEffect } from "react";
// import "../styles/portfolio.css";

// import { useCurrency } from "../context/CurrencyContext";

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

// /* ---------------- Status Helpers ---------------- */
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
//   const [machines, setMachines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [, forceUpdate] = useState(0);

//   // ⏱ refresh UI every second
//   useEffect(() => {
//     const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // 🔐 SECURE FETCH (JWT ONLY)
//   useEffect(() => {
//     const fetchMachines = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/market/user`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
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

//   // 💱 FORMAT CURRENCY
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
//                       <button className="claim-btn">
//                         Claim Profit
//                       </button>
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

// import React, { useState, useEffect } from "react";
// import "../styles/portfolio.css";

// import { useCurrency } from "../context/CurrencyContext";

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

// /* ---------------- Status Helpers ---------------- */
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
//   const [machines, setMachines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [, forceUpdate] = useState(0);

//   // ⏱ refresh UI every second
//   useEffect(() => {
//     const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // 🔐 FETCH MACHINES
//   useEffect(() => {
//     const fetchMachines = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/market/user`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
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

//   // 💱 FORMAT CURRENCY
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

//       {/* -------- MACHINES -------- */}
//       {activeTab === "machines" && (
//         <section className="machines-section">
//           <div className="machine-cards">

//             {/* ================= SKELETON ================= */}
//             {loading ? (
//               [...Array(4)].map((_, i) => (
//                 <div className="machine-card skeleton-card" key={i}>

//                   <div className="machine-header">
//                     <div className="skeleton machine-img"></div>

//                     <div className="name-tag">
//                       <div className="skeleton line short"></div>
//                       <div className="skeleton line tiny"></div>
//                     </div>

//                     <div className="skeleton badge"></div>
//                   </div>

//                   <div className="machine-info">
//                     <div className="skeleton box"></div>
//                     <div className="skeleton box"></div>
//                   </div>

//                   <div className="skeleton progress"></div>

//                   <div className="skeleton button"></div>

//                 </div>
//               ))
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
//                       <button className="claim-btn">
//                         Claim Profit
//                       </button>
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

/* ---------------- Status Helpers ---------------- */
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
  const [investments, setInvestments] = useState([]); // ✅ added

  const [loading, setLoading] = useState(true);
  const [loadingInvestments, setLoadingInvestments] = useState(true); // ✅ added

  const [, forceUpdate] = useState(0);

  // ⏱ refresh UI every second
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔐 FETCH MACHINES
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

        setMachines(data.machines || []);
      } catch (err) {
        console.error("Fetch machines error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  // 🔐 FETCH INVESTMENTS (NEW)
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/investments/user`,
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

        setInvestments(data.investments || []);
      } catch (err) {
        console.error("Fetch investments error:", err);
      } finally {
        setLoadingInvestments(false);
      }
    };

    fetchInvestments();
  }, []);

  // 💱 FORMAT CURRENCY
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

      {/* -------- INVESTMENTS (NO UI CHANGE, just data) -------- */}
      {activeTab === "investments" && (
        <section className="machines-section">
          <div className="machine-cards">

            {loadingInvestments ? (
              <p>Loading investments...</p>
            ) : investments.length === 0 ? (
              <p>No investments yet</p>
            ) : (
              investments.map((inv) => {
                const status = getStatus(inv.startDate, inv.endDate);
                const progress = getProgress(inv.startDate, inv.endDate);

                return (
                  <div className="machine-card" key={inv._id}>
                    <div className="machine-header">

                      {/* reuse any image or leave blank */}
                      <img src={pp1} alt="investment" />

                      <div className="name-tag">
                        <h3>{inv.name}</h3>
                        <span className="tag">{inv.days} Days</span>
                      </div>

                      <span className={`status-badge ${status}`}>
                        {status === "running" ? "Running" : "Claimable"}
                      </span>
                    </div>

                    <div className="machine-info">
                      <div>
                        <span>Amount</span>
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
