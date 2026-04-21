// // import React, {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// //   useCallback
// // } from "react";
// // import axios from "axios";

// // const BalanceContext = createContext();

// // const API_URL = process.env.REACT_APP_API_URL;

// // export const BalanceProvider = ({ children }) => {
// //   const [balance, setBalance] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   // ✅ make userId reactive instead of static localStorage read
// //   const [userId, setUserId] = useState(null);

// //   // ================= INIT USER ID =================
// //   useEffect(() => {
// //     const storedUserId = localStorage.getItem("userId");

// //     if (storedUserId && storedUserId !== "null") {
// //       setUserId(storedUserId);
// //     } else {
// //       setUserId(null);
// //     }
// //   }, []);

// //   // ================= FETCH BALANCE =================
// //   const fetchBalance = useCallback(async () => {
// //     if (!userId) return;

// //     try {
// //       setLoading(true);

// //       const res = await axios.get(
// //         `${API_URL}/api/balance/${userId}`
// //       );

// //       setBalance(res.data.balance);
// //     } catch (err) {
// //       console.error("Error fetching balance:", err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [userId]);

// //   // ================= UPDATE BALANCE =================
// //   const updateBalance = useCallback(
// //     async (newBalance) => {
// //       if (!userId) return;

// //       try {
// //         setBalance(newBalance);

// //         await axios.put(
// //           `${API_URL}/api/balance/${userId}`,
// //           { amount: newBalance }
// //         );
// //       } catch (err) {
// //         console.error("Error updating balance:", err.message);
// //       }
// //     },
// //     [userId]
// //   );

// //   // ================= AUTO FETCH ON LOGIN =================
// //   useEffect(() => {
// //     if (userId) {
// //       fetchBalance();
// //     }
// //   }, [userId, fetchBalance]);

// //   return (
// //     <BalanceContext.Provider
// //       value={{
// //         balance,
// //         setBalance: updateBalance,
// //         loading,
// //         refreshBalance: fetchBalance
// //       }}
// //     >
// //       {children}
// //     </BalanceContext.Provider>
// //   );
// // };

// // export const useBalance = () => useContext(BalanceContext);

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback
// } from "react";
// import axios from "axios";

// const BalanceContext = createContext();

// // Fallback in case env is missing
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export const BalanceProvider = ({ children }) => {
//   const [balance, setBalanceState] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState(null);

//   // ================= INIT USER ID =================
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");

//     console.log("Loaded userId from localStorage:", storedUserId);

//     if (storedUserId && storedUserId !== "null") {
//       setUserId(storedUserId);
//     }
//   }, []);

//   // ================= FETCH BALANCE =================
//   const fetchBalance = useCallback(async (id) => {
//     if (!id) {
//       console.log("fetchBalance aborted: no userId");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("Fetching balance for user:", id);

//       const res = await axios.get(`${API_URL}/api/balance/${id}`);

//       console.log("Balance API response:", res.data);

//       if (res.data?.balance !== undefined) {
//         setBalanceState(res.data.balance);
//       } else {
//         console.warn("Balance field missing in response");
//       }
//     } catch (err) {
//       console.error(
//         "Error fetching balance:",
//         err.response?.data || err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ================= UPDATE BALANCE =================
//   const updateBalance = useCallback(
//     async (newBalance) => {
//       if (!userId) {
//         console.log("updateBalance aborted: no userId");
//         return;
//       }

//       try {
//         setBalanceState(newBalance); // optimistic update

//         await axios.put(`${API_URL}/api/balance/${userId}`, {
//           amount: newBalance
//         });

//         console.log("Balance updated successfully");
//       } catch (err) {
//         console.error(
//           "Error updating balance:",
//           err.response?.data || err.message
//         );
//       }
//     },
//     [userId]
//   );

//   // ================= AUTO FETCH =================
//   useEffect(() => {
//     if (userId) {
//       fetchBalance(userId);
//     }
//   }, [userId, fetchBalance]);

//   return (
//     <BalanceContext.Provider
//       value={{
//         balance,
//         setBalance: updateBalance,
//         loading,
//         refreshBalance: () => fetchBalance(userId)
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

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const BalanceProvider = ({ children }) => {
  const [balance, setBalanceState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // ================= FETCH BALANCE =================
  const fetchBalance = useCallback(async (id) => {
    if (!id) {
      console.log("fetchBalance aborted: no userId");
      return;
    }

    try {
      setLoading(true);

      console.log("Fetching balance for user:", id);

      const res = await axios.get(
        `${API_URL}/api/balance/${id}`
      );

      console.log("Balance API response:", res.data);

      setBalanceState(res.data?.balance ?? 0);

    } catch (err) {
      console.error(
        "Error fetching balance:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= INIT USER + FETCH =================
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    console.log("Loaded userId from localStorage:", storedUserId);

    if (!storedUserId || storedUserId === "null") return;

    setUserId(storedUserId);

    // 🔥 IMPORTANT FIX: fetch immediately here
    fetchBalance(storedUserId);
  }, [fetchBalance]);

  // ================= UPDATE BALANCE =================
  const updateBalance = useCallback(
    async (newBalance) => {
      if (!userId) {
        console.log("updateBalance aborted: no userId");
        return;
      }

      try {
        setBalanceState(newBalance); // optimistic update

        await axios.put(
          `${API_URL}/api/balance/${userId}`,
          { amount: newBalance }
        );

        console.log("Balance updated successfully");
      } catch (err) {
        console.error(
          "Error updating balance:",
          err.response?.data || err.message
        );
      }
    },
    [userId]
  );

  // ================= REFRESH =================
  const refreshBalance = () => {
    if (userId) {
      fetchBalance(userId);
    }
  };

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance: updateBalance,
        loading,
        refreshBalance
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
