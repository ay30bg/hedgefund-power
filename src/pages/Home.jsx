// import React, { useEffect, useState } from "react";
// import "../styles/home.css";

// import { useCurrency } from "../context/CurrencyContext";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const DashboardHomepage = () => {
//   const { currency } = useCurrency();

//   const [activities, setActivities] = useState([]);
//   const [marketShift, setMarketShift] = useState(0);

//   const [machines, setMachines] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [loadingPlans, setLoadingPlans] = useState(true);
//   const [loadingMachines, setLoadingMachines] = useState(true);

//   const [chartData, setChartData] = useState([
//     { day: "Mon", profit: 120 },
//     { day: "Tue", profit: 210 },
//     { day: "Wed", profit: 180 },
//     { day: "Thu", profit: 260 },
//     { day: "Fri", profit: 320 },
//     { day: "Sat", profit: 280 },
//     { day: "Sun", profit: 350 },
//   ]);

//   // ================= FETCH MACHINES =================
//   useEffect(() => {
//     const fetchMachines = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/machines`
//         );
//         const data = await res.json();

//         if (res.ok) {
//           setMachines(data.machines);
//         }
//       } catch (err) {
//         console.error("Error fetching machines:", err);
//       } finally {
//         setLoadingMachines(false);
//       }
//     };

//     fetchMachines();
//   }, []);

