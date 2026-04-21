// import React, { createContext, useContext, useState } from "react";

// const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState({
//     code: "USD",
//     symbol: "$",
//     rate: 1
//   });

//   const changeCurrency = (newCurrency) => {
//     setCurrency(newCurrency);
//   };

//   return (
//     <CurrencyContext.Provider value={{ currency, setCurrency: changeCurrency }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const useCurrency = () => useContext(CurrencyContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CurrencyContext = createContext();

const defaultCurrency = {
  code: "USD",
  symbol: "$",
  rate: 1
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem("currency");
    return saved ? JSON.parse(saved) : defaultCurrency;
  });

  const [loading, setLoading] = useState(true);

  // 1. Sync to backend on change
  const changeCurrency = async (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", JSON.stringify(newCurrency));

    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/user/preferences`, {
        currency: newCurrency
      });
    } catch (err) {
      console.log("Failed to sync currency to backend", err);
    }
  };

  // 2. Load from backend on app start
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/preferences`
        );

        if (res.data?.currency) {
          setCurrency(res.data.currency);
          localStorage.setItem("currency", JSON.stringify(res.data.currency));
        }
      } catch (err) {
        console.log("Using local currency (offline/backend failed)");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: changeCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
