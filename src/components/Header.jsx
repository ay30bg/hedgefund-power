import React, { useState } from "react";
import "../styles/header.css";
import logo from "../assets/logo.png";
import { useBalance } from "../context/BalanceContext"; // ✅ ADDED

const Header = () => {
  const [currency, setCurrency] = useState("$");

  const { balance } = useBalance(); // ✅ GLOBAL BALANCE

  const currencies = [
    { symbol: "$", label: "USD" },
    { symbol: "₦", label: "NGN" },
    { symbol: "£", label: "GBP" },
    { symbol: "€", label: "EUR" },
  ];

  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Right: Balance widget */}
      <div className="header-right">
        <div className="balance-widget">
          <span className="currency-symbol">{currency}</span>

          <span className="amount">
            {balance.toLocaleString()}
          </span>

          <span className="balance-widget-divider">|</span>

          <select
            className="currency-select-inline"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
