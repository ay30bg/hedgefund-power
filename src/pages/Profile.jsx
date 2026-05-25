import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

import { useBalance } from "../context/BalanceContext";
import { useCurrency } from "../context/CurrencyContext";
import { useSupport } from "../context/SupportContext";
import { useAuth } from "../context/AuthContext";

import {
    FiShare2,
    FiStar,
    FiHelpCircle,
    FiMessageSquare,
    FiEye,
    FiEyeOff,
    FiLogOut,
    FiCreditCard,
    FiLock,
    FiHeadphones
} from "react-icons/fi";

const Profile = () => {
    const navigate = useNavigate();

    const { balance, setBalance } = useBalance();
    const { currency } = useCurrency();

    const {
        unreadSupportCount,
        clearSupportBadge
    } = useSupport();

    // ================= AUTH CONTEXT =================
    const {
        user,
        token,
        logout,
        updateUser,
        loading: authLoading
    } = useAuth();

    const [showBalance, setShowBalance] = useState(true);

    const [showBindWallet, setShowBindWallet] = useState(false);
    const [showWithdrawalPassword, setShowWithdrawalPassword] = useState(false);

    const [currentWithdrawalPassword, setCurrentWithdrawalPassword] = useState("");
    const [newWithdrawalPassword, setNewWithdrawalPassword] = useState("");
    const [confirmWithdrawalPassword, setConfirmWithdrawalPassword] = useState("");

    const [walletAddress, setWalletAddress] = useState("");
    const [network, setNetwork] = useState("USDT-TRC20");
    const [walletPassword, setWalletPassword] = useState("");

    const [showWalletPwd, setShowWalletPwd] = useState(false);

    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    const [loading, setLoading] = useState(false);

    const API = process.env.REACT_APP_API_URL;

    const isWalletBound = Boolean(
        user?.walletAddress?.trim()
    );

    useEffect(() => {
    document.title = "Profile | Hedgefund Power";
  }, []);
  

    // ================= FETCH USER =================
    useEffect(() => {
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(
                    `${API}/api/user/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await res.json();

                if (res.ok) {

                    // UPDATE AUTH CONTEXT USER
                    updateUser(data.user);

                    // UPDATE BALANCE CONTEXT
                    if (
                        data.user?.balance !== undefined
                    ) {
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

    }, [
        API,
        token,
        updateUser,
        setBalance
    ]);

    // ================= BIND / UPDATE WALLET =================
    const handleBindWallet = async () => {

        if (!walletAddress) {
            return alert(
                "Please enter a wallet address."
            );
        }

        if (
            isWalletBound &&
            !walletPassword
        ) {
            return alert(
                "Enter withdrawal password to change wallet."
            );
        }

        if (loading) return;

        setLoading(true);

        try {

            const res = await fetch(
                `${API}/api/user/bind-wallet`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        walletAddress,
                        network,

                        password:
                            isWalletBound
                                ? walletPassword
                                : undefined
                    })
                }
            );

            const data =
                await res.json();

            if (!res.ok) {
                return alert(data.message);
            }

            alert(data.message);

            // UPDATE AUTH USER
            updateUser({
                walletAddress,
                network
            });

            setShowBindWallet(false);

            setWalletAddress("");

            setNetwork("USDT-TRC20");

            setWalletPassword("");

        } catch (err) {

            console.error(err);

            alert("Server error");

        } finally {
            setLoading(false);
        }
    };

    // ================= SET WITHDRAWAL PASSWORD =================
    const handleSetWithdrawalPassword = async () => {

        if (
            !newWithdrawalPassword ||
            !confirmWithdrawalPassword
        ) {
            return alert(
                "Please fill all fields"
            );
        }

        if (
            newWithdrawalPassword !==
            confirmWithdrawalPassword
        ) {
            return alert(
                "Passwords do not match"
            );
        }

        if (loading) return;

        setLoading(true);

        try {

            const res = await fetch(
                `${API}/api/user/set-withdrawal-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        password:
                            newWithdrawalPassword,

                        currentPassword:
                            currentWithdrawalPassword ||
                            undefined
                    })
                }
            );

            const data =
                await res.json();

            if (!res.ok) {
                return alert(data.message);
            }

            alert(data.message);

            // UPDATE USER STATE
            updateUser({
                withdrawalPassword: true
            });

            setCurrentWithdrawalPassword("");

            setNewWithdrawalPassword("");

            setConfirmWithdrawalPassword("");

            setShowWithdrawalPassword(false);

        } catch (err) {

            console.error(err);

            alert("Server error");

        } finally {
            setLoading(false);
        }
    };

    // ================= LOADING =================
    if (authLoading || !user) {
        return (
            <div className="profile-loading">

                <div className="loading-card">
                    <div className="skeleton avatar"></div>

                    <div className="loading-text">
                        <div className="skeleton line short"></div>
                        <div className="skeleton line long"></div>
                    </div>
                </div>

                <div className="skeleton asset-box"></div>

                <div className="skeleton menu-item"></div>
                <div className="skeleton menu-item"></div>
                <div className="skeleton menu-item"></div>
                <div className="skeleton menu-item"></div>
                <div className="skeleton menu-item"></div>
                <div className="skeleton menu-item"></div>

            </div>
        );
    }

    return (
        <div className="profile-page">

            {/* PROFILE */}
            <div className="profile-info">

                <div className="profile-left">

                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.email || "User"
                        )}&background=fff&color=D4A64F&format=png&bold=true&rounded=true&size=128`}
                        alt="avatar"
                    />

                    <div>
                        <h3>
                            {user?.email?.split("@")[0] || "User"}
                        </h3>

                        <p>
                            ID: {user?._id?.slice(0, 6)}
                        </p>
                    </div>

                </div>

            </div>

            {/* ACTIONS */}
            <div className="profile-actions">

                <button
                    className="topup"
                    onClick={() =>
                        navigate("/topup")
                    }
                >
                    Top-up
                </button>

                <button
                    className="withdraw"
                    onClick={() =>
                        navigate("/withdraw")
                    }
                >
                    Withdraw
                </button>

            </div>

            {/* BALANCE */}
            <div className="asset-card">

                <div className="asset-header">

                    <span>Total Assets</span>

                    <div
                        onClick={() =>
                            setShowBalance(
                                !showBalance
                            )
                        }
                    >
                        {showBalance
                            ? <FiEye />
                            : <FiEyeOff />}
                    </div>

                </div>

                <div className="asset-balance">
                    {showBalance
                        ? `${currency.symbol}${(
                            balance * currency.rate
                        ).toLocaleString()}`
                        : "****"}
                </div>

                <span
                    className="history"
                    onClick={() =>
                        navigate(
                            "/transaction-history"
                        )
                    }
                >
                    Transaction History ›
                </span>

            </div>

            {/* MENU */}
            <div className="profile-menu">

                <div
                    className="menu-item"
                    onClick={() =>
                        navigate("/invite")
                    }
                >
                    <FiShare2 />
                    <span>Invite Friends</span>
                </div>

                <div
                    className="menu-item"
                    onClick={() =>
                        navigate("/rewards")
                    }
                >
                    <FiStar />
                    <span>Rewards</span>
                </div>

                <div
                    className="menu-item"
                    onClick={() =>
                        setShowBindWallet(true)
                    }
                >
                    <FiCreditCard />

                    <span>
                        {isWalletBound
                            ? "Change Wallet"
                            : "Bind Wallet"}
                    </span>
                </div>

                <div
                    className="menu-item"
                    onClick={() =>
                        setShowWithdrawalPassword(true)
                    }
                >
                    <FiLock />

                    <span>
                        {user?.withdrawalPassword
                            ? "Change Withdrawal Password"
                            : "Set Withdrawal Password"}
                    </span>
                </div>

                <div
                    className="menu-item"
                    onClick={() =>
                        navigate("/faq")
                    }
                >
                    <FiHelpCircle />
                    <span>FAQ</span>
                </div>

                <div
                    className="menu-item"
                    onClick={() =>
                        navigate("/about")
                    }
                >
                    <FiMessageSquare />
                    <span>About</span>
                </div>

                <div
                    className="menu-item"
                    onClick={async () => {

                        // INSTANT UI CLEAR
                        clearSupportBadge();

                        try {

                            await fetch(
                                `${API}/api/support/mark-seen`,
                                {
                                    method: "PUT",

                                    headers: {
                                        Authorization:
                                            `Bearer ${token}`
                                    }
                                }
                            );

                        } catch (err) {
                            console.error(err);
                        }

                        navigate("/support");
                    }}
                >
                    <div className="menu-icon-wrapper">

                        <FiHeadphones />

                        {unreadSupportCount > 0 && (
                            <div className="support-badge">
                                {unreadSupportCount > 99
                                    ? "99+"
                                    : unreadSupportCount}
                            </div>
                        )}

                    </div>

                    <span>Support</span>

                </div>

            </div>

            {/* LOGOUT */}
            <button
                className="logout-btn"
                onClick={logout}
            >
                <FiLogOut /> Sign Out
            </button>

            {/* WALLET MODAL */}
            {showBindWallet && (
                <div className="modal">

                    <div className="modal-content">

                        <h3>
                            {isWalletBound
                                ? "Change Wallet"
                                : "Bind Wallet"}
                        </h3>

                        <input
                            type="text"
                            placeholder="Wallet address"
                            value={walletAddress}
                            onChange={(e) =>
                                setWalletAddress(
                                    e.target.value
                                )
                            }
                        />

                        <select
                            className="wallet-select"
                            value={network}
                            onChange={(e) =>
                                setNetwork(
                                    e.target.value
                                )
                            }
                        >
                            <option value="USDT-TRC20">
                                USDT-TRC20
                            </option>

                            <option value="USDT-TON">
                                USDT-TON
                            </option>

                            <option value="USDT-BEP20">
                                USDT-BEP20
                            </option>

                        </select>

                        {isWalletBound && (
                            <div className="password-input-wrapper">

                                <input
                                    type={
                                        showWalletPwd
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Withdrawal password"

                                    value={walletPassword}

                                    onChange={(e) =>
                                        setWalletPassword(
                                            e.target.value
                                        )
                                    }
                                />

                                <div
                                    className="eye-toggle"
                                    onClick={() =>
                                        setShowWalletPwd(
                                            !showWalletPwd
                                        )
                                    }
                                >
                                    {showWalletPwd
                                        ? <FiEyeOff />
                                        : <FiEye />}
                                </div>

                            </div>
                        )}

                        <button
                            onClick={handleBindWallet}
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Confirm"}
                        </button>

                        <button
                            onClick={() =>
                                setShowBindWallet(false)
                            }
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

                        <h3>
                            {user?.withdrawalPassword
                                ? "Change Withdrawal Password"
                                : "Set Withdrawal Password"}
                        </h3>

                        {/* CURRENT PASSWORD */}
                        {user?.withdrawalPassword && (
                            <div className="password-input-wrapper">

                                <input
                                    type={
                                        showCurrentPwd
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Current withdrawal password"

                                    value={currentWithdrawalPassword}

                                    onChange={(e) =>
                                        setCurrentWithdrawalPassword(
                                            e.target.value
                                        )
                                    }
                                />

                                <div
                                    className="eye-toggle"
                                    onClick={() =>
                                        setShowCurrentPwd(
                                            !showCurrentPwd
                                        )
                                    }
                                >
                                    {showCurrentPwd
                                        ? <FiEyeOff />
                                        : <FiEye />}
                                </div>

                            </div>
                        )}

                        {/* NEW PASSWORD */}
                        <div className="password-input-wrapper">

                            <input
                                type={
                                    showNewPwd
                                        ? "text"
                                        : "password"
                                }

                                placeholder="New password"

                                value={newWithdrawalPassword}

                                onChange={(e) =>
                                    setNewWithdrawalPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <div
                                className="eye-toggle"
                                onClick={() =>
                                    setShowNewPwd(
                                        !showNewPwd
                                    )
                                }
                            >
                                {showNewPwd
                                    ? <FiEyeOff />
                                    : <FiEye />}
                            </div>

                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="password-input-wrapper">

                            <input
                                type={
                                    showConfirmPwd
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Confirm new password"

                                value={confirmWithdrawalPassword}

                                onChange={(e) =>
                                    setConfirmWithdrawalPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <div
                                className="eye-toggle"
                                onClick={() =>
                                    setShowConfirmPwd(
                                        !showConfirmPwd
                                    )
                                }
                            >
                                {showConfirmPwd
                                    ? <FiEyeOff />
                                    : <FiEye />}
                            </div>

                        </div>

                        <button
                            onClick={
                                handleSetWithdrawalPassword
                            }
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Confirm"}
                        </button>

                        <button
                            onClick={() =>
                                setShowWithdrawalPassword(false)
                            }
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
