// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/profile.css";

// import { useBalance } from "../context/BalanceContext";
// import { useCurrency } from "../context/CurrencyContext";

// import {
//   FiShare2,
//   FiStar,
//   FiHelpCircle,
//   FiMessageSquare,
//   FiEye,
//   FiEyeOff,
//   FiLogOut,
//   FiCreditCard,
//   FiLock
// } from "react-icons/fi";

// const Profile = () => {
//   const navigate = useNavigate();

//   const { balance, setBalance } = useBalance();
//   const { currency } = useCurrency(); // ✅ GLOBAL CURRENCY

//   const [user, setUser] = useState(null);
//   const [showBalance, setShowBalance] = useState(true);
//   const [showBindWallet, setShowBindWallet] = useState(false);
//   const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

//   const [walletAddress, setWalletAddress] = useState("");
//   const [withdrawalPassword, setWithdrawalPassword] = useState("");

//   const API = process.env.REACT_APP_API_URL;

//   // ================= FETCH USER =================
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${API}/api/user/profile`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setUser(data.user);

//           // sync balance from backend if available
//           if (data.user?.balance !== undefined) {
//             setBalance(data.user.balance);
//           }
//         } else {
//           console.log(data.message);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//   }, [API, setBalance]);

//   // ================= LOADING =================
//   if (!user) {
//     return (
//       <div className="profile-loading">
//         <div className="loading-card">
//           <div className="skeleton avatar"></div>
//           <div className="loading-text">
//             <div className="skeleton line short"></div>
//             <div className="skeleton line long"></div>
//           </div>
//         </div>

//         <div className="skeleton asset-box"></div>
//         <div className="skeleton menu-item"></div>
//         <div className="skeleton menu-item"></div>
//         <div className="skeleton menu-item"></div>
//         <div className="skeleton menu-item"></div>
//         <div className="skeleton menu-item"></div>
//         <div className="skeleton menu-item"></div>
//       </div>
//     );
//   }

//   // ================= BIND WALLET =================
//   const handleBindWallet = async () => {
//     if (!walletAddress) return alert("Please enter a wallet address.");

//     try {
//       const res = await fetch(`${API}/api/user/bind-wallet`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({ walletAddress })
//       });

//       const data = await res.json();

//       if (!res.ok) return alert(data.message);

//       alert("Wallet bound successfully");
//       setShowBindWallet(false);
//       setWalletAddress("");
//     } catch (err) {
//       alert("Server error");
//     }
//   };

//   // ================= WITHDRAWAL PASSWORD =================
//   const handleSetWithdrawalPassword = async () => {
//     if (!withdrawalPassword) return alert("Please enter a password.");

//     try {
//       const res = await fetch(`${API}/api/user/set-withdrawal-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({ password: withdrawalPassword })
//       });

//       const data = await res.json();

//       if (!res.ok) return alert(data.message);

//       alert("Withdrawal password set successfully");
//       setShowWithdrawalPassword(false);
//       setWithdrawalPassword("");
//     } catch (err) {
//       alert("Server error");
//     }
//   };

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="profile-page">

//       {/* PROFILE INFO */}
//       <div className="profile-info">
//         <div className="profile-left">
//           <img
//             src={
//               user.avatar ||
//               `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                 user.email || "User"
//               )}&background=E2E8F0&color=475569&bold=true&size=128`
//             }
//             alt="avatar"
//           />

//           <div>
//             <h3>{user?.email?.split("@")[0] || "User"}</h3>
//             <p>ID: {user._id?.slice(0, 6)}</p>
//           </div>
//         </div>
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="profile-actions">
//         <button className="topup" onClick={() => navigate("/topup")}>
//           Top-up
//         </button>
//         <button className="withdraw" onClick={() => navigate("/withdraw")}>
//           Withdraw
//         </button>
//       </div>

//       {/* ASSET CARD */}
//       <div className="asset-card">
//         <div className="asset-header">
//           <span>Total Assets</span>

//           <div onClick={() => setShowBalance(!showBalance)}>
//             {showBalance ? <FiEye /> : <FiEyeOff />}
//           </div>
//         </div>

//         <div className="asset-balance">
//           {showBalance
//             ? `${currency.symbol}${(balance * currency.rate).toLocaleString(
//                 undefined,
//                 { maximumFractionDigits: 2 }
//               )}`
//             : "****"}
//         </div>

//         <span
//           className="history"
//           onClick={() => navigate("/transaction-history")}
//         >
//           Transaction History ›
//         </span>
//       </div>

//       {/* MENU */}
//       <div className="profile-menu">
//         <div className="menu-item" onClick={() => navigate("/invite")}>
//           <FiShare2 />
//           <span>Invite Friends</span>
//         </div>

//         <div className="menu-item" onClick={() => navigate("/rewards")}>
//           <FiStar />
//           <span>Rewards</span>
//         </div>

//         <div className="menu-item" onClick={() => setShowBindWallet(true)}>
//           <FiCreditCard />
//           <span>Bind Wallet</span>
//         </div>

