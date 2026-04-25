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

  const [chartData, setChartData] = useState([
    { day: "Mon", profit: 120 },
    { day: "Tue", profit: 210 },
    { day: "Wed", profit: 180 },
    { day: "Thu", profit: 260 },
    { day: "Fri", profit: 320 },
    { day: "Sat", profit: 280 },
    { day: "Sun", profit: 350 },
  ]);

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

  // ================= CHART (TEMP FAKE — replace later) =================
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

  // ================= PORTFOLIO DATA =================
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

  // ================= LOADING =================
  if (loadingPortfolio) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* ================= OVERVIEW ================= */}
      <div className="overview-card">
        <div className="overview-item">
          <p className="label">Total Invested</p>
          <h2>
            {currency.symbol}
            {(0 * currency.rate).toLocaleString()}
          </h2>
        </div>

        <div className="overview-item">
          <p className="label">Total Profit</p>
          <h2 className="positive">
            +{currency.symbol}
            {(0 * currency.rate).toLocaleString()}
          </h2>
        </div>

        <div className="overview-item">
          <p className="label">Total Withdrawal</p>
          <h2>
            {currency.symbol}
            {(0 * currency.rate).toLocaleString()}
          </h2>
        </div>

        <div className="overview-item">
          <p className="label">ROI (Avg)</p>
          <h2>{roiPower.toFixed(1)}%</h2>
        </div>
      </div>

      {/* ================= INSIGHTS ================= */}
      <div className="insights">
        <div className="insight-card">
          <p className="label">Active Plans</p>
          <h3>{plansCount}</h3>
          <span>Currently running</span>
        </div>

        <div className="insight-card">
          <p className="label">Active Machines</p>
          <h3>{machinesCount}</h3>
          <span>Mining in progress</span>
        </div>

        <div className="insight-card">
          <p className="label">Best Machine</p>
          <h3>{bestMachineName}</h3>
          <span className="positive">
            {currency.symbol}
            {(bestDailyYield * currency.rate).toFixed(2)} / day
          </span>
        </div>

        <div className="insight-card">
          <p className="label">Market Status</p>
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

        {/* PORTFOLIO STRENGTH */}
        <div className="card">
          <h3>Portfolio Strength</h3>

          <div className="gauge-grid">
            <div className="gauge">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#d6a85a ${Math.min(
                    roiPower,
                    100
                  )}%, rgba(255,255,255,0.08) 0%)`,
                }}
              >
                <div className="inner">
                  <h2>{roiPower.toFixed(0)}%</h2>
                </div>
              </div>
              <p>ROI Power</p>
            </div>

            <div className="gauge">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#4caf50 ${efficiency}%, rgba(255,255,255,0.08) 0%)`,
                }}
              >
                <div className="inner">
                  <h2>{efficiency}%</h2>
                </div>
              </div>
              <p>Efficiency</p>
            </div>

            <div className="gauge">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#ff4d4f ${
                    riskLevel === "High"
                      ? 90
                      : riskLevel === "Medium"
                      ? 60
                      : 30
                  }%, rgba(255,255,255,0.08) 0%)`,
                }}
              >
                <div className="inner">
                  <h2>
                    {riskLevel === "High"
                      ? "H"
                      : riskLevel === "Low"
                      ? "L"
                      : "M"}
                  </h2>
                </div>
              </div>
              <p>Risk Level</p>
            </div>
          </div>
        </div>

        {/* ASSET PORTFOLIO */}
        {/* <div className="card">
          <h3>Asset Portfolio</h3>

          <div className="plan">
            <p>Investment Plans</p>
            <span className="positive">{plansCount} Active</span>
          </div>

          <div className="plan">
            <p>Mining Machines</p>
            <span className="positive">{machinesCount}</span>
          </div>

          <div className="plan">
            <p>Best Daily Yield</p>
            <span className="positive">
              {currency.symbol}
              {(bestDailyYield * currency.rate).toFixed(2)}
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
}; */}

export default DashboardHomepage;
