import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/rewards.css";
import { FiGift, FiStar, FiUsers, FiArrowLeft } from "react-icons/fi";
import { useCurrency } from "../context/CurrencyContext";

const Rewards = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  // =========================
  // FIXED REWARD RULES
  // =========================
  const rewards = [
    {
      title: "Daily Check-in Bonus",
      desc: "Log in every day to earn rewards",
      amount: 0.2, // ✅ FIXED $0.20
      icon: <FiGift />,
      type: "fixed",
    },
    {
      title: "Referral Bonus",
      desc: "Earn 5% of every deposit made by your referrals",
      percent: "5%",
      icon: <FiUsers />,
      type: "percentage",
    },
    {
      title: "Loyalty Tier Rewards",
      desc: "Higher tiers unlock better benefits",
      amount: 100,
      suffix: "/month",
      icon: <FiStar />,
      type: "fixed",
    },
  ];

  // =========================
  // FORMAT CURRENCY
  // =========================
  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="about-page rewards-page">

      {/* HEADER */}
      <div className="about-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Rewards</h2>
      </div>

      {/* HERO */}
      <div className="reward-hero">
        <h3>Your Rewards Hub</h3>
        <p>Earn bonuses by staying active and inviting friends</p>

        <div className="reward-balance">
          Current Points: <span>1,250</span>
        </div>
      </div>

      {/* LIST */}
      <div className="reward-list">
        {rewards.map((item, i) => (
          <div key={i} className="reward-card">
            <div className="reward-icon">{item.icon}</div>

            <div className="reward-info">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>

            <div className="reward-value">

              {/* ================= DAILY FIXED ================= */}
              {item.type === "fixed" && (
                <>
                  {format(item.amount)} {item.suffix || ""}
                </>
              )}

              {/* ================= REFERRAL ================= */}
              {item.type === "percentage" && (
                <>
                  {item.percent} per deposit
                </>
              )}

            </div>
          </div>
        ))}
      </div>

      <button className="claim-btn">
        Claim Available Rewards
      </button>

    </div>
  );
};

export default Rewards;
