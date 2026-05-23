// import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ================= INIT FROM LOCALSTORAGE =================
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }

//     setLoading(false);
//   }, []);

//   // ================= LOGIN =================
//   const login = (data) => {
//     setUser(data.user);
//     setToken(data.token);

//     localStorage.setItem("user", JSON.stringify(data.user));
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("userId", data.user._id);
//   };

//   // ================= LOGOUT =================
//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     localStorage.clear();
//   };
//         isAuthenticated: !!user,

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         userId: user?._id || null,
//         login,
//         logout,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ================= LOGOUT =================
  const logout = useCallback(() => {
    setUser(null);

    setToken(null);

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    localStorage.removeItem(
      "userId"
    );

    // redirect to login
    window.location.href = "/login";
  }, []);

  // ================= LOGIN =================
  const login = useCallback(
    (data) => {
      setUser(data.user);

      setToken(data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "userId",
        data.user._id
      );
    },
    []
  );

  // ================= FETCH AUTH USER =================
  const fetchMe = useCallback(
    async (authToken) => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data =
          await res.json();

        // ================= INVALID TOKEN =================
        if (!res.ok) {
          logout();

          return;
        }

        // ================= UPDATE USER =================
        setUser(data.user);

      } catch (error) {
        console.error(
          "AUTH FETCH ERROR:",
          error
        );

        logout();

      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  // ================= INIT AUTH =================
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    const storedToken =
      localStorage.getItem("token");

    if (
      storedUser &&
      storedToken
    ) {
      try {
        setUser(
          JSON.parse(storedUser)
        );

        setToken(storedToken);

        fetchMe(storedToken);

      } catch (error) {
        console.error(
          "AUTH INIT ERROR:",
          error
        );

        logout();
      }
    } else {
      setLoading(false);
    }
  }, [fetchMe, logout]);

  // ================= AUTO LOGOUT ON TOKEN EXPIRY =================
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = JSON.parse(
        atob(token.split(".")[1])
      );

      if (!decoded.exp) return;

      const expiryTime =
        decoded.exp * 1000;

      const currentTime =
        Date.now();

      const remainingTime =
        expiryTime - currentTime;

      // token already expired
      if (remainingTime <= 0) {
        logout();

        return;
      }

      // logout automatically
      const timer = setTimeout(() => {
        logout();
      }, remainingTime);

      return () =>
        clearTimeout(timer);

    } catch (error) {
      console.error(
        "TOKEN PARSE ERROR:",
        error
      );

      logout();
    }
  }, [token, logout]);

  // ================= UPDATE USER DATA =================
  const updateUser = (
    updatedData
  ) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        ...updatedData,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,

        userId:
          user?._id || null,

        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= CUSTOM HOOK =================
export const useAuth = () =>
  useContext(AuthContext);
