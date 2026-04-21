// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState({
//     code: "USD",
//     symbol: "$",
//     rate: 1
//   });

//   const API_URL = process.env.REACT_APP_API_URL;

//   // ================= LOAD CURRENCY =================
//   useEffect(() => {
//     const loadCurrency = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // fallback if no token
//         if (!token) {
//           const saved = localStorage.getItem("currency");
//           if (saved) setCurrency(JSON.parse(saved));
//           return;
//         }

//         const res = await axios.get(
//           `${API_URL}/api/user/preferences`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         if (res.data?.currency) {
//           setCurrency(res.data.currency);
//           localStorage.setItem(
//             "currency",
//             JSON.stringify(res.data.currency)
//           );
//         }
//       } catch (err) {
//         console.warn("Using local currency (backend failed)");

//         const saved = localStorage.getItem("currency");
//         if (saved) setCurrency(JSON.parse(saved));
//       }
//     };

//     loadCurrency();
//   }, [API_URL]);

//   // ================= CHANGE CURRENCY =================
//   const changeCurrency = async (newCurrency) => {
//     setCurrency(newCurrency);

//     // always save locally first (optimistic update)
//     localStorage.setItem("currency", JSON.stringify(newCurrency));

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) return;

//       await axios.patch(
//         `${API_URL}/api/user/preferences/currency`,
//         { currency: newCurrency },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//     } catch (err) {
//       console.error(
//         "Failed to sync currency to backend",
//         err.message
//       );
//     }
//   };

//   return (
//     <CurrencyContext.Provider value={{ currency, changeCurrency }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// // ================= HOOK =================
// export const useCurrency = () => useContext(CurrencyContext);


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CurrencyContext = createContext();

// ================= DEFAULT =================
const DEFAULT_CURRENCY = {
  code: "USD",
  symbol: "$",
  rate: 1
};

// ================= GET INITIAL (NO FLICKER) =================
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

          // only update if different (prevents unnecessary re-renders)
          if (
            backendCurrency.code !== currency.code ||
            backendCurrency.rate !== currency.rate
          ) {
            setCurrency(backendCurrency);
            localStorage.setItem(
              "currency",
              JSON.stringify(backendCurrency)
            );
          }
        }
      } catch (err) {
        console.warn("Currency sync failed, using local value");
      }
    };

    syncCurrency();
  }, [API_URL]); // intentionally NOT depending on currency

  // ================= CHANGE CURRENCY =================
  const changeCurrency = async (newCurrency) => {
    // optimistic update
    setCurrency(newCurrency);
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
      console.error("Failed to sync currency to backend:", err.message);
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
