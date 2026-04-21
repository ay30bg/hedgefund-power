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
