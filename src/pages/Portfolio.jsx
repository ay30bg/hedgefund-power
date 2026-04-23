// // import React, { useState, useEffect } from "react";
// // import "../styles/portfolio.css";

// // import { useCurrency } from "../context/CurrencyContext";

// // import goldImg from "../assets/gold-coins.png";
// // import goldBarStack from "../assets/gold-bar-stack.png";

// // import pp1 from "../assets/pp1 1.png";
// // import pp4 from "../assets/pp4 1.png";
// // import pp5 from "../assets/pp5 1.png";
// // import pp6 from "../assets/pp6 1.png";
// // import pp8 from "../assets/pp8 1.png";
// // import pp9 from "../assets/pp9 1.png";
// // import pp10 from "../assets/pp10 1.png";
// // import pp11 from "../assets/pp11 1.png";

// // /* ---------------- Machine Image Map ---------------- */
// // const machineImages = {
// //   "Flash Speed Power Pumping Machine": pp1,
// //   "Godspeed Power Pumping Machine": pp4,
// //   "Surge Power Pumping Machine": pp5,
// //   "Speedy Power Pumping Machine": pp6,
// //   "Light Speed Pumping Machine": pp8,
// //   "Sound Speed Power Pumping Machine": pp9,
// //   "Sonic Power Pumping Machine": pp10,
// //   "Spark Power Pumping Machine": pp11,
// // };

// // /* ---------------- Status Helpers ---------------- */
// // const getStatus = (start, end) => {
// //   if (!start || !end) return "waiting";

// //   const now = new Date();
// //   const startDate = new Date(start);
// //   const endDate = new Date(end);

// //   if (now >= startDate && now < endDate) return "running";
// //   if (now >= endDate) return "claimable";
// //   return "waiting";
// // };

// // const getProgress = (start, end) => {
// //   if (!start || !end) return 0;

// //   const now = new Date();
// //   const startDate = new Date(start);
// //   const endDate = new Date(end);

// //   const total = endDate - startDate;
// //   const current = now - startDate;

// //   const progress = (current / total) * 100;
// //   return Math.min(Math.max(progress, 0), 100);
// // };

// // /* ---------------- Date Formatter ---------------- */
// // const formatDateTime = (date) => {
// //   if (!date) return "N/A";

// //   return new Date(date).toLocaleString(undefined, {
// //     year: "numeric",
// //     month: "short",
// //     day: "numeric",
// //     hour: "2-digit",
// //     minute: "2-digit",
// //   });
// // };

// // export default function Portfolio() {
// //   const { currency } = useCurrency();

// //   const [activeTab, setActiveTab] = useState("investments");

// //   const [machines, setMachines] = useState([]);
// //   const [investments, setInvestments] = useState([]);

// //   const [loading, setLoading] = useState(true);
// //   const [loadingInvestments, setLoadingInvestments] = useState(true);

// //   const [, forceUpdate] = useState(0);

// //   // ⏱ live UI refresh
// //   useEffect(() => {
// //     const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   /* ---------------- FETCH MACHINES ---------------- */
// //   useEffect(() => {
// //     const fetchMachines = async () => {
// //       try {
// //         const token = localStorage.getItem("token");

// //         const res = await fetch(
// //           `${process.env.REACT_APP_API_URL}/api/market/user`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const data = await res.json();

// //         if (!res.ok) {
// //           console.error(data.message);
// //           return;
// //         }

// //         setMachines(data.machines || []);
// //       } catch (err) {
// //         console.error("Fetch machines error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMachines();
// //   }, []);

// //   /* ---------------- FETCH INVESTMENTS ---------------- */
// //   useEffect(() => {
// //     const fetchInvestments = async () => {
// //       try {
// //         const token = localStorage.getItem("token");

// //         const res = await fetch(
// //           `${process.env.REACT_APP_API_URL}/api/invest/user`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const data = await res.json();

// //         if (!res.ok) {
// //           console.error(data.message);
// //           return;
// //         }

