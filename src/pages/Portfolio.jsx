import React, { useState, useEffect } from "react";
import "../styles/portfolio.css";

import { useCurrency } from "../context/CurrencyContext";

import goldImg from "../assets/gold-coins.png";
import goldBarStack from "../assets/gold-bar-stack.png";

import pp1 from "../assets/pp1 1.png";
import pp4 from "../assets/pp4 1.png";
import pp5 from "../assets/pp5 1.png";
import pp6 from "../assets/pp6 1.png";
import pp8 from "../assets/pp8 1.png";
import pp9 from "../assets/pp9 1.png";
import pp10 from "../assets/pp10 1.png";
import pp11 from "../assets/pp11 1.png";

/* ---------------- Machine Image Map ---------------- */
const machineImages = {
    "Flash Speed Power Pumping Machine": pp1,
    "Godspeed Power Pumping Machine": pp4,
    "Surge Power Pumping Machine": pp5,
    "Speedy Power Pumping Machine": pp6,
    "Light Speed Pumping Machine": pp8,
    "Sound Speed Power Pumping Machine": pp9,
    "Sonic Power Pumping Machine": pp10,
    "Spark Power Pumping Machine": pp11,
};

/* ---------------- Helpers ---------------- */
const getStatus = (start, end, claimed) => {
    if (!start || !end) return "waiting";

    if (claimed) return "claimed";

    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (now >= startDate && now < endDate) return "running";
    if (now >= endDate) return "claimable";

    return "waiting";
};

const getProgress = (start, end) => {
    if (!start || !end) return 0;

    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    const total = endDate - startDate;
    const current = now - startDate;

    return Math.min(Math.max((current / total) * 100, 0), 100);
};

