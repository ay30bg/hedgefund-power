// import React, { useEffect, useState } from "react";
// import "../styles/home.css";

// import { useCurrency } from "../context/CurrencyContext";

// import { plans } from "./InvestHub";
// import { machines } from "./Market";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const DashboardHomepage = () => {
//   const { currency } = useCurrency(); // ✅ GLOBAL CURRENCY

//   const [activities, setActivities] = useState([]);
//   const [marketShift, setMarketShift] = useState(0);

//   // ===== LIVE ACTIVITY =====
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

//   // ===== MARKET FLUCTUATION =====
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMarketShift(Math.random() * 10 - 5);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // ===== CHART DATA =====
//   const [chartData, setChartData] = useState([
//     { day: "Mon", profit: 120 },
//     { day: "Tue", profit: 210 },
//     { day: "Wed", profit: 180 },
//     { day: "Thu", profit: 260 },
//     { day: "Fri", profit: 320 },
//     { day: "Sat", profit: 280 },
//     { day: "Sun", profit: 350 },
//   ]);

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

//   // ===== INSIGHTS =====
//   const topPlan = plans.reduce((prev, current) =>
//     current.percent > prev.percent ? current : prev
//   );

//   const mostActivePlan = plans.reduce((prev, current) =>
//     current.days < prev.days ? current : prev
//   );

//   const bestMachine = machines.reduce((prev, current) =>
//     current.profit > prev.profit ? current : prev
//   );

//   const avgROI =
//     plans.reduce((sum, p) => sum + p.percent, 0) / plans.length;

//   let marketStatus = "Stable";
//   let marketNote = "Moderate returns";

//   if (avgROI > 500) {
//     marketStatus = "High Growth";
//     marketNote = "High ROI • High risk";
//   } else if (avgROI < 100) {
//     marketStatus = "Low Yield";
//     marketNote = "Low risk • Stable";
//   }

//   return (
//     <div className="dashboard">

//       {/* OVERVIEW */}
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

//       {/* INSIGHTS */}
//       <div className="insights">
//         <div className="insight-card">
//           <p className="label">Top Performing Plan</p>
//           <h3>{topPlan.name}</h3>
//           <span className="positive">
//             +{(topPlan.percent + marketShift).toFixed(1)}%
//           </span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Most Active</p>
//           <h3>{mostActivePlan.name}</h3>
//           <span>{mostActivePlan.days} days</span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Best Machine</p>
//           <h3>{bestMachine.name}</h3>
//           <span className="positive">
//             {currency.symbol}
//             {(bestMachine.profit * 24 * currency.rate).toFixed(2)} / day
//           </span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Market Status</p>
//           <h3>{marketStatus}</h3>
//           <span>{marketNote}</span>
//         </div>
//       </div>

//       {/* GRID */}
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

//         {/* PROGRESS */}
//         <div className="card">
//           <h3>Portfolio Strength</h3>

//           <div className="progress">
//             <p>ROI Power</p>
//             <div className="bar">
//               <div style={{ width: `${Math.min(avgROI / 10, 100)}%` }} />
//             </div>
//           </div>

//           <div className="progress">
//             <p>Machine Efficiency</p>
//             <div className="bar">
//               <div style={{ width: "75%" }} />
//             </div>
//           </div>

//           <div className="progress">
//             <p>Risk Level</p>
//             <div className="bar danger">
//               <div style={{ width: `${Math.min(avgROI / 8, 100)}%` }} />
//             </div>
//           </div>
//         </div>

//         {/* PORTFOLIO */}
//         <div className="card">
//           <h3>Asset Portfolio</h3>

//           <div className="plan">
//             <p>Investment Plans</p>
//             <span className="positive">{plans.length} Active</span>
//           </div>

//           <div className="plan">
//             <p>Mining Machines</p>
//             <span className="positive">{machines.length} Owned</span>
//           </div>

