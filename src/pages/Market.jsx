import React, { useState, useEffect } from "react";
import "../styles/market.css";

import { useCurrency } from "../context/CurrencyContext";
import { useBalance } from "../context/BalanceContext";

export default function PurchaseHall() {
  const { currency } = useCurrency();
  const { balance, setBalance } = useBalance();

  const [machines, setMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(true);

  const [showDetails, setShowDetails] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH MACHINES =================
  useEffect(() => {
    const fetchMachines = async () => {
      const controller = new AbortController();

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/machines`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIXED
            },
            signal: controller.signal,
          }
        );

        const data = await res.json();

        // ✅ Handle auth properly
        if (res.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        setMachines(data.machines);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching machines:", err);
        }
      } finally {
        setLoadingMachines(false);
      }

      return () => controller.abort();
    };

    fetchMachines();
  }, [token]);

  // ================= FORMAT CURRENCY =================
  const format = (value) => {
    return `${currency.symbol}${(value * currency.rate).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 4,
      }
    )}`;
  };

  // ================= MODALS =================
  const openDetails = (machine) => {
    setSelectedMachine(machine);
    setShowDetails(true);
  };

  const openBuy = (machine) => {
    setSelectedMachine(machine);
    setShowBuy(true);
  };

  const closeModal = () => {
    if (loading) return;
    setShowDetails(false);
    setShowBuy(false);
    setSelectedMachine(null);
  };

  // ================= SECURE BUY =================
  const handleBuy = async () => {
    if (!selectedMachine || loading) return;

    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/market`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
          body: JSON.stringify({
            machineId: selectedMachine._id,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      const data = await res.json();

      // ✅ Handle auth ONLY when truly invalid
      if (res.status === 401) {
        if (
          data.message?.toLowerCase().includes("token") ||
          data.message?.toLowerCase().includes("unauthorized")
        ) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
          return;
        } else {
          alert(data.message || "Request failed");
          return;
        }
      }

      // ✅ Handle normal errors (NO logout)
      if (!res.ok) {
        alert(data.message || "Purchase failed");
        return;
      }

      // ✅ Success
      setBalance(data.balance);

      alert("Machine purchased successfully!");
      closeModal();

    } catch (error) {
      if (error.name === "AbortError") {
        alert("Request timed out. Try again.");
      } else {
        console.error("Purchase error:", error);
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loadingMachines) {
    return (
      <div className="purchase-container">
        <p>Loading machines...</p>
      </div>
    );
  }

  return (
    <div className="purchase-container">

      {/* MACHINES LIST */}
      {machines.map((machine) => (
        <div className="machine-card" key={machine._id}>

          <div className="machine-header">
            <img
              src={`${process.env.REACT_APP_API_URL}/${machine.img}`}
              alt={machine.name}
            />

            <div className="name-tag">
              <h3>{machine.name}</h3>
              <span className="tag">Clean energy</span>
            </div>
          </div>

          <div className="machine-info">
            <div className="profit">
              <span className="value">{format(machine.profit)}</span>
              <p>Profit / Hour</p>
            </div>

            <div className="price">
              <span className="value">{format(machine.price)}</span>
              <p>Price</p>
            </div>
          </div>

          <div className="machine-actions">
            <button
              className="details"
              onClick={() => openDetails(machine)}
            >
              Details
            </button>

            <button
              className="buy"
              disabled={balance < machine.price || loading}
              onClick={() => openBuy(machine)}
            >
              Buy
            </button>
          </div>

        </div>
      ))}

      {/* DETAILS MODAL */}
      {showDetails && selectedMachine && (
        <div className="modal-overlay">
          <div className="details-modal">

            <img
              src={`${process.env.REACT_APP_API_URL}/${selectedMachine.img}`}
              alt={selectedMachine.name}
            />

            <h2>{selectedMachine.name}</h2>

            <div className="details-grid">
              <div>
                <span>{format(selectedMachine.price)}</span>
                <p>Machine Price</p>
              </div>

              <div>
                <span>{format(selectedMachine.profit)}</span>
                <p>Profit / Hour</p>
              </div>

              <div>
                <span>{format(selectedMachine.profit * 24)}</span>
                <p>Daily Profit</p>
              </div>

              <div>
                <span>{selectedMachine.duration} Days</span>
                <p>Duration</p>
              </div>
            </div>

            <button
              className="details-buy"
              onClick={() => {
                setShowDetails(false);
                setShowBuy(true);
              }}
            >
              Buy Machine
            </button>

            <button className="details-close" onClick={closeModal}>
              Close
            </button>

          </div>
        </div>
      )}

      {/* BUY MODAL */}
      {showBuy && selectedMachine && (
        <div className="modal-overlay">
          <div className="details-modal">

            <img
              src={`${process.env.REACT_APP_API_URL}/${selectedMachine.img}`}
              alt={selectedMachine.name}
            />

            <h2>Confirm Purchase</h2>

            <div className="details-grid">
              <div>
                <span>{format(selectedMachine.price)}</span>
                <p>Machine Price</p>
              </div>

              <div>
                <span>{format(selectedMachine.profit)}</span>
                <p>Profit / Hour</p>
              </div>

              <div>
                <span>{format(selectedMachine.profit * 24)}</span>
                <p>Daily Profit</p>
              </div>

              <div>
                <span>{selectedMachine.duration} Days</span>
                <p>Duration</p>
              </div>
            </div>

            <button
              className="details-buy"
              onClick={handleBuy}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Purchase"}
            </button>

            <button
              className="details-close"
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}