//   // ================= FETCH PLANS =================
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/plans`
//         );
//         const data = await res.json();

//         if (res.ok) {
//           setPlans(data.plans);
//         }
//       } catch (err) {
//         console.error("Error fetching plans:", err);
//       } finally {
//         setLoadingPlans(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   // ================= LIVE ACTIVITY =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const names = ["J***", "A***", "M***", "K***", "S***"];
//       const type = Math.random() > 0.5 ? "deposit" : "withdrawal";
//       const amount = Math.floor(Math.random() * 2000) + 100;

//       setActivities((prev) => [
//         {
//           id: Date.now(),
//           name: names[Math.floor(Math.random() * names.length)],
//           type,
//           amount,
//         },
//         ...prev.slice(0, 7),
//       ]);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // ================= MARKET SHIFT =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMarketShift(Math.random() * 10 - 5);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // ================= CHART =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setChartData((prev) =>
//         prev.map((item) => ({
//           ...item,
//           profit: Math.max(
//             50,
//             item.profit + Math.floor(Math.random() * 40 - 20)
//           ),
//         }))
//       );
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   // ================= INSIGHTS =================
//   const topPlan =
//     plans.length > 0
//       ? plans.reduce((prev, curr) =>
//           curr.percent > prev.percent ? curr : prev
//         )
//       : null;

//   const mostActivePlan =
//     plans.length > 0
//       ? plans.reduce((prev, curr) =>
//           curr.days < prev.days ? curr : prev
//         )
//       : null;

//   const bestMachine =
//     machines.length > 0
//       ? machines.reduce((prev, curr) =>
//           curr.profit > prev.profit ? curr : prev
//         )
//       : null;

//   const avgROI =
//     plans.length > 0
//       ? plans.reduce((sum, p) => sum + p.percent, 0) / plans.length
//       : 0;

//   let marketStatus = "Stable";
//   let marketNote = "Moderate returns";

//   if (avgROI > 500) {
//     marketStatus = "High Growth";
//     marketNote = "High ROI • High risk";
//   } else if (avgROI < 100) {
//     marketStatus = "Low Yield";
//     marketNote = "Low risk • Stable";
//   }

//   // ================= LOADING GUARD =================
//   if (loadingPlans || loadingMachines) {
//     return <div className="dashboard">Loading dashboard...</div>;
//   }

//   return (
//     <div className="dashboard">

//       {/* ================= OVERVIEW ================= */}
//       <div className="overview-card">

//         <div className="overview-item">
//           <p className="label">Total Invested</p>
//           <h2>
//             {currency.symbol}
//             {(8200 * currency.rate).toLocaleString()}
//           </h2>
//         </div>

//         <div className="overview-item">
//           <p className="label">Total Profit</p>
//           <h2 className="positive">
//             +{currency.symbol}
//             {(4250 * currency.rate).toLocaleString()}
//           </h2>
//         </div>

//         <div className="overview-item">
//           <p className="label">Total Withdrawal</p>
//           <h2>
//             {currency.symbol}
//             {(2590 * currency.rate).toLocaleString()}
//           </h2>
//         </div>

//         <div className="overview-item">
//           <p className="label">ROI (Avg)</p>
//           <h2>{avgROI.toFixed(1)}%</h2>
//         </div>

//       </div>

//       {/* ================= INSIGHTS ================= */}
//       <div className="insights">

//         <div className="insight-card">
//           <p className="label">Top Performing Plan</p>
//           <h3>{topPlan?.name || "N/A"}</h3>
//           <span className="positive">
//             {topPlan
//               ? `+${(topPlan.percent + marketShift).toFixed(1)}%`
//               : "--"}
//           </span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Most Active</p>
//           <h3>{mostActivePlan?.name || "N/A"}</h3>
//           <span>{mostActivePlan?.days || "--"} days</span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Best Machine</p>
//           <h3>{bestMachine?.name || "N/A"}</h3>
//           <span className="positive">
//             {bestMachine
//               ? `${currency.symbol}${(
//                   bestMachine.profit *
//                   24 *
//                   currency.rate
//                 ).toFixed(2)} / day`
//               : "--"}
//           </span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Market Status</p>
//           <h3>{marketStatus}</h3>
//           <span>{marketNote}</span>
//         </div>

//       </div>

//       {/* ================= GRID ================= */}
//       <div className="grid">

//         {/* CHART */}
//         <div className="card">
//           <h3>Earnings Overview</h3>

//           <ResponsiveContainer width="100%" height={180}>
//             <LineChart data={chartData}>
//               <XAxis dataKey="day" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="profit"
//                 stroke="#d6a85a"
//                 strokeWidth={3}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* ACTIVITY */}
//         <div className="card">
//           <h3>Live Activity</h3>

//           <div className="activity-ticker">
//             <div className="activity-track">
//               {activities.concat(activities).map((item, index) => (
//                 <div key={index} className="activity-row">
//                   <span className="time">
//                     {new Date(item.id).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>

//                   <span className="name">{item.name}</span>

//                   <span
//                     className={
//                       item.type === "deposit"
//                         ? "amount positive"
//                         : "amount negative"
//                     }
//                   >
//                     {item.type === "deposit" ? "+" : "-"}
//                     {currency.symbol}
//                     {(item.amount * currency.rate).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       {/* 📊 PORTFOLIO STRENGTH (GAUGE STYLE) */}
// <div className="card">
//   <h3>Portfolio Strength</h3>

//   <div className="gauge-grid">

//     {/* ROI GAUGE */}
//     <div className="gauge">
//       <div
//         className="circle"
//         style={{
//           background: `conic-gradient(
//             #d6a85a ${Math.min(avgROI / 5, 100)}%,
//             rgba(255,255,255,0.08) 0%
//           )`,
//         }}
//       >
//         <div className="inner">
//           <h2>{avgROI.toFixed(0)}%</h2>
//         </div>
//       </div>
//       <p>ROI Power</p>
//     </div>

//     {/* MACHINE EFFICIENCY */}
//     <div className="gauge">
//       <div
//         className="circle"
//         style={{
//           background: `conic-gradient(
//             #4caf50 75%,
//             rgba(255,255,255,0.08) 0%
//           )`,
//         }}
//       >
//         <div className="inner">
//           <h2>75%</h2>
//         </div>
//       </div>
//       <p>Efficiency</p>
//     </div>

//     {/* RISK */}
//     <div className="gauge">
//       <div
//         className="circle"
//         style={{
//           background: `conic-gradient(
//             #ff4d4f ${Math.min(avgROI / 3, 100)}%,
//             rgba(255,255,255,0.08) 0%
//           )`,
//         }}
//       >
//         <div className="inner">
//           <h2>
//             {avgROI > 500 ? "H" : avgROI < 100 ? "L" : "M"}
//           </h2>
//         </div>
//       </div>
//       <p>Risk Level</p>
//     </div>

//   </div>
// </div>

//         {/* PORTFOLIO */}
//         <div className="card">
//           <h3>Asset Portfolio</h3>

//           <div className="plan">
//             <p>Investment Plans</p>
//             <span className="positive">{plans.length} Active</span>
//           </div>

//           <div className="plan">
//             <p>Mining Machines</p>
//             <span className="positive">
//               {machines.length}
//             </span>
//           </div>

//           <div className="plan">
//             <p>Best Daily Yield</p>
//             <span className="positive">
//               {bestMachine
//                 ? `${currency.symbol}${(
//                     bestMachine.profit *
//                     24 *
//                     currency.rate
//                   ).toFixed(2)}`
//                 : "--"}
//             </span>
//           </div>

//           <div className="plan">
//             <p>Total ROI Power</p>
//             <span>{marketStatus}</span>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashboardHomepage;


import React, { useEffect, useState } from "react";
import "../styles/home.css";

import { useCurrency } from "../context/CurrencyContext";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHomepage = () => {
  const { currency } = useCurrency();

  const [activities, setActivities] = useState([]);
  const [marketShift, setMarketShift] = useState(0);

  const [machines, setMachines] = useState([]);
  const [plans, setPlans] = useState([]);

  const [portfolio, setPortfolio] = useState(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);

  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const [chartData, setChartData] = useState([
    { day: "Mon", profit: 120 },
    { day: "Tue", profit: 210 },
    { day: "Wed", profit: 180 },
    { day: "Thu", profit: 260 },
    { day: "Fri", profit: 320 },
    { day: "Sat", profit: 280 },
    { day: "Sun", profit: 350 },
  ]);

  // ================= MACHINES =================
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/machines`
        );
        const data = await res.json();

        if (res.ok) setMachines(data.machines);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMachines(false);
      }
    };

    fetchMachines();
  }, []);

  // ================= PLANS =================
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/plans`
        );
        const data = await res.json();

        if (res.ok) setPlans(data.plans);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // ================= PORTFOLIO (NEW BACKEND) =================
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/dashboard/portfolio`
        );
        const data = await res.json();

        if (res.ok) setPortfolio(data.portfolio);
      } catch (err) {
        console.error("Portfolio error:", err);
      } finally {
        setLoadingPortfolio(false);
      }
    };

    fetchPortfolio();
  }, []);

  // ================= LIVE ACTIVITY =================
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ["J***", "A***", "M***", "K***", "S***"];
      const type = Math.random() > 0.5 ? "deposit" : "withdrawal";
      const amount = Math.floor(Math.random() * 2000) + 100;

      setActivities((prev) => [
        {
          id: Date.now(),
          name: names[Math.floor(Math.random() * names.length)],
          type,
          amount,
        },
        ...prev.slice(0, 7),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ================= MARKET SHIFT =================
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketShift(Math.random() * 10 - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= CHART =================
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) =>
        prev.map((item) => ({
          ...item,
          profit: Math.max(
            50,
            item.profit + Math.floor(Math.random() * 40 - 20)
          ),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ================= LOADING =================
  if (loadingPlans || loadingMachines || loadingPortfolio) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">

      {/* ================= OVERVIEW ================= */}
      <div className="overview-card">
        <div className="overview-item">
          <p>Total Invested</p>
          <h2>{currency.symbol}8,200</h2>
        </div>

        <div className="overview-item">
          <p>Total Profit</p>
          <h2 className="positive">{currency.symbol}4,250</h2>
        </div>

        <div className="overview-item">
          <p>Total Withdrawal</p>
          <h2>{currency.symbol}2,590</h2>
        </div>

        <div className="overview-item">
          <p>ROI (Avg)</p>
          <h2>{portfolio?.strength?.roiPower || 0}%</h2>
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}
      <div className="insights">
        <div className="insight-card">
          <p>Market Status</p>
          <h3>{portfolio?.market?.status}</h3>
          <span>{portfolio?.market?.note}</span>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid">

        {/* CHART */}
        <div className="card">
          <h3>Earnings Overview</h3>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#d6a85a"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ================= PORTFOLIO ================= */}
        <div className="card">
          <h3>Asset Portfolio</h3>

          <div className="plan">
            <p>Investment Plans</p>
            <span>{portfolio?.assetSummary?.plansCount}</span>
          </div>

          <div className="plan">
            <p>Mining Machines</p>
            <span>{portfolio?.assetSummary?.machinesCount}</span>
          </div>

          <div className="plan">
            <p>Best Daily Yield</p>
            <span>
              {portfolio?.assetSummary?.bestDailyYield}
            </span>
          </div>

          <div className="plan">
            <p>Top Machine</p>
            <span>{portfolio?.assetSummary?.bestMachineName}</span>
          </div>
        </div>

        {/* ================= STRENGTH ================= */}
        <div className="card">
          <h3>Portfolio Strength</h3>

          <div className="plan">
            <p>ROI Power</p>
            <span>{portfolio?.strength?.roiPower}%</span>
          </div>

          <div className="plan">
            <p>Efficiency</p>
            <span>{portfolio?.strength?.efficiency}%</span>
          </div>

          <div className="plan">
            <p>Risk Level</p>
            <span>{portfolio?.strength?.riskLevel}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHomepage;