//         <div className="menu-item" onClick={() => setShowWithdrawalPassword(true)}>
//           <FiLock />
//           <span>Set Withdrawal Password</span>
//         </div>

//         <div className="menu-item" onClick={() => navigate("/faq")}>
//           <FiHelpCircle />
//           <span>FAQ</span>
//         </div>

//         <div className="menu-item" onClick={() => navigate("/about")}>
//           <FiMessageSquare />
//           <span>About</span>
//         </div>
//       </div>

//       {/* LOGOUT */}
//       <div className="logout-section">
//         <button className="logout-btn" onClick={handleLogout}>
//           <FiLogOut className="logout-icon" /> Sign Out
//         </button>
//       </div>

//       {/* WALLET MODAL */}
//       {showBindWallet && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Bind Wallet</h3>
//             <input
//               type="text"
//               placeholder="Enter wallet address"
//               value={walletAddress}
//               onChange={(e) => setWalletAddress(e.target.value)}
//             />
//             <button className="main-btn" onClick={handleBindWallet}>
//               Bind
//             </button>
//             <button
//               className="cancel-btn"
//               onClick={() => setShowBindWallet(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* PASSWORD MODAL */}
//       {showWithdrawalPassword && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Set Withdrawal Password</h3>
//             <input
//               type="password"
//               placeholder="Enter withdrawal password"
//               value={withdrawalPassword}
//               onChange={(e) => setWithdrawalPassword(e.target.value)}
//             />
//             <button className="main-btn" onClick={handleSetWithdrawalPassword}>
//               Set Password
//             </button>
//             <button
//               className="cancel-btn"
//               onClick={() => setShowWithdrawalPassword(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

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

  // ================= ID GENERATOR =================
  const generateId = () => "69" + Math.random().toString(16).slice(2, 6);

  // ================= MASK ID =================
  const maskId = (id) => id.slice(0, 4) + "**";

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
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setPortfolio(data.portfolio);
        }
      } catch (err) {
        console.error(err);
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

    if (saved) setActivities(JSON.parse(saved));

    const interval = setInterval(() => {
      const type = Math.random() > 0.5 ? "deposit" : "withdrawal";

      const newActivity = {
        id: generateId(),
        type,
        amount: Math.floor(Math.random() * 2000) + 100,
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

  // ================= CHART UPDATE =================
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
  const bestMachineName = portfolio?.assetSummary?.bestMachineName ?? "N/A";

  const marketStatus = portfolio?.market?.status ?? "Stable";
  const marketNote = portfolio?.market?.note ?? "";

  const trend =
    efficiency < 50 ? "down" : efficiency > 75 ? "up" : "stable";

  // ================= SKELETON LOADING =================
  if (loadingPortfolio) {
    return (
      <div className="dashboard skeleton-dashboard">

        {/* OVERVIEW */}
        <div className="overview-card">
          {[1, 2, 3, 4].map((i) => (
            <div className="overview-item" key={i}>
              <div className="skeleton line short"></div>
              <div className="skeleton line long"></div>
            </div>
          ))}
        </div>

        {/* INSIGHTS */}
        <div className="insights">
          {[1, 2, 3, 4].map((i) => (
            <div className="insight-card" key={i}>
              <div className="skeleton line short"></div>
              <div className="skeleton line medium"></div>
              <div className="skeleton line long"></div>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid">

          <div className="card">
            <div className="skeleton line medium"></div>
            <div className="skeleton chart"></div>
          </div>

          <div className="card">
            <div className="skeleton line medium"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="skeleton activity-row" key={i}></div>
            ))}
          </div>

          <div className="card">
            <div className="skeleton line medium"></div>
            <div className="gauge-grid">
              {[1, 2, 3].map((i) => (
                <div className="skeleton gauge" key={i}></div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="skeleton ai-header"></div>
            <div className="skeleton ai-body"></div>
          </div>

        </div>
      </div>
    );
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
          <p className="label">Active Plans</p>
          <h3>{plansCount}</h3>
        </div>

        <div className="insight-card">
          <p className="label">Active Machines</p>
          <h3>{machinesCount}</h3>
        </div>

        <div className="insight-card">
          <p className="label">Best Machine</p>
          <h3>{bestMachineName}</h3>
        </div>

        <div className="insight-card">
          <p className="label">Market Status</p>
          <h3>{marketStatus}</h3>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid">

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
            {activities.map((item) => (
              <div key={item.id} className="activity-row">
                <span>{formatTimeAgo(item.createdAt)}</span>
                <span>{maskId(item.id)}</span>
                <span>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Portfolio Strength</h3>

          <div className="gauge-grid">
            <div className="gauge">
              <h2>{roiPower.toFixed(0)}%</h2>
              <p>ROI</p>
            </div>

            <div className="gauge">
              <h2>{efficiency}%</h2>
              <p>Efficiency</p>
            </div>

            <div className="gauge">
              <h2>{riskLevel[0]}</h2>
              <p>Risk</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>AI Insight Engine</h3>

          {aiLoading ? (
            <p>Analyzing...</p>
          ) : (
            <p>System active</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardHomepage;
