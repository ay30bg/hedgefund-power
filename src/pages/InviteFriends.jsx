// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/invite.css";

// import { useCurrency } from "../context/CurrencyContext";

// import {
//   FiArrowLeft,
//   FiUserPlus,
//   FiCopy,
//   FiShare2,
//   FiGift
// } from "react-icons/fi";

// const InviteFriends = () => {
//   const navigate = useNavigate();
//   const { currency } = useCurrency();

//   const referralCode = "AYO-48291";
//   const referralLink = `https://yourapp.com/signup?ref=${referralCode}`;

//   const [copied, setCopied] = useState(false);

//   // ===== FORMATTER =====
//   const format = (value) =>
//     `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
//       maximumFractionDigits: 2,
//     })}`;

//   // ===== COPY =====
//   const copyLink = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ===== SHARE =====
//   const shareInvite = () => {
//     const text = `Join this app and earn rewards! Earn 5% of your friends' deposits when they sign up using your link: ${referralLink}`;

//     if (navigator.share) {
//       navigator.share({
//         title: "Join & Earn",
//         text,
//         url: referralLink,
//       });
//     } else {
//       window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
//     }
//   };

//   // ===== DEMO DATA =====
//   const totalInvites = 12;
//   const totalEarned = 48;

//   const referrals = [
//     { name: "John D.", status: "Completed", reward: 5 },
//     { name: "Mary K.", status: "Pending", reward: 5 },
//     { name: "Samuel A.", status: "Completed", reward: 5 },
//   ];

//   return (
//     <div className="invite-page">

//       {/* HEADER */}
//       <div className="invite-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>
//         <h2>Invite Friends</h2>
//       </div>

//       {/* HERO */}
//       <div className="invite-hero">
//         <FiGift className="invite-hero-icon" />

//         <h3>Referral Program</h3>

//         <p>
//          Invite friends and earn bonuses for every successful signup and deposit.
//         </p>

//         {/* LINK ONLY */}
//         <div className="referral-box">
//           <span>Your Invite Link</span>
//           <div className="code-row">
//             <small className="ref-link">{referralLink}</small>
//             <button onClick={copyLink} className="copy-btn">
//               {copied ? "Copied ✓" : <FiCopy />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="invite-card">
//         <div className="invite-item">
//           <FiUserPlus />
//           <div>
//             <h4>Total Invites</h4>
//             <p>{totalInvites} users</p>
//           </div>
//         </div>

//         <div className="invite-item">
//           <FiGift />
//           <div>
//             <h4>Total Earned</h4>
//             <p>{format(totalEarned)}</p>
//           </div>
//         </div>
//       </div>

//       {/* REFERRAL LIST */}
//       <div className="referral-list">
//         <h4>Your Referrals</h4>

//         {referrals.map((ref, i) => (
//           <div key={i} className="referral-row">
//             <span>{ref.name}</span>
//             <span className={ref.status === "Completed" ? "success" : "pending"}>
//               {ref.status}
//             </span>
//             <span>{format(ref.reward)}</span>
//           </div>
//         ))}
//       </div>

//       {/* HOW IT WORKS */}
//     <div className="invite-rules">
//   <h4>How it works</h4>

//   <ul>
//     <li>
//       Share your personal invite link with friends
//     </li>

//     <li>
//       Your friend signs up using your link (this links them to your account)
//     </li>

//     <li>
//       When they make a deposit, you earn <strong>5% of the amount</strong>
//     </li>

//    <li>
//   You earn <strong>5% commission on their first deposit</strong>
// </li>

//     <li>
//       Earnings are added to your account automatically after each successful deposit
//     </li>
//   </ul>
// </div>

//       {/* SHARE */}
//       <button className="share-btn" onClick={shareInvite}>
//         <FiShare2 />
//         Share Invite Link
//       </button>

//     </div>
//   );
// };

// export default InviteFriends;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/invite.css";

import { useCurrency } from "../context/CurrencyContext";

import {
  FiArrowLeft,
  FiUserPlus,
  FiCopy,
  FiShare2,
  FiGift,
} from "react-icons/fi";

const InviteFriends = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const API_URL = process.env.REACT_APP_API_URL;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const [referralLink, setReferralLink] = useState("");

  const [stats, setStats] = useState({
    totalInvites: 0,
    totalEarned: 0,
  });

  const [referrals, setReferrals] = useState([]);

  // ================= FORMAT =================
  const format = (value) =>
    `${currency.symbol}${(Number(value || 0) * currency.rate).toLocaleString(
      undefined,
      { maximumFractionDigits: 2 }
    )}`;

  // ================= FETCH REFERRALS =================
  const fetchReferrals = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/referrals/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      // referral link
      const link = `${window.location.origin}/signup?ref=${data.referralCode}`;
      setReferralLink(link);

      setStats({
        totalInvites: data.totalInvites,
        totalEarned: data.totalEarned,
      });

      setReferrals(data.referrals || []);
    } catch (err) {
      console.error("Referral fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  // ================= COPY LINK =================
  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ================= SHARE =================
  const shareInvite = () => {
    const text = `Join this app and earn rewards! Use my invite link: ${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: "Invite Friends",
        text,
        url: referralLink,
      });
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text)}`
      );
    }
  };

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
          Invite friends and earn 5% commission on their first deposit.
        </p>

        {/* LINK */}
        <div className="referral-box">
          <span>Your Invite Link</span>

          <div className="code-row">
            <small className="ref-link">
              {loading ? "Loading..." : referralLink}
            </small>

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
            <p>{stats.totalInvites} users</p>
          </div>
        </div>

        <div className="invite-item">
          <FiGift />
          <div>
            <h4>Total Earned</h4>
            <p>{format(stats.totalEarned)}</p>
          </div>
        </div>
      </div>

      {/* REFERRALS LIST */}
      <div className="referral-list">
        <h4>Your Referrals</h4>

        {loading ? (
          <p className="empty-text">Loading...</p>
        ) : referrals.length === 0 ? (
          <p className="empty-text">No referrals yet</p>
        ) : (
          referrals.map((ref, i) => (
            <div key={i} className="referral-row">
              <span>{ref.name}</span>

              <span
                className={
                  ref.status === "Completed"
                    ? "success"
                    : "pending"
                }
              >
                {ref.status}
              </span>

              <span>{format(ref.reward)}</span>
            </div>
          ))
        )}
      </div>

      {/* HOW IT WORKS */}
      <div className="invite-rules">
        <h4>How it works</h4>

        <ul>
          <li>Share your invite link with friends</li>
          <li>They sign up using your link</li>
          <li>You earn 5% on their first deposit</li>
          <li>Earnings are credited automatically</li>
        </ul>
      </div>

      {/* SHARE BUTTON */}
      <button className="share-btn" onClick={shareInvite}>
        <FiShare2 />
        Share Invite Link
      </button>

    </div>
  );
};

export default InviteFriends;