//           <div className="plan">
//             <p>Best Daily Yield</p>
//             <span className="positive">
//               {currency.symbol}
//               {(bestMachine.profit * 24 * currency.rate).toFixed(2)}
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
import { plans } from "./InvestHub";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHomepage = () => {
  const { currency } = useCurrency();

  const [machines, setMachines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [marketShift, setMarketShift] = useState(0);

  // ===== FETCH MACHINES FROM BACKEND =====
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/machines`
        );

        const data = await res.json();

        setMachines(data.machines || []);
      } catch (err) {
        console.error("Failed to fetch machines:", err);
      }
    };

    fetchMachines();
  }, []);

  // ===== LIVE ACTIVITY =====
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

  // ===== MARKET FLUCTUATION =====
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketShift(Math.random() * 10 - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ===== CHART DATA =====
  const [chartData, setChartData] = useState([
    { day: "Mon", profit: 120 },
    { day: "Tue", profit: 210 },
    { day: "Wed", profit: 180 },
    { day: "Thu", profit: 260 },
    { day: "Fri", profit: 320 },
    { day: "Sat", profit: 280 },
    { day: "Sun", profit: 350 },
  ]);

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

  // ===== INSIGHTS =====
  const topPlan = plans.reduce((prev, current) =>
    current.percent > prev.percent ? current : prev
  );

  const mostActivePlan = plans.reduce((prev, current) =>
    current.days < prev.days ? current : prev
  );

  // ✅ SAFE MACHINE CALCULATION
  const bestMachine = machines.length
    ? machines.reduce((prev, current) =>
        current.profit > prev.profit ? current : prev
      )
    : {
        name: "No machines yet",
        profit: 0,
      };

  const avgROI =
    plans.reduce((sum, p) => sum + p.percent, 0) / plans.length;

  let marketStatus = "Stable";
  let marketNote = "Moderate returns";

  if (avgROI > 500) {
    marketStatus = "High Growth";
    marketNote = "High ROI • High risk";
  } else if (avgROI < 100) {
    marketStatus = "Low Yield";
    marketNote = "Low risk • Stable";
  }

  return (
    <div className="dashboard">

      {/* OVERVIEW */}
      <div className="overview-card">
        <div className="overview-item">
          <p className="label">Total Invested</p>
          <h2>
            {currency.symbol}
            {(8200 * currency.rate).toLocaleString()}
          </h2>
        </div>

        <div className="overview-item">
          <p className="label">Total Profit</p>
          <h2 className="positive">
            +{currency.symbol}
            {(4250 * currency.rate).toLocaleString()}
          </h2>
        </div>

        <div className="overview-item">
          <p className="label">Total Withdrawal</p>
          <h2>
            {currency.symbol}
            {(2590 * currency.rate).toLocaleString()}
          </h2>
        </div>

        <div className="overview-item">
          <p className="label">ROI (Avg)</p>
          <h2>{avgROI.toFixed(1)}%</h2>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="insights">

        <div className="insight-card">
          <p className="label">Top Performing Plan</p>
          <h3>{topPlan.name}</h3>
          <span className="positive">
            +{(topPlan.percent + marketShift).toFixed(1)}%
          </span>
        </div>

        <div className="insight-card">
          <p className="label">Most Active</p>
          <h3>{mostActivePlan.name}</h3>
          <span>{mostActivePlan.days} days</span>
        </div>

        <div className="insight-card">
          <p className="label">Best Machine</p>
          <h3>{bestMachine.name}</h3>
          <span className="positive">
            {currency.symbol}
            {(bestMachine.profit * 24 * currency.rate).toFixed(2)} / day
          </span>
        </div>

        <div className="insight-card">
          <p className="label">Market Status</p>
          <h3>{marketStatus}</h3>
          <span>{marketNote}</span>
        </div>

      </div>

      {/* GRID */}
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

        {/* ACTIVITY */}
        <div className="card">
          <h3>Live Activity</h3>

          <div className="activity-ticker">
            <div className="activity-track">
              {activities.concat(activities).map((item, index) => (
                <div key={index} className="activity-row">
                  <span className="time">
                    {new Date(item.id).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <span className="name">{item.name}</span>

                  <span
                    className={
                      item.type === "deposit"
                        ? "amount positive"
                        : "amount negative"
                    }
                  >
                    {item.type === "deposit" ? "+" : "-"}
                    {currency.symbol}
                    {(item.amount * currency.rate).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="card">
          <h3>Portfolio Strength</h3>

          <div className="progress">
            <p>ROI Power</p>
            <div className="bar">
              <div style={{ width: `${Math.min(avgROI / 10, 100)}%` }} />
            </div>
          </div>

          <div className="progress">
            <p>Machine Efficiency</p>
            <div className="bar">
              <div style={{ width: "75%" }} />
            </div>
          </div>

          <div className="progress">
            <p>Risk Level</p>
            <div className="bar danger">
              <div style={{ width: `${Math.min(avgROI / 8, 100)}%` }} />
            </div>
          </div>

        </div>

        {/* PORTFOLIO */}
        <div className="card">
          <h3>Asset Portfolio</h3>

          <div className="plan">
            <p>Investment Plans</p>
            <span className="positive">{plans.length} Active</span>
          </div>

          <div className="plan">
            <p>Mining Machines</p>
            <span className="positive">{machines.length} Owned</span>
          </div>

          <div className="plan">
            <p>Best Daily Yield</p>
            <span className="positive">
              {currency.symbol}
              {(bestMachine.profit * 24 * currency.rate).toFixed(2)}
            </span>
          </div>

          <div className="plan">
            <p>Total ROI Power</p>
            <span>{marketStatus}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardHomepage;