// //         setInvestments(data.investments || []);
// //       } catch (err) {
// //         console.error("Fetch investments error:", err);
// //       } finally {
// //         setLoadingInvestments(false);
// //       }
// //     };

// //     fetchInvestments();
// //   }, []);

// //   /* ---------------- FORMAT CURRENCY ---------------- */
// //   const format = (value) =>
// //     `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
// //       maximumFractionDigits: 2,
// //     })}`;

// //   return (
// //     <div className="portfolio-page">

// //       {/* -------- Tabs -------- */}
// //       <div className="portfolio-tabs">
// //         <button
// //           className={`portfolio-tab ${activeTab === "investments" ? "active" : ""}`}
// //           onClick={() => setActiveTab("investments")}
// //         >
// //           Investments
// //         </button>

// //         <button
// //           className={`portfolio-tab ${activeTab === "machines" ? "active" : ""}`}
// //           onClick={() => setActiveTab("machines")}
// //         >
// //           Machines
// //         </button>
// //       </div>

// //       {/* -------- INVESTMENTS -------- */}
// //       {activeTab === "investments" && (
// //         <section className="investments-section">
// //           <div className="invest-cards">

// //             {loadingInvestments ? (
// //               <p>Loading investments...</p>
// //             ) : investments.length === 0 ? (
// //               <p>No investments yet</p>
// //             ) : (
// //               investments.map((inv) => {
// //                 const status = getStatus(inv.startDate, inv.endDate);
// //                 const progress = getProgress(inv.startDate, inv.endDate);

// //                 return (
// //                   <div className="invest-card" key={inv._id}>
// //                     <div className="invest-header">
// //                       <img
// //                         src={inv.days > 10 ? goldBarStack : goldImg}
// //                         alt={inv.name}
// //                       />

// //                       <div>
// //                         <h3>{inv.name}</h3>
// //                         <span>{inv.days} Day(s)</span>
// //                       </div>

// //                       <span className={`status-badge ${status}`}>
// //                         {status === "running"
// //                           ? "Running"
// //                           : status === "claimable"
// //                           ? "Claimable"
// //                           : "Pending"}
// //                       </span>
// //                     </div>

// //                     <div className="invest-info">
// //                       <div>
// //                         <span>Deposit</span>
// //                         <strong>{format(inv.amount)}</strong>
// //                       </div>

// //                       <div>
// //                         <span>Total Profit</span>
// //                         <strong>{format(inv.profit)}</strong>
// //                       </div>
// //                     </div>

// //                     <div className="progress-bar">
// //                       <div
// //                         className="progress-fill"
// //                         style={{ width: `${progress}%` }}
// //                       />
// //                     </div>

// //                     <p className="invest-dates">
// //                       {formatDateTime(inv.startDate)} -{" "}
// //                       {formatDateTime(inv.endDate)}
// //                     </p>

// //                     {status === "claimable" && (
// //                       <button className="claim-btn">
// //                         Claim Profit
// //                       </button>
// //                     )}
// //                   </div>
// //                 );
// //               })
// //             )}

// //           </div>
// //         </section>
// //       )}

// //       {/* -------- MACHINES -------- */}
// //       {activeTab === "machines" && (
// //         <section className="machines-section">
// //           <div className="machine-cards">

// //             {loading ? (
// //               <p>Loading machines...</p>
// //             ) : machines.length === 0 ? (
// //               <p>No machines purchased yet</p>
// //             ) : (
// //               machines.map((machine) => {
// //                 const status = getStatus(machine.purchaseDate, machine.expiryDate);
// //                 const progress = getProgress(machine.purchaseDate, machine.expiryDate);

// //                 return (
// //                   <div className="machine-card" key={machine._id}>
// //                     <div className="machine-header">
// //                       <img
// //                         src={machineImages[machine.name]}
// //                         alt={machine.name}
// //                       />