const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function Portfolio() {
    const { currency } = useCurrency();

    const [activeTab, setActiveTab] = useState("investments");

    const [machines, setMachines] = useState([]);
    const [investments, setInvestments] = useState([]);

    const [loadingId, setLoadingId] = useState(null);

    const [loadingInvestments, setLoadingInvestments] = useState(true);
    const [loadingMachines, setLoadingMachines] = useState(true);

    const [investSkeletonCount, setInvestSkeletonCount] = useState(3);
    const [machineSkeletonCount, setMachineSkeletonCount] = useState(3);

    const [, forceUpdate] = useState(0);

    /* live refresh */
    useEffect(() => {
        const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    /* ---------------- FETCH ---------------- */
    const fetchMachines = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/market/user`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();

            if (res.ok) {
                const list = data.machines || [];
                setMachines(list);
                setMachineSkeletonCount(list.length || 3);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMachines(false);
        }
    };

    const fetchInvestments = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/invest/user`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();

            if (res.ok) {
                const list = data.investments || [];
                setInvestments(list);
                setInvestSkeletonCount(list.length || 3);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingInvestments(false);
        }
    };

    useEffect(() => {
        fetchMachines();
        fetchInvestments();
    }, []);

    const format = (value) =>
        `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
            maximumFractionDigits: 2,
        })}`;

    /* ---------------- CLAIM INVESTMENT ---------------- */
    const handleClaimInvestment = async (id) => {
        try {
            setLoadingId(id);

            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/invest/claim/${id}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Claim failed");
                return;
            }

            alert("Investment claimed successfully");

            // ✅ INSTANT UI UPDATE (IMPORTANT FIX)
            setInvestments((prev) =>
                prev.map((inv) =>
                    inv._id === id ? { ...inv, claimed: true } : inv
                )
            );

            await fetchInvestments();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    };

    /* ---------------- CLAIM MACHINE ---------------- */
    const handleClaimMachine = async (id) => {
        try {
            setLoadingId(id);

            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/market/claim/${id}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Claim failed");
                return;
            }

            alert("Machine profit claimed");
            await fetchMachines();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="portfolio-page">

            {/* ================= TABS ================= */}
            <div className="portfolio-tabs">
                <button
                    className={`portfolio-tab ${activeTab === "investments" ? "active" : ""}`}
                    onClick={() => setActiveTab("investments")}
                >
                    Investments
                </button>

                <button
                    className={`portfolio-tab ${activeTab === "machines" ? "active" : ""}`}
                    onClick={() => setActiveTab("machines")}
                >
                    Machines
                </button>
            </div>

            {/* ================= INVESTMENTS ================= */}
            {activeTab === "investments" && (
                <section className="investments-section">

                    <div className="invest-cards">

                        {loadingInvestments ? (
                            [...Array(investSkeletonCount)].map((_, i) => (
                                <div className="invest-card skeleton-card" key={i}>

                                    <div className="invest-header">
                                        <div className="skeleton img"></div>

                                        <div className="name-tag">
                                            <div className="skeleton line short"></div>
                                            <div className="skeleton line tiny"></div>
                                        </div>

                                        <div className="skeleton badge"></div>
                                    </div>

                                    <div className="invest-info">
                                        <div className="skeleton box"></div>
                                        <div className="skeleton box"></div>
                                    </div>

                                    <div className="skeleton progress"></div>
                                    <div className="skeleton line full"></div>
                                    <div className="skeleton button"></div>

                                </div>
                            ))
                        ) : investments.length === 0 ? (
                            <div className="empty-state premium">
                                <div className="empty-glow"></div>
                                <h3>No investments yet</h3>
                                <p>Your portfolio is waiting. Start investing to unlock earnings.</p>

                                <button
                                    className="empty-cta"
                                    onClick={() => window.location.href = "/invest"}
                                >
                                    Start Investing
                                </button>
                            </div>
                        ) : (
                            investments.map((inv) => {
                                const status = getStatus(
                                    inv.startDate,
                                    inv.endDate,
                                    inv.claimed
                                );

                                const progress = getProgress(inv.startDate, inv.endDate);

                                return (
                                    <div className={`invest-card ${status === "claimed" ? "claimed" : ""}`} key={inv._id}>
                                        <div className="invest-header">
                                            <img
                                                src={inv.days > 10 ? goldBarStack : goldImg}
                                                alt={inv.name}
                                            />

                                            <div className="name-tag">
                                                <h3>{inv.name}</h3>
                                                <span className="tag">{inv.days} Day(s)</span>
                                            </div>

                                            <span className={`status-badge ${status}`}>
                                                {status}
                                            </span>
                                        </div>

                                        <div className="invest-info">
                                            <div>
                                                <span>Deposit</span>
                                                <strong>{format(inv.amount)}</strong>
                                            </div>

                                            <div>
                                                <span>Total Profit</span>
                                                <strong>{format(inv.profit)}</strong>
                                            </div>
                                        </div>

                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>

                                        <p className="invest-dates">
                                            {formatDateTime(inv.startDate)} -{" "}
                                            {formatDateTime(inv.endDate)}
                                        </p>

                                        {status === "claimable" && (
                                            <button
                                                className="claim-btn"
                                                onClick={() => handleClaimInvestment(inv._id)}
                                                disabled={loadingId === inv._id}
                                            >
                                                {loadingId === inv._id ? "Processing..." : "Claim Profit"}
                                            </button>
                                        )}

                                        {status === "claimed" && (
                                            <button className="claim-btn claimed" disabled>
                                                Claimed
                                            </button>
                                        )}
                                    </div>
                                );
                            })
                        )}

                    </div>
                </section>
            )}

            {/* ================= MACHINES ================= */}
            {activeTab === "machines" && (
                <section className="machines-section">
                    <div className="machine-cards">

                        {loadingMachines ? (
                            [...Array(machineSkeletonCount)].map((_, i) => (
                                <div className="machine-card skeleton-card" key={i}>

                                    <div className="machine-header">
                                        <div className="skeleton img"></div>

                                        <div className="name-tag">
                                            <div className="skeleton line short"></div>
                                            <div className="skeleton line tiny"></div>
                                        </div>

                                        <div className="skeleton badge"></div>
                                    </div>

                                    <div className="machine-info">
                                        <div className="skeleton box"></div>
                                        <div className="skeleton box"></div>
                                    </div>

                                    <div className="skeleton progress"></div>
                                    <div className="skeleton button"></div>

                                </div>
                            ))
                        ) : machines.length === 0 ? (
                            <div className="empty-state premium">
                                <div className="empty-glow"></div>
                                <h3>No machines yet</h3>
                                <p>Purchase a machine to start generating hourly profits.</p>

                                <button
                                    className="empty-cta"
                                    onClick={() => window.location.href = "/market"}
                                >
                                    Browse Machines
                                </button>
                            </div>
                        ) : (
                            machines.map((machine) => {
                                const status = getStatus(
                                    machine.purchaseDate,
                                    machine.expiryDate
                                );

                                const progress = getProgress(
                                    machine.purchaseDate,
                                    machine.expiryDate
                                );

                                return (
                                    <div className={`machine-card ${status === "claimed" ? "claimed" : ""}`} key={machine._id}>
                                        <div className="machine-header">
                                            <img
                                                src={machineImages[machine.name]}
                                                alt={machine.name}
                                            />

                                            <div className="name-tag">
                                                <h3>{machine.name}</h3>
                                                <span className="tag">{machine.duration} Days</span>
                                            </div>

                                            <span className={`status-badge ${status}`}>
                                                {status}
                                            </span>
                                        </div>

                                        <div className="machine-info">
                                            <div>
                                                <span>Profit / Hour</span>
                                                <strong>{format(machine.profit)}</strong>
                                            </div>

                                            <div>
                                                <span>Daily Profit</span>
                                                <strong>{format(machine.profit * 24)}</strong>
                                            </div>
                                        </div>

                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>

                                        <p className="machine-dates">
                                            {formatDateTime(machine.purchaseDate)} -{" "}
                                            {formatDateTime(machine.expiryDate)}
                                        </p>

                                        {status === "claimable" && (
                                            <button
                                                className="claim-btn"
                                                onClick={() => handleClaimMachine(machine._id)}
                                                disabled={loadingId === machine._id}
                                            >
                                                {loadingId === machine._id
                                                    ? "Processing..."
                                                    : "Claim Profit"}
                                            </button>
                                        )}
                                    </div>
                                );
                            })
                        )}

                    </div>
                </section>
            )}

        </div>
    );
}
