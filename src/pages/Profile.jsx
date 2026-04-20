import React, { useState, useEffect } from "react";
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

  const [user, setUser] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [showBindWallet, setShowBindWallet] = useState(false);
  const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");

  const API = process.env.REACT_APP_API_URL;
  const balance = 12500;

  // ================= FETCH USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [API]);

  // ================= LOADING =================
  if (!user) return <div className="loading">Loading...</div>;

  // ================= BIND WALLET =================
  const handleBindWallet = async () => {
    if (!walletAddress) return alert("Please enter a wallet address.");

    try {
      const res = await fetch(`${API}/api/user/bind-wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ walletAddress })
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("Wallet bound successfully");
      setShowBindWallet(false);
      setWalletAddress("");
    } catch (err) {
      alert("Server error");
    }
  };

  // ================= WITHDRAWAL PASSWORD =================
  const handleSetWithdrawalPassword = async () => {
    if (!withdrawalPassword) return alert("Please enter a password.");

    try {
      const res = await fetch(`${API}/api/user/set-withdrawal-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ password: withdrawalPassword })
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("Withdrawal password set successfully");
      setShowWithdrawalPassword(false);
      setWithdrawalPassword("");
    } catch (err) {
      alert("Server error");
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* PROFILE INFO */}
      <div className="profile-info">
        <div className="profile-left">
          <img
  src={
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      (user._id || "user").slice(0, 10)
    )}&background=0D8ABC&color=fff&size=128`
  }
  alt="avatar"
/>

          <div>
            {/* ✅ FIXED DISPLAY NAME */}
            <h3>{user?.email?.split("@")[0] || "User"}</h3>
            <p>ID: {user._id?.slice(0, 6)}</p>
          </div>
        </div>

        {/* <div className="edit-btn">Edit Information ›</div> */}
      </div>

      {/* ACTION BUTTONS */}
      <div className="profile-actions">
        <button className="topup" onClick={() => navigate("/topup")}>
          Top-up
        </button>
        <button className="withdraw" onClick={() => navigate("/withdraw")}>
          Withdraw
        </button>
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

        <span
          className="history"
          onClick={() => navigate("/transaction-history")}
        >
          Transaction History ›
        </span>
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

        <div className="menu-item" onClick={() => setShowBindWallet(true)}>
          <FiCreditCard />
          <span>Bind Wallet</span>
        </div>

        <div className="menu-item" onClick={() => setShowWithdrawalPassword(true)}>
          <FiLock />
          <span>Set Withdrawal Password</span>
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

      {/* LOGOUT */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="logout-icon" /> Sign Out
        </button>
      </div>

      {/* WALLET MODAL */}
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
            <button className="main-btn" onClick={handleBindWallet}>
              Bind
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowBindWallet(false)}
            >
              Cancel
            </button>
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
            <button className="main-btn" onClick={handleSetWithdrawalPassword}>
              Set Password
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowWithdrawalPassword(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
