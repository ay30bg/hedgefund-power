import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import {
  FiShare2,
  FiStar,
  FiHelpCircle,
  FiMessageSquare,
  FiEye,
  FiEyeOff,
  FiLogOut,
  FiCreditCard,
  FiLock
} from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Kachi",
    id: "200056",
    avatar: "https://i.pravatar.cc/100"
  };

  const [showBalance, setShowBalance] = useState(true);
  const [showBindWallet, setShowBindWallet] = useState(false);
  const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");

  const balance = 12500;

  const handleBindWallet = () => {
    if (!walletAddress) return alert("Please enter a wallet address.");
    alert(`Wallet bound: ${walletAddress}`);
    setShowBindWallet(false);
  };

  const handleSetWithdrawalPassword = () => {
    if (!withdrawalPassword) return alert("Please enter a password.");
    alert("Withdrawal password set successfully.");
    setShowWithdrawalPassword(false);
  };

  const handleLogout = () => {
    // clear stored auth data if any
    localStorage.clear();
    sessionStorage.clear();

    // redirect to login page
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* PROFILE INFO */}
      <div className="profile-info">
        <div className="profile-left">
          <img src={user.avatar} alt="avatar" />
          <div>
            <h3>{user.name}</h3>
            <p>ID: {user.id}</p>
          </div>
        </div>
        <div className="edit-btn">Edit Information ›</div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="profile-actions">
        <button className="topup" onClick={() => navigate("/topup")}>Top-up</button>
        <button className="withdraw" onClick={() => navigate("/withdraw")}>Withdraw</button>
      </div>

      {/* ASSET CARD */}
      <div className="asset-card">
        <div className="asset-header">
          <span>Total Assets ($)</span>
          <div
            className="balance-toggle"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <FiEye /> : <FiEyeOff />}
          </div>
        </div>

        <div className="asset-balance">
          {showBalance ? `$${balance.toLocaleString()}` : "****"}
        </div>

        <span className="history">Transaction History ›</span>
      </div>

      {/* MENU */}
      <div className="profile-menu">

        <div className="menu-item" onClick={() => navigate("/invite")}>
          <FiShare2 />
          <span>Invite Friends</span>
        </div>

        <div className="menu-item" onClick={() => navigate("/rewards")}>
          <FiStar />
          <span>Rewards</span>
        </div>

        <div className="menu-item">
          <FiCreditCard />
          <span onClick={() => setShowBindWallet(true)}>Bind Wallet</span>
        </div>

        <div className="menu-item">
          <FiLock />
          <span onClick={() => setShowWithdrawalPassword(true)}>
            Set Withdrawal Password
          </span>
        </div>

        <div className="menu-item" onClick={() => navigate("/faq")}>
          <FiHelpCircle />
          <span>FAQ</span>
        </div>

        <div className="menu-item" onClick={() => navigate("/about")}>
  <FiMessageSquare />
  <span>About</span>
</div>

      </div>

      {/* SIGN OUT */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="logout-icon"/> Sign Out
        </button>
      </div>

      {/* BIND WALLET MODAL */}
      {showBindWallet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bind Wallet</h3>
            <input
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button onClick={handleBindWallet}>Bind</button>
            <button onClick={() => setShowBindWallet(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* WITHDRAWAL PASSWORD MODAL */}
      {showWithdrawalPassword && (
        <div className="modal">
          <div className="modal-content">
            <h3>Set Withdrawal Password</h3>
            <input
              type="password"
              placeholder="Enter withdrawal password"
              value={withdrawalPassword}
              onChange={(e) => setWithdrawalPassword(e.target.value)}
            />
            <button onClick={handleSetWithdrawalPassword}>Set Password</button>
            <button onClick={() => setShowWithdrawalPassword(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
