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

const BalanceContext = createContext();

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const BalanceProvider = ({ children }) => {
  const [balance, setBalanceState] = useState(0);
  const [loading, setLoading] = useState(false);

  // ================= REACTIVE USER ID =================
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId");
  });

  // ================= SYNC LOCALSTORAGE CHANGES =================
  useEffect(() => {
    const syncUserId = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", syncUserId);

    return () => {
      window.removeEventListener("storage", syncUserId);
    };
  }, []);

  // ================= FETCH BALANCE =================
  const fetchBalance = useCallback(async (id) => {
    if (!id || id === "null") {
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

  // ================= INIT / USER CHANGE =================
  useEffect(() => {
    if (!userId || userId === "null") {
      console.log("No user logged in, resetting balance");
      setBalanceState(0);
      return;
    }

    // reset before loading new user balance
    setBalanceState(0);

    fetchBalance(userId);
  }, [userId, fetchBalance]);

  // ================= UPDATE BALANCE =================
  const updateBalance = useCallback(
    async (newBalance) => {
      if (!userId || userId === "null") {
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
  const refreshBalance = useCallback(() => {
    if (userId) {
      fetchBalance(userId);
    }
  }, [fetchBalance, userId]);

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
