// import React, { useState } from "react";
// import "../styles/header.css";
// import logo from "../assets/logo.png";
// import { useBalance } from "../context/BalanceContext"; // ✅ ADDED

// const Header = () => {
//   const [currency, setCurrency] = useState("$");

//   const { balance } = useBalance(); // ✅ GLOBAL BALANCE

//   const currencies = [
//     { symbol: "$", label: "USD" },
//     { symbol: "₦", label: "NGN" },
//     { symbol: "£", label: "GBP" },
//     { symbol: "€", label: "EUR" },
//   ];

//   return (
//     <header className="header">
//       {/* Left: Logo */}
//       <div className="header-left">
//         <img src={logo} alt="Logo" className="logo" />
//       </div>

//       {/* Right: Balance widget */}
//       <div className="header-right">
//         <div className="balance-widget">
//           <span className="currency-symbol">{currency}</span>

//           <span className="amount">
//             {balance.toLocaleString()}
//           </span>

//           <span className="balance-widget-divider">|</span>

//           <select
//             className="currency-select-inline"
//             value={currency}
//             onChange={(e) => setCurrency(e.target.value)}
//           >
//             {currencies.map((c) => (
//               <option key={c.symbol} value={c.symbol}>
//                 {c.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import "../styles/header.css";
import logo from "../assets/logo.png";
import { useCurrency } from "../context/CurrencyContext";
import { useBalance } from "../context/BalanceContext";

const Header = () => {
  const { currency, setCurrency } = useCurrency();
  const { balance } = useBalance();

  const currencies = [
    { code: "USD", symbol: "$", label: "USD", rate: 1 },
    { code: "NGN", symbol: "₦", label: "NGN", rate: 1500 },
    { code: "GBP", symbol: "£", label: "GBP", rate: 0.79 },
    { code: "EUR", symbol: "€", label: "EUR", rate: 0.92 }
  ];

  const handleChange = (symbol) => {
    const selected = currencies.find(c => c.symbol === symbol);
    setCurrency(selected);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-right">
        <div className="balance-widget">
          
          <span className="currency-symbol">
            {currency.symbol}
          </span>

          <span className="amount">
            {(balance * currency.rate).toLocaleString()}
          </span>

          <span className="balance-widget-divider">|</span>

          <select
            value={currency.symbol}
            onChange={(e) => handleChange(e.target.value)}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.symbol}>
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
