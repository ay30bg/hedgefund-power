import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/invite.css";
import { FiArrowLeft, FiUserPlus, FiCopy, FiShare2, FiGift } from "react-icons/fi";

const InviteFriends = () => {
  const navigate = useNavigate();

  const referralCode = "AYO-48291";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="invite-page">

      {/* HEADER */}
      <div className="invite-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <h2>Invite Friends</h2>
        <p>Earn rewards when your friends join</p>
      </div>

      {/* HERO CARD */}
      <div className="invite-hero">
        <FiGift className="invite-hero-icon" />
        <h3>Referral Program</h3>
        <p>
          Invite friends and earn bonuses for every successful signup and deposit.
        </p>

        <div className="referral-box">
          <span>Your Code</span>
          <div className="code-row">
            <strong>{referralCode}</strong>
            <button onClick={copyCode} className="copy-btn">
              <FiCopy />
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
            <p>12 users</p>
          </div>
        </div>

        <div className="invite-item">
          <FiGift />
          <div>
            <h4>Total Earned</h4>
            <p>$48.00</p>
          </div>
        </div>
      </div>

      {/* SHARE BUTTON */}
      <button className="share-btn">
        <FiShare2 />
        Share Invite Link
      </button>

    </div>
  );
};

export default InviteFriends;
