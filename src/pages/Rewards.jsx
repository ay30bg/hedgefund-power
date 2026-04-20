import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/rewards.css";
import { FiGift, FiStar, FiUsers, FiArrowLeft } from "react-icons/fi";

const Rewards = () => {
  const navigate = useNavigate();

  const rewards = [
    {
      title: "Daily Check-in Bonus",
      desc: "Log in every day to earn rewards",
      value: "$2 - $10",
      icon: <FiGift />,
    },
    {
      title: "Referral Bonus",
      desc: "Invite friends and earn instantly",
      value: "$5 per user",
      icon: <FiUsers />,
    },
    {
      title: "Loyalty Tier Rewards",
      desc: "Higher tiers unlock better benefits",
      value: "Up to $100/month",
      icon: <FiStar />,
    },
  ];

  return (
    <div className="about-page rewards-page">

      {/* HEADER (same style as About.jsx) */}
      <div className="about-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Rewards</h2>
      </div>

      {/* HERO CARD */}
      <div className="reward-hero">
        <h3>Your Rewards Hub</h3>
        <p>Earn bonuses by staying active and inviting friends</p>
        <div className="reward-balance">
          Current Points: <span>1,250</span>
        </div>
      </div>

      {/* REWARD LIST */}
      <div className="reward-list">
        {rewards.map((item, i) => (
          <div key={i} className="reward-card">
            <div className="reward-icon">{item.icon}</div>
            <div className="reward-info">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
            <div className="reward-value">{item.value}</div>
          </div>
        ))}
      </div>

      {/* CLAIM BUTTON */}
      <button className="claim-btn">Claim Available Rewards</button>
    </div>
  );
};

export default Rewards;


