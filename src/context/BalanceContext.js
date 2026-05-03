// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback
// } from "react";
// import axios from "axios";

// const BalanceContext = createContext();

// const API_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000";

// export const BalanceProvider = ({ children }) => {
//   const [balance, setBalanceState] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // ================= FETCH BALANCE =================
//   const fetchBalance = useCallback(async (id) => {
//     if (!id) {
//       console.log("fetchBalance aborted: no userId");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("Fetching balance for user:", id);

//       const res = await axios.get(
//         `${API_URL}/api/balance/${id}`
//       );

//       console.log("Balance API response:", res.data);

//       setBalanceState(res.data?.balance ?? 0);
//     } catch (err) {
//       console.error(
//         "Error fetching balance:",
//         err.response?.data || err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ================= INIT + USER SWITCH HANDLING =================
//   useEffect(() => {
//     const id = localStorage.getItem("userId");

//     console.log("Loaded userId from localStorage:", id);

//     if (!id || id === "null") {
//       setBalanceState(0); // ensure clean state if no user
//       return;
//     }

//     // 🔥 IMPORTANT: reset old user's balance immediately
//     setBalanceState(0);

//     // fetch fresh balance for current user
//     fetchBalance(id);
//   }, [fetchBalance]);

//   // ================= UPDATE BALANCE =================
//   const updateBalance = useCallback(async (newBalance) => {
//     const id = localStorage.getItem("userId");

//     if (!id) {
//       console.log("updateBalance aborted: no userId");
//       return;
//     }

//     try {
//       setBalanceState(newBalance); // optimistic update

//       await axios.put(
//         `${API_URL}/api/balance/${id}`,
//         { amount: newBalance }
//       );

//       console.log("Balance updated successfully");
//     } catch (err) {
//       console.error(
//         "Error updating balance:",
//         err.response?.data || err.message
//       );
//     }
//   }, []);

//   // ================= REFRESH =================
//   const refreshBalance = useCallback(() => {
//     const id = localStorage.getItem("userId");

//     if (id) {
//       fetchBalance(id);
//     }
//   }, [fetchBalance]);

//   return (
//     <BalanceContext.Provider
//       value={{
//         balance,
//         setBalance: updateBalance,
//         loading,
//         refreshBalance
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
import { useAuth } from "./AuthContext";

const BalanceContext = createContext();

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const BalanceProvider = ({ children }) => {
  const { userId } = useAuth(); // 🔥 SOURCE OF TRUTH

  const [balance, setBalanceState] = useState(0);
  const [loading, setLoading] = useState(false);

  // ================= FETCH BALANCE =================
  const fetchBalance = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/balance/${userId}`
      );

      setBalanceState(res.data?.balance ?? 0);
    } catch (err) {
      console.error("Balance fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ================= AUTO LOAD ON LOGIN =================
  useEffect(() => {
    if (!userId) {
      setBalanceState(0);
      return;
    }

    fetchBalance();
  }, [userId, fetchBalance]);

  // ================= UPDATE BALANCE =================
  const updateBalance = useCallback(
    async (newBalance) => {
      if (!userId) return;

      try {
        setBalanceState(newBalance);

        await axios.put(
          `${API_URL}/api/balance/${userId}`,
          { amount: newBalance }
        );
      } catch (err) {
        console.error("Balance update error:", err.message);
      }
    },
    [userId]
  );

  // ================= REFRESH =================
  const refreshBalance = () => {
    if (userId) fetchBalance();
  };

  return (
    <BalanceContext.Provider
      value={{
        balance,
        setBalance: updateBalance,
        refreshBalance,
        loading
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);
