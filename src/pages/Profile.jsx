import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

import { useBalance } from "../context/BalanceContext";
import { useCurrency } from "../context/CurrencyContext";

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

  const { balance, setBalance } = useBalance();
  const { currency } = useCurrency();

  const [user, setUser] = useState(null);
  const [showBalance, setShowBalance] = useState(true);

  const [showBindWallet, setShowBindWallet] = useState(false);
  const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("USDT-TRC20");

  // ✅ SEPARATED STATES (FIX)
  const [walletPassword, setWalletPassword] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");

  const [showWalletPwd, setShowWalletPwd] = useState(false);
  const [showWithdrawalPwd, setShowWithdrawalPwd] = useState(false);

  const API = process.env.REACT_APP_API_URL;

  const isWalletBound = !!user?.walletAddress;

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

          if (data.user?.balance !== undefined) {
            setBalance(data.user.balance);
          }
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [API, setBalance]);

  // ================= BIND / UPDATE WALLET =================
  const handleBindWallet = async () => {
    if (!walletAddress) return alert("Please enter a wallet address.");

    if (isWalletBound && !walletPassword) {
      return alert("Enter withdrawal password to change wallet.");
    }

    try {
      const res = await fetch(`${API}/api/user/bind-wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          walletAddress,
          network,
          password: isWalletBound ? walletPassword : undefined
        })
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert(data.message);

      // ✅ UPDATE STATE INSTEAD OF RELOAD
      setUser((prev) => ({
        ...prev,
        walletAddress,
        network
      }));

      setShowBindWallet(false);
      setWalletAddress("");
      setNetwork("USDT-TRC20");
      setWalletPassword("");
    } catch (err) {
      alert("Server error");
    }
  };

  // ================= SET WITHDRAWAL PASSWORD =================
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
    navigate("/");
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="loading-card">
          <div className="skeleton avatar"></div>
          <div className="loading-text">
            <div className="skeleton line short"></div>
            <div className="skeleton line long"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* PROFILE INFO (FIXED STRUCTURE) */}
      <div className="profile-info">
        <div className="profile-left">
          <img
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.email || "User"
              )}&background=E2E8F0&color=475569&bold=true&size=128`
            }
            alt="avatar"
          />

          <div>
            <h3>{user?.email?.split("@")[0] || "User"}</h3>
            <p>ID: {user._id?.slice(0, 6)}</p>
          </div>
        </div>
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
          <span>Total Assets</span>

          <div onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <FiEye /> : <FiEyeOff />}
          </div>
        </div>

        <div className="asset-balance">
          {showBalance
            ? `${currency.symbol}${(balance * currency.rate).toLocaleString()}`
            : "****"}
        </div>
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
          <span>{isWalletBound ? "Change Wallet" : "Bind Wallet"}</span>
        </div>

        <div
          className="menu-item"
          onClick={() => setShowWithdrawalPassword(true)}
        >
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
          <FiLogOut /> Sign Out
        </button>
      </div>

      {/* WALLET MODAL */}
      {showBindWallet && (
        <div className="modal">
          <div className="modal-content">

            <h3>{isWalletBound ? "Change Wallet" : "Bind Wallet"}</h3>

            <input
              type="text"
              placeholder="Wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />

            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option value="USDT-TRC20">USDT-TRC20</option>
              <option value="USDT-TON">USDT-TON</option>
              <option value="USDT-BEP20">USDT-BEP20</option>
            </select>

            {/* PASSWORD ONLY WHEN UPDATING */}
            {isWalletBound && (
              <div style={{ position: "relative" }}>
                <input
                  type={showWalletPwd ? "text" : "password"}
                  placeholder="Withdrawal password"
                  value={walletPassword}
                  onChange={(e) => setWalletPassword(e.target.value)}
                />

                <div onClick={() => setShowWalletPwd(!showWalletPwd)}>
                  {showWalletPwd ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            )}

            <button onClick={handleBindWallet}>
              {isWalletBound ? "Update Wallet" : "Bind Wallet"}
            </button>

            <button onClick={() => setShowBindWallet(false)}>
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* WITHDRAW PASSWORD MODAL */}
      {showWithdrawalPassword && (
        <div className="modal">
          <div className="modal-content">

            <h3>Set Withdrawal Password</h3>

            <input
              type={showWithdrawalPwd ? "text" : "password"}
              value={withdrawalPassword}
              onChange={(e) => setWithdrawalPassword(e.target.value)}
            />

            <div onClick={() => setShowWithdrawalPwd(!showWithdrawalPwd)}>
              {showWithdrawalPwd ? <FiEyeOff /> : <FiEye />}
            </div>

            <button onClick={handleSetWithdrawalPassword}>
              Save Password
            </button>

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
