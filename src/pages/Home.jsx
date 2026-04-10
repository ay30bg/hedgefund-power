import React, { useEffect, useState } from "react";
import "../styles/home.css";

import { plans } from "./InvestHub";
import { machines } from "./Market";

// ✅ CHART IMPORT
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHomepage = () => {
  const [activities, setActivities] = useState([]);
  const [marketShift, setMarketShift] = useState(0);

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

  // 🔥 Simulate live chart updates
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

  // ===== INSIGHTS LOGIC =====
  const topPlan = plans.reduce((prev, current) =>
    current.percent > prev.percent ? current : prev
  );

  const mostActivePlan = plans.reduce((prev, current) =>
    current.days < prev.days ? current : prev
  );

  const bestMachine = machines.reduce((prev, current) =>
    current.profit > prev.profit ? current : prev
  );

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
          <h2>$8,200</h2>
        </div>
        <div className="overview-item">
          <p className="label">Total Profit</p>
          <h2 className="positive">+$4,250</h2>
        </div>
        <div className="overview-item">
          <p className="label">Total Withdrawal</p>
          <h2>$2,590</h2>
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
            ${(bestMachine.profit * 24).toFixed(2)} / day
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

        {/* 📊 REAL CHART */}
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
                      item.type === "deposit" ? "amount positive" : "amount negative"
                    }
                  >
                    {item.type === "deposit" ? "+" : "-"}${item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📈 PROGRESS CARD */}
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
              ${(bestMachine.profit * 24).toFixed(2)}
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
