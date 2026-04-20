import React, { useState } from "react";
import "../styles/market.css";

import { useCurrency } from "../context/CurrencyContext";
import { useBalance } from "../context/BalanceContext"; // ✅ IMPORT

import pp1 from "../assets/pp1 1.png";
import pp4 from "../assets/pp4 1.png";
import pp5 from "../assets/pp5 1.png";
import pp6 from "../assets/pp6 1.png";
import pp8 from "../assets/pp8 1.png";
import pp9 from "../assets/pp9 1.png";
import pp10 from "../assets/pp10 1.png";
import pp11 from "../assets/pp11 1.png";

export const machines = [
  { name: "Flash Speed Power Pumping Machine", price: 10, profit: 0.0264, duration: 21, img: pp1 },
  { name: "Godspeed Power Pumping Machine", price: 20, profit: 0.0529, duration: 21, img: pp4 },
  { name: "Surge Power Pumping Machine", price: 35, profit: 0.0925, duration: 21, img: pp5 },
  { name: "Speedy Power Pumping Machine", price: 50, profit: 0.1322, duration: 21, img: pp6 },
  { name: "Light Speed Pumping Machine", price: 100, profit: 0.2645, duration: 21, img: pp8 },
  { name: "Sound Speed Power Pumping Machine", price: 500, profit: 1.3224, duration: 21, img: pp9 },
  { name: "Sonic Power Pumping Machine", price: 1000, profit: 2.6445, duration: 21, img: pp10 },
  { name: "Spark Power Pumping Machine", price: 5000, profit: 13.2242, duration: 21, img: pp11 }
];

export default function PurchaseHall() {
  const { currency } = useCurrency();
  const { balance, setBalance } = useBalance(); // ✅ USE BALANCE

  const [showDetails, setShowDetails] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const format = (value) => {
    return `${currency.symbol}${(value * currency.rate).toLocaleString(undefined, {
      maximumFractionDigits: 4
    })}`;
  };

  const openDetails = (machine) => {
    setSelectedMachine(machine);
    setShowDetails(true);
  };

  const openBuy = (machine) => {
    setSelectedMachine(machine);
    setShowBuy(true);
  };

  const closeModal = () => {
    setShowDetails(false);
    setShowBuy(false);
    setSelectedMachine(null);
  };

  const handleBuy = () => {
    if (!selectedMachine) return;

    // ❌ Prevent purchase if insufficient balance
    if (balance < selectedMachine.price) {
      alert("Insufficient balance!");
      return;
    }

    const purchaseDate = new Date();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + selectedMachine.duration);

    const ownedMachine = {
      ...selectedMachine,
      purchaseDate,
      expiryDate,
      status: "running"
    };

    // ✅ Deduct balance
    setBalance(balance - selectedMachine.price);

    console.log("Purchased Machine:", ownedMachine);
    alert("Machine purchased successfully!");

    closeModal();
  };

  return (
    <div className="purchase-container">

      {/* MACHINES */}
      {machines.map((machine, index) => (
        <div className="machine-card" key={index}>

          <div className="machine-header">
            <img src={machine.img} alt="machine" />

            <div className="name-tag">
              <h3>{machine.name}</h3>
              <span className="tag">Clean energy</span>
            </div>
          </div>

          <div className="machine-info">

            <div className="profit">
              <span className="value">
                {format(machine.profit)}
              </span>
              <p>Profit / Hour</p>
            </div>

            <div className="price">
              <span className="value">
                {format(machine.price)}
              </span>
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
              disabled={balance < machine.price} // ✅ DISABLE IF LOW BALANCE
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

            <img src={selectedMachine.img} alt="" />
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

            <img src={selectedMachine.img} alt="" />
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

            <button className="details-buy" onClick={handleBuy}>
              Confirm Purchase
            </button>

            <button className="details-close" onClick={closeModal}>
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

