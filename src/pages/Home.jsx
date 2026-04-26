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
//   const [portfolio, setPortfolio] = useState(null);
//   const [loadingPortfolio, setLoadingPortfolio] = useState(true);

//   const [aiLoading, setAiLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState("");

//   const [chartData, setChartData] = useState([
//     { day: "Mon", profit: 120 },
//     { day: "Tue", profit: 210 },
//     { day: "Wed", profit: 180 },
//     { day: "Thu", profit: 260 },
//     { day: "Fri", profit: 320 },
//     { day: "Sat", profit: 280 },
//     { day: "Sun", profit: 350 },
//   ]);

//   // ================= FETCH PORTFOLIO =================
//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}/api/dashboard/portfolio`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (res.ok) {
//           setPortfolio(data.portfolio);
//         } else {
//           console.error("Portfolio error:", data);
//         }
//       } catch (err) {
//         console.error("Error fetching portfolio:", err);
//       } finally {
//         setLoadingPortfolio(false);
//       }
//     };

//     fetchPortfolio();
//   }, []);

//   // ================= AI THINKING FLOW =================
//   useEffect(() => {
//     if (!loadingPortfolio) {
//       setAiLoading(true);

//       const delay = Math.random() * 1200 + 1800;

//       const timer = setTimeout(() => {
//         setAiLoading(false);
//       }, delay);

//       return () => clearTimeout(timer);
//     }
//   }, [loadingPortfolio, portfolio]);

//   // ================= TIME CONTEXT =================
//   useEffect(() => {
//     if (!aiLoading) {
//       const now = new Date();
//       setLastUpdated(
//         now.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }
//   }, [aiLoading]);

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

//   // ================= PORTFOLIO DATA =================
//   const roiPower = portfolio?.strength?.roiPower ?? 0;
//   const efficiency = portfolio?.strength?.efficiency ?? 0;
//   const riskLevel = portfolio?.strength?.riskLevel ?? "Low";

//   const plansCount = portfolio?.assetSummary?.plansCount ?? 0;
//   const machinesCount = portfolio?.assetSummary?.machinesCount ?? 0;

//   const bestDailyYield = portfolio?.assetSummary?.bestDailyYield ?? 0;
//   const bestMachineName =
//     portfolio?.assetSummary?.bestMachineName ?? "N/A";

//   const marketStatus = portfolio?.market?.status ?? "Stable";
//   const marketNote = portfolio?.market?.note ?? "";

//   // ================= TREND =================
//   const trend =
//     efficiency < 50 ? "down" : efficiency > 75 ? "up" : "stable";

//   // ================= LOADING =================
//   if (loadingPortfolio) {
//     return <div className="dashboard">Loading dashboard...</div>;
//   }

//   return (
//     <div className="dashboard">
//       {/* ================= OVERVIEW ================= */}
//       <div className="overview-card">
//         <div className="overview-item">
//           <p className="label">Total Invested</p>
//           <h2>{currency.symbol}{(0 * currency.rate).toLocaleString()}</h2>
//         </div>

//         <div className="overview-item">
//           <p className="label">Total Profit</p>
//           <h2 className="positive">
//             +{currency.symbol}{(0 * currency.rate).toLocaleString()}
//           </h2>
//         </div>

//         <div className="overview-item">
//           <p className="label">Total Withdrawal</p>
//           <h2>{currency.symbol}{(0 * currency.rate).toLocaleString()}</h2>
//         </div>

//         <div className="overview-item">
//           <p className="label">ROI (Avg)</p>
//           <h2>{roiPower.toFixed(1)}%</h2>
//         </div>
//       </div>

//       {/* ================= INSIGHTS ================= */}
//       <div className="insights">
//         <div className="insight-card">
//           <p className="label">Active Plans</p>
//           <h3>{plansCount}</h3>
//           <span>Currently running</span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Active Machines</p>
//           <h3>{machinesCount}</h3>
//           <span>Mining in progress</span>
//         </div>

//         <div className="insight-card">
//           <p className="label">Best Machine</p>
//           <h3>{bestMachineName}</h3>
//           <span className="positive">
//             {currency.symbol}
//             {(bestDailyYield * currency.rate).toFixed(2)} / day
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

//         {/* PORTFOLIO STRENGTH */}
//          <div className="card">
//           <h3>Portfolio Strength</h3>

//           <div className="gauge-grid">
//              <div className="gauge">
//               <div
//                 className="circle"
//                 style={{
//                   background: `conic-gradient(#d6a85a ${Math.min(
//                     roiPower,
//                     100
//                   )}%, rgba(255,255,255,0.08) 0%)`,
//                 }}
//               >
//                 <div className="inner">
//                   <h2>{roiPower.toFixed(0)}%</h2>
//                 </div>
//               </div>
//               <p>ROI Power</p>
//             </div>

