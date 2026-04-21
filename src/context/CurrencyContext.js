import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1
  });

  const API_URL = process.env.REACT_APP_API_URL;

  // ================= LOAD CURRENCY =================
  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const token = localStorage.getItem("token");

        // fallback if no token
        if (!token) {
          const saved = localStorage.getItem("currency");
          if (saved) setCurrency(JSON.parse(saved));
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/user/preferences`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.data?.currency) {
          setCurrency(res.data.currency);
          localStorage.setItem(
            "currency",
            JSON.stringify(res.data.currency)
          );
        }
      } catch (err) {
        console.warn("Using local currency (backend failed)");

        const saved = localStorage.getItem("currency");
        if (saved) setCurrency(JSON.parse(saved));
      }
    };

    loadCurrency();
  }, [API_URL]);

  // ================= CHANGE CURRENCY =================
  const changeCurrency = async (newCurrency) => {
    setCurrency(newCurrency);

    // always save locally first (optimistic update)
    localStorage.setItem("currency", JSON.stringify(newCurrency));

    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await axios.patch(
        `${API_URL}/api/user/preferences/currency`,
        { currency: newCurrency },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.error(
        "Failed to sync currency to backend",
        err.message
      );
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// ================= HOOK =================
export const useCurrency = () => useContext(CurrencyContext);