// //                       <div className="name-tag">
// //                         <h3>{machine.name}</h3>
// //                         <span className="tag">{machine.duration} Days</span>
// //                       </div>

// //                       <span className={`status-badge ${status}`}>
// //                         {status === "running"
// //                           ? "Running"
// //                           : status === "claimable"
// //                           ? "Claimable"
// //                           : "Pending"}
// //                       </span>
// //                     </div>

// //                     <div className="machine-info">
// //                       <div>
// //                         <span>Profit / Hour</span>
// //                         <strong>{format(machine.profit)}</strong>
// //                       </div>

// //                       <div>
// //                         <span>Daily Profit</span>
// //                         <strong>{format(machine.profit * 24)}</strong>
// //                       </div>
// //                     </div>

// //                     <div className="progress-bar">
// //                       <div
// //                         className="progress-fill"
// //                         style={{ width: `${progress}%` }}
// //                       />
// //                     </div>

// //                     {status === "claimable" && (
// //                       <button className="claim-btn">
// //                         Claim Profit
// //                       </button>
// //                     )}
// //                   </div>
// //                 );
// //               })
// //             )}

// //           </div>
// //         </section>
// //       )}

// //     </div>
// //   );
// // }

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

// /* ---------------- Status Helpers ---------------- */
// const getStatus = (start, end) => {
//   if (!start || !end) return "waiting";

//   const now = new Date();
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   if (now >= startDate && now < endDate) return "running";
//   if (now >= endDate) return "claimable";
//   return "waiting";
// };

// const getProgress = (start, end) => {
//   if (!start || !end) return 0;

//   const now = new Date();
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   const total = endDate - startDate;
//   const current = now - startDate;

//   const progress = (current / total) * 100;
//   return Math.min(Math.max(progress, 0), 100);
// };

// /* ---------------- Date Formatter ---------------- */
// const formatDateTime = (date) => {
//   if (!date) return "N/A";

//   return new Date(date).toLocaleString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// export default function Portfolio() {
//   const { currency } = useCurrency();

//   const [activeTab, setActiveTab] = useState("investments");

//   const [machines, setMachines] = useState([]);
//   const [investments, setInvestments] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [loadingInvestments, setLoadingInvestments] = useState(true);

//   const [, forceUpdate] = useState(0);

//   // ⏱ live UI refresh
//   useEffect(() => {
//     const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   /* ---------------- FETCH MACHINES ---------------- */
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

//         setMachines(data.machines || []);
//       } catch (err) {
//         console.error("Fetch machines error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMachines();
//   }, []);

//   /* ---------------- FETCH INVESTMENTS ---------------- */
//   useEffect(() => {
//     const fetchInvestments = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/invest/user`,
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

//         setInvestments(data.investments || []);
//       } catch (err) {
//         console.error("Fetch investments error:", err);
//       } finally {
//         setLoadingInvestments(false);
//       }
//     };

//     fetchInvestments();
//   }, []);

//   /* ---------------- FORMAT CURRENCY ---------------- */
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

//       {/* ================= INVESTMENTS ================= */}
//       {activeTab === "investments" && (
//         <section className="investments-section">
//           <div className="invest-cards">

//             {loadingInvestments ? (
//               Array.from({ length: 3 }).map((_, i) => (
//                 <div className="invest-card skeleton" key={i}>
                  
//                   {/* header (same as machines) */}
//                   <div className="invest-header">
//                     <div className="skeleton-img"></div>

//                     <div className="name-tag">
//                       <div className="skeleton-line title"></div>
//                       <div className="skeleton-line small"></div>
//                     </div>

//                     <div className="skeleton-badge"></div>
//                   </div>

//                   {/* info */}
//                   <div className="invest-info">
//                     <div>
//                       <div className="skeleton-line small"></div>
//                       <div className="skeleton-line medium"></div>
//                     </div>

//                     <div>
//                       <div className="skeleton-line small"></div>
//                       <div className="skeleton-line medium"></div>
//                     </div>
//                   </div>

