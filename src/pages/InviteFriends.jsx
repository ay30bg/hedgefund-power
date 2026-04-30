import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/invite.css";

import { useCurrency } from "../context/CurrencyContext";

import {
  FiArrowLeft,
  FiUserPlus,
  FiCopy,
  FiShare2,
  FiGift
} from "react-icons/fi";

const InviteFriends = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const referralCode = "AYO-48291";
  const referralLink = `https://yourapp.com/signup?ref=${referralCode}`;

  const [copied, setCopied] = useState(false);

  // ===== FORMATTER =====
  const format = (value) =>
    `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  // ===== COPY =====
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ===== SHARE =====
  const shareInvite = () => {
    const text = `Join this app and earn rewards! Earn 5% of your friends' deposits when they sign up using your link: ${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: "Join & Earn",
        text,
        url: referralLink,
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
  };

  // ===== DEMO DATA =====
  const totalInvites = 12;
  const totalEarned = 48;

  const referrals = [
    { name: "John D.", status: "Completed", reward: 5 },
    { name: "Mary K.", status: "Pending", reward: 5 },
    { name: "Samuel A.", status: "Completed", reward: 5 },
  ];

  return (
    <div className="invite-page">

      {/* HEADER */}
      <div className="invite-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Invite Friends</h2>
      </div>

      {/* HERO */}
      <div className="invite-hero">
        <FiGift className="invite-hero-icon" />

        <h3>Referral Program</h3>

        <p>
         Invite friends and earn bonuses for every successful signup and deposit.
        </p>

        {/* LINK ONLY */}
        <div className="referral-box">
          <span>Your Invite Link</span>
          <div className="code-row">
            <small className="ref-link">{referralLink}</small>
            <button onClick={copyLink} className="copy-btn">
              {copied ? "Copied ✓" : <FiCopy />}
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="invite-card">
        <div className="invite-item">
          <FiUserPlus />
          <div>
            <h4>Total Invites</h4>
            <p>{totalInvites} users</p>
          </div>
        </div>

        <div className="invite-item">
          <FiGift />
          <div>
            <h4>Total Earned</h4>
            <p>{format(totalEarned)}</p>
          </div>
        </div>
      </div>

      {/* REFERRAL LIST */}
      <div className="referral-list">
        <h4>Your Referrals</h4>

        {referrals.map((ref, i) => (
          <div key={i} className="referral-row">
            <span>{ref.name}</span>
            <span className={ref.status === "Completed" ? "success" : "pending"}>
              {ref.status}
            </span>
            <span>{format(ref.reward)}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
    <div className="invite-rules">
  <h4>How it works</h4>

  <ul>
    <li>
      Share your personal invite link with friends
    </li>

    <li>
      Your friend signs up using your link (this links them to your account)
    </li>

    <li>
      When they make a deposit, you earn <strong>5% of the amount</strong>
    </li>

    <li>
      You earn on <strong>every deposit they make</strong>, not just the first one
    </li>

    <li>
      Earnings are added to your account automatically after each successful deposit
    </li>
  </ul>
</div>

      {/* SHARE */}
      <button className="share-btn" onClick={shareInvite}>
        <FiShare2 />
        Share Invite Link
      </button>

    </div>
  );
};

export default InviteFriends;