//             <div className="gauge">
//               <div
//                 className="circle"
//                 style={{
//                   background: `conic-gradient(#4caf50 ${efficiency}%, rgba(255,255,255,0.08) 0%)`,
//                 }}
//               >
//                 <div className="inner">
//                   <h2>{efficiency}%</h2>
//                 </div>
//               </div>
//               <p>Efficiency</p>
//             </div>

//             <div className="gauge">
//               <div
//                 className="circle"
//                 style={{
//                   background: `conic-gradient(#ff4d4f ${
//                     riskLevel === "High"
//                       ? 90
//                       : riskLevel === "Medium"
//                       ? 60
//                       : 30
//                   }%, rgba(255,255,255,0.08) 0%)`,
//                 }}
//               >
//                 <div className="inner">
//                   <h2>
//                     {riskLevel === "High"
//                       ? "H"
//                       : riskLevel === "Low"
//                       ? "L"
//                       : "M"}
//                   </h2>
//                 </div>
//               </div>
//               <p>Risk Level</p>
//             </div>
//           </div>
//         </div>

//         {/* SMART AI */}
//         <div className="card smart-card-ai">
//           <div className="ai-glow"></div>

//           <div className="smart-header-ai">
//             <div className="ai-title">
//               <span className="ai-dot"></span>
//               AI Insight Engine
//             </div>
//             <div className="ai-status">● Live</div>
//           </div>

//           <div className="smart-body-ai">
//             <div className="ai-avatar">
//               <div className="pulse-ring"></div>
//               🤖
//             </div>

//             <div className="ai-content">
//               {aiLoading ? (
//                 <div className="ai-thinking">
//                   <span></span><span></span><span></span>
//                   <p>Scanning portfolio signals...</p>
//                 </div>
//               ) : (
//                 <>
//                   <p className="ai-system-text">
//                     {trend === "down"
//                       ? "Signal detected: performance decline."
//                       : trend === "up"
//                       ? "Optimization signal: growth trend active."
//                       : "System stable: monitoring portfolio."}
//                   </p>

//                   <p className="ai-text fade-in">
//                     {efficiency < 50
//                       ? <>Efficiency at <b>{efficiency}%</b>. Below optimal.</>
//                       : riskLevel === "High"
//                       ? <>High risk exposure detected.</>
//                       : plansCount === 0
//                       ? <>No active plans found.</>
//                       : machinesCount === 0
//                       ? <>No machine assets detected.</>
//                       : <>Portfolio operating optimally.</>}
//                   </p>

//                   <div className={`ai-trend ${trend}`}>
//                     {trend === "down" && "↓ Performance dropping"}
//                     {trend === "up" && "↑ Performance improving"}
//                     {trend === "stable" && "→ Stable performance"}
//                   </div>

//                   <p className="ai-sub">
//                     {efficiency < 50
//                       ? "Reallocation recommended."
//                       : riskLevel === "High"
//                       ? "Reduce exposure."
//                       : plansCount === 0
//                       ? "Start investing."
//                       : machinesCount === 0
//                       ? "Deploy machines."
//                       : "Maintain strategy."}
//                   </p>

//                   <div className={`ai-tag ${
//                     efficiency < 50 || riskLevel === "High"
//                       ? "danger"
//                       : "safe"
//                   }`}>
//                     {efficiency < 50
//                       ? "Optimization Needed"
//                       : riskLevel === "High"
//                       ? "Risk Alert"
//                       : "System Stable"}
//                   </div>