//                   {/* progress */}
//                   <div className="skeleton-progress"></div>

//                   {/* footer */}
//                   <div className="skeleton-line full"></div>

//                 </div>
//               ))
//             ) : investments.length === 0 ? (
//               <p>No investments yet</p>
//             ) : (
//               investments.map((inv) => {
//                 const status = getStatus(inv.startDate, inv.endDate);
//                 const progress = getProgress(inv.startDate, inv.endDate);

//                 return (
//                   <div className="invest-card" key={inv._id}>
//                     <div className="invest-header">
//                       <img
//                         src={inv.days > 10 ? goldBarStack : goldImg}
//                         alt={inv.name}
//                       />

//                       <div className="name-tag">
//                         <h3>{inv.name}</h3>
//                         <span className="tag">{inv.days} Day(s)</span>
//                       </div>

//                       <span className={`status-badge ${status}`}>
//                         {status === "running"
//                           ? "Running"
//                           : status === "claimable"
//                           ? "Claimable"
//                           : "Pending"}
//                       </span>
//                     </div>

//                     <div className="invest-info">
//                       <div>
//                         <span>Deposit</span>
//                         <strong>{format(inv.amount)}</strong>
//                       </div>

//                       <div>
//                         <span>Total Profit</span>
//                         <strong>{format(inv.profit)}</strong>
//                       </div>
//                     </div>

//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>

//                     <p className="invest-dates">
//                       {formatDateTime(inv.startDate)} -{" "}
//                       {formatDateTime(inv.endDate)}
//                     </p>

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

//       {/* ================= MACHINES ================= */}
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
//                         {status === "running"
//                           ? "Running"
//                           : status === "claimable"
//                           ? "Claimable"
//                           : "Pending"}
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

  const [loading, setLoading] = useState(true);
  const [loadingInvestments, setLoadingInvestments] = useState(true);

  const [, forceUpdate] = useState(0);

  // 👇 keeps last known UI size for skeleton
  const [prevInvestCount, setPrevInvestCount] = useState(3);

  /* live refresh */
  useEffect(() => {
    const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- FETCH MACHINES ---------------- */
  useEffect(() => {
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

        if (!res.ok) return console.error(data.message);

        setMachines(data.machines || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  /* ---------------- FETCH INVESTMENTS ---------------- */
  useEffect(() => {
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

        if (!res.ok) return console.error(data.message);

        const list = data.investments || [];

        setInvestments(list);

        // 👇 store last known count for skeleton UI
        setPrevInvestCount(list.length || 3);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInvestments(false);
      }
    };

    fetchInvestments();
  }, []);

  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="portfolio-page">

      {/* ---------------- TABS ---------------- */}
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
              Array.from({ length: prevInvestCount || 3 }).map((_, i) => (
                <div className="invest-card skeleton-card" key={i}>

                  {/* HEADER */}
                  <div className="invest-header">
                    <div className="skeleton-avatar" />

                    <div className="name-tag">
                      <div className="skeleton-line title" />
                      <div className="skeleton-line small" />
                    </div>

                    <div className="skeleton-pill" />
                  </div>

                  {/* INFO */}
                  <div className="invest-info">
                    <div className="info-block">
                      <div className="skeleton-line small" />
                      <div className="skeleton-line medium" />
                    </div>

                    <div className="info-block">
                      <div className="skeleton-line small" />
                      <div className="skeleton-line medium" />
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="skeleton-progress" />

                  {/* FOOTER */}
                  <div className="skeleton-line full" />

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
                        {status === "running"
                          ? "Running"
                          : status === "claimable"
                          ? "Claimable"
                          : "Pending"}
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
                      <button className="claim-btn">Claim Profit</button>
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
                        {status === "running"
                          ? "Running"
                          : status === "claimable"
                          ? "Claimable"
                          : "Pending"}
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
              })
            )}

          </div>
        </section>
      )}

    </div>
  );
}
