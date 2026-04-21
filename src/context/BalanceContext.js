// // import React, { createContext, useContext, useState } from "react";

// // const BalanceContext = createContext();

// // export const BalanceProvider = ({ children }) => {
// //   const [balance, setBalance] = useState(12800);

// //   const updateBalance = (newBalance) => {
// //     setBalance(newBalance);
// //   };

// //   return (
// //     <BalanceContext.Provider value={{ balance, setBalance: updateBalance }}>
// //       {children}
// //     </BalanceContext.Provider>
// //   );
// // };

// // export const useBalance = () => useContext(BalanceContext);


// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const BalanceContext = createContext();

// const API_URL = process.env.REACT_APP_API_URL;
// const USER_ID = localStorage.getItem("userId"); // or auth context

// export const BalanceProvider = ({ children }) => {
//   const [balance, setBalance] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH BALANCE =================
//   const fetchBalance = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API_URL}/api/balance/${USER_ID}`
//       );

//       setBalance(res.data.balance);
//     } catch (err) {
//       console.error("Error fetching balance:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= UPDATE BALANCE =================
//   const updateBalance = async (newBalance) => {
//     try {
//       setBalance(newBalance); // optimistic update

//       await axios.put(
//         `${API_URL}/api/balance/${USER_ID}`,
//         { amount: newBalance }
//       );
//     } catch (err) {
//       console.error("Error updating balance:", err.message);
//     }
//   };

//   // ================= INIT =================
//   useEffect(() => {
//     if (USER_ID) fetchBalance();
//   }, []);

//   return (
//     <BalanceContext.Provider
//       value={{
//         balance,
//         setBalance: updateBalance,
//         loading,
//         refreshBalance: fetchBalance
//       }}
//     >
//       {children}
//     </BalanceContext.Provider>
//   );
// };

// export const useBalance = () => useContext(BalanceContext);

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";
import axios from "axios";

const BalanceContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ make userId reactive instead of static localStorage read
  const [userId, setUserId] = useState(null);

  // ================= INIT USER ID =================
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId && storedUserId !== "null") {
      setUserId(storedUserId);
    } else {
      setUserId(null);
    }
  }, []);

  // ================= FETCH BALANCE =================
  const fetchBalance = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/balance/${userId}`
      );

      setBalance(res.data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ================= UPDATE BALANCE =================
  const updateBalance = useCallback(
    async (newBalance) => {
      if (!userId) return;

      try {
        setBalance(newBalance);

        await axios.put(
          `${API_URL}/api/balance/${userId}`,
          { amount: newBalance }
        );
      } catch (err) {
        console.error("Error updating balance:", err.message);
      }
    },
    [userId]
  );

  // ================= AUTO FETCH ON LOGIN =================
  useEffect(() => {
    if (userId) {
      fetchBalance();
    }
  }, [userId, fetchBalance]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance: updateBalance,
        loading,
        refreshBalance: fetchBalance
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