//                   <p className="ai-time">
//                     Updated at {lastUpdated} • Live analysis
//                   </p>
//                 </>
//               )}
//             </div>
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
  const [portfolio, setPortfolio] = useState(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);

  const [aiLoading, setAiLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const [chartData, setChartData] = useState([
    { day: "Mon", profit: 120 },
    { day: "Tue", profit: 210 },
    { day: "Wed", profit: 180 },
    { day: "Thu", profit: 260 },
    { day: "Fri", profit: 320 },
    { day: "Sat", profit: 280 },
    { day: "Sun", profit: 350 },
  ]);

  // ================= ID GENERATOR (69e811 style) =================
  const generateId = () => {
    return "69" + Math.random().toString(16).slice(2, 8);
  };

  // ================= TIME FORMAT =================
  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);

    if (diff < 3) return "just now";
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    return `${Math.floor(diff / 3600)}h`;
  };

  // ================= FETCH PORTFOLIO =================
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/dashboard/portfolio`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setPortfolio(data.portfolio);
        } else {
          console.error("Portfolio error:", data);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoadingPortfolio(false);
      }
    };

    fetchPortfolio();
  }, []);

  // ================= AI LOADING =================
  useEffect(() => {
    if (!loadingPortfolio) {
      setAiLoading(true);

      const timer = setTimeout(() => {
        setAiLoading(false);
      }, Math.random() * 1200 + 1800);

      return () => clearTimeout(timer);
    }
  }, [loadingPortfolio, portfolio]);

  // ================= LAST UPDATED =================
  useEffect(() => {
    if (!aiLoading) {
      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }, [aiLoading]);

  // ================= LIVE ACTIVITY =================
  useEffect(() => {
    const saved = localStorage.getItem("activities");

    if (saved) {
      setActivities(JSON.parse(saved));
    }

    const interval = setInterval(() => {
      const type = Math.random() > 0.5 ? "deposit" : "withdrawal";
      const amount = Math.floor(Math.random() * 2000) + 100;

      const newActivity = {
        id: generateId(),
        type,
        amount,
        createdAt: Date.now(),
      };

      setActivities((prev) => {
        const updated = [newActivity, ...prev].slice(0, 15);
        localStorage.setItem("activities", JSON.stringify(updated));
        return updated;
      });
    }, 3000);

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

  // ================= PORTFOLIO VALUES =================
  const roiPower = portfolio?.strength?.roiPower ?? 0;
  const efficiency = portfolio?.strength?.efficiency ?? 0;
  const riskLevel = portfolio?.strength?.riskLevel ?? "Low";

  const plansCount = portfolio?.assetSummary?.plansCount ?? 0;
  const machinesCount = portfolio?.assetSummary?.machinesCount ?? 0;

  const bestDailyYield = portfolio?.assetSummary?.bestDailyYield ?? 0;
  const bestMachineName =
    portfolio?.assetSummary?.bestMachineName ?? "N/A";

  const marketStatus = portfolio?.market?.status ?? "Stable";
  const marketNote = portfolio?.market?.note ?? "";

  const trend =
    efficiency < 50 ? "down" : efficiency > 75 ? "up" : "stable";

  // ================= LOADING =================
  if (loadingPortfolio) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">

      {/* ================= OVERVIEW ================= */}
      <div className="overview-card">
        <div className="overview-item">
          <p>Total Invested</p>
          <h2>{currency.symbol}{0}</h2>
        </div>

        <div className="overview-item">
          <p>Total Profit</p>
          <h2 className="positive">{currency.symbol}{0}</h2>
        </div>

        <div className="overview-item">
          <p>Total Withdrawal</p>
          <h2>{currency.symbol}{0}</h2>
        </div>

        <div className="overview-item">
          <p>ROI (Avg)</p>
          <h2>{roiPower.toFixed(1)}%</h2>
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}
      <div className="insights">
        <div className="insight-card">
          <p>Active Plans</p>
          <h3>{plansCount}</h3>
        </div>

        <div className="insight-card">
          <p>Active Machines</p>
          <h3>{machinesCount}</h3>
        </div>

        <div className="insight-card">
          <p>Best Machine</p>
          <h3>{bestMachineName}</h3>
          <span>
            {currency.symbol}
            {(bestDailyYield * currency.rate).toFixed(2)} / day
          </span>
        </div>

        <div className="insight-card">
          <p>Market Status</p>
          <h3>{marketStatus}</h3>
          <span>{marketNote}</span>
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

        {/* LIVE ACTIVITY */}
        <div className="card">
          <h3>Live Activity</h3>

          <div className="activity-ticker">
            <div className="activity-track">
              {activities.concat(activities).map((item, index) => (
                <div key={index} className="activity-row">

                  <span className="time">
                    {formatTimeAgo(item.createdAt)}
                  </span>

                  <span className="name">{item.id}</span>

                  <span
                    className={
                      item.type === "deposit"
                        ? "amount positive"
                        : "amount negative"
                    }
                  >
                    {item.type === "deposit" ? "+" : "-"}
                    {currency.symbol}
                    {item.amount}
                  </span>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PORTFOLIO STRENGTH */}
        <div className="card">
          <h3>Portfolio Strength</h3>

          <p>ROI Power: {roiPower.toFixed(0)}%</p>
          <p>Efficiency: {efficiency}%</p>
          <p>Risk Level: {riskLevel}</p>
        </div>

        {/* AI ENGINE */}
        <div className="card smart-card-ai">
          <h3>AI Insight Engine</h3>

          {aiLoading ? (
            <p>Scanning portfolio signals...</p>
          ) : (
            <>
              <p>{trend} trend detected</p>
              <p>Updated at {lastUpdated}</p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardHomepage;
