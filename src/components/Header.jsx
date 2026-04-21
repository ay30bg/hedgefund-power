// import React from "react";
// import "../styles/header.css";
// import logo from "../assets/logo.png";

// import { useBalance } from "../context/BalanceContext";
// import { useCurrency } from "../context/CurrencyContext";

// const Header = () => {
//   const { balance } = useBalance();

//   // ✅ FIX: use correct function name
//   const { currency, changeCurrency } = useCurrency();

//   const currencies = [
//     { code: "USD", symbol: "$", label: "USD", rate: 1 },
//     { code: "NGN", symbol: "₦", label: "NGN", rate: 1500 },
//     { code: "GBP", symbol: "£", label: "GBP", rate: 0.79 },
//     { code: "EUR", symbol: "€", label: "EUR", rate: 0.92 }
//   ];

//   // ✅ FIX: call changeCurrency (not setCurrency)
//   const handleChange = (symbol) => {
//     const selected = currencies.find(c => c.symbol === symbol);
//     if (selected) {
//       changeCurrency(selected);
//     }
//   };

//   return (
//     <header className="header">

//       {/* Logo */}
//       <div className="header-left">
//         <img src={logo} alt="Logo" className="logo" />
//       </div>

//       {/* Balance */}
//       <div className="header-right">
//         <div className="balance-widget">

//           {/* Currency Symbol */}
//           <span className="currency-symbol">
//             {currency.symbol}
//           </span>

//           {/* Converted Balance */}
//           <span className="amount">
//             {(balance * currency.rate).toLocaleString(undefined, {
//               maximumFractionDigits: 2
//             })}
//           </span>

//           <span className="balance-widget-divider">|</span>

//           {/* Currency Selector */}
//           <select
//             className="currency-select-inline"
//             value={currency.symbol}
//             onChange={(e) => handleChange(e.target.value)}
//           >
//             {currencies.map((c) => (
//               <option key={c.code} value={c.symbol}>
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

import React, { useEffect, useState, useRef } from "react";
import "../styles/header.css";
import logo from "../assets/logo.png";

import { useBalance } from "../context/BalanceContext";
import { useCurrency } from "../context/CurrencyContext";

const Header = () => {
  const { balance } = useBalance();
  const { currency, changeCurrency } = useCurrency();

  const [animatedBalance, setAnimatedBalance] = useState(0);
  const prevBalanceRef = useRef(0);

  const currencies = [
    { code: "USD", symbol: "$", label: "USD", rate: 1 },
    { code: "NGN", symbol: "₦", label: "NGN", rate: 1500 },
    { code: "GBP", symbol: "£", label: "GBP", rate: 0.79 },
    { code: "EUR", symbol: "€", label: "EUR", rate: 0.92 }
  ];

  const handleChange = (symbol) => {
    const selected = currencies.find(c => c.symbol === symbol);
    if (selected) {
      changeCurrency(selected);
    }
  };

  // ✅ Counter Animation Effect
  useEffect(() => {
    const start = prevBalanceRef.current;
    const end = balance * currency.rate;

    const duration = 500; // animation time in ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const value = start + (end - start) * progress;
      setAnimatedBalance(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevBalanceRef.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [balance, currency]);

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

          {/* ✅ Animated Amount */}
          <span className="amount">
            {animatedBalance.toLocaleString(undefined, {
              maximumFractionDigits: 2
            })}
          </span>

          <span className="balance-widget-divider">|</span>

          <select
            className="currency-select-inline"
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
