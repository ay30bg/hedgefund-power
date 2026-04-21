import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import axios from "axios";

const CurrencyContext = createContext();

// ================= DEFAULT =================
const DEFAULT_CURRENCY = {
  code: "USD",
  symbol: "$",
  rate: 1
};

// ================= INITIAL LOAD (NO FLICKER) =================
const getInitialCurrency = () => {
  try {
    const saved = localStorage.getItem("currency");
    return saved ? JSON.parse(saved) : DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(getInitialCurrency);

  // ✅ track last known currency (prevents effect loops)
  const prevCurrencyRef = useRef(currency);

  const API_URL = process.env.REACT_APP_API_URL;

  // ================= SYNC WITH BACKEND =================
  useEffect(() => {
    const syncCurrency = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${API_URL}/api/user/preferences`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.data?.currency) {
          const backendCurrency = res.data.currency;
          const prev = prevCurrencyRef.current;

          // ✅ only update if different
          if (
            backendCurrency.code !== prev.code ||
            backendCurrency.rate !== prev.rate
          ) {
            setCurrency(backendCurrency);
            localStorage.setItem(
              "currency",
              JSON.stringify(backendCurrency)
            );

            // update ref AFTER change
            prevCurrencyRef.current = backendCurrency;
          }
        }
      } catch (err) {
        console.warn("Currency sync failed, using local value");
      }
    };

    syncCurrency();
  }, [API_URL]); // ✅ no ESLint warning now

  // ================= CHANGE CURRENCY =================
  const changeCurrency = async (newCurrency) => {
    // optimistic update
    setCurrency(newCurrency);
    localStorage.setItem("currency", JSON.stringify(newCurrency));

    // keep ref in sync
    prevCurrencyRef.current = newCurrency;

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
        "Failed to sync currency to backend:",
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
