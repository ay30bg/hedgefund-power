// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import "../styles/auth.css";
// import logo from "../assets/logo.png";

// function LoginPage() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleLogin = async () => {
//     if (!form.email.trim()) {
//       return alert("Please enter your email.");
//     }

//     if (!form.password.trim()) {
//       return alert("Please enter your password.");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: form.email,
//             password: form.password
//           })
//         }
//       );

//       const data = await res.json();

//       console.log("LOGIN RESPONSE:", data);

//       // ================= HANDLE ERROR RESPONSES =================
//       if (!res.ok) {
//         // 🔥 NOT VERIFIED CASE
//         if (data.message === "Please verify your email first") {
//           alert("Account not verified. Redirecting to verification...");

//           navigate("/verify", {
//             state: {
//               email: form.email,
//               mode: "login"
//             }
//           });

//           return;
//         }

//         // 🔥 GENERIC ERROR HANDLING
//         return alert(data.message || "Login failed");
//       }

//       // ================= VALIDATION =================
//       if (!data?.token || !data?.user?._id) {
//         return alert("Invalid server response. Try again.");
//       }

//       // ================= STORE AUTH DATA =================
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("userId", data.user._id);

//       console.log("Saved userId:", data.user._id);

//       alert("Login successful!");

//       navigate("/profile");

//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Network error. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="overlay">
//         <div className="login-box">

//           {/* LOGO */}
//           <div className="logo-container">
//             <img src={logo} alt="Logo" className="login-logo" />
//           </div>

//           {/* EMAIL */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="input-field"
//             onChange={handleChange}
//           />

//           {/* PASSWORD */}
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               className="input-field"
//               onChange={handleChange}
//             />

//             <span
//               className="password-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </span>
//           </div>

//           {/* FORGOT PASSWORD */}
//           <div className="forgot">
//             <a href="/forgot-password">Forgot Password?</a>
//           </div>

//           {/* LOGIN BUTTON */}
//           <button
//             className="login-btn"
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* SIGNUP */}
//           <p className="signup">
//             Don't have an account?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               style={{ cursor: "pointer" }}
//             >
//               Sign Up
//             </span>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext"; // 🔥 NEW

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 NEW

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!form.email.trim()) {
      return alert("Please enter your email.");
    }

    if (!form.password.trim()) {
      return alert("Please enter your password.");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ================= HANDLE ERROR RESPONSES =================
      if (!res.ok) {
        if (data.message === "Please verify your email first") {
          alert("Account not verified. Redirecting to verification...");

          navigate("/verify", {
            state: {
              email: form.email,
              mode: "login"
            }
          });

          return;
        }

        return alert(data.message || "Login failed");
      }

      // ================= VALIDATION =================
      if (!data?.token || !data?.user?._id) {
        return alert("Invalid server response. Try again.");
      }

      // ================= AUTH CONTEXT LOGIN (🔥 IMPORTANT CHANGE) =================
      login(data);

      console.log("User logged in:", data.user._id);

      alert("Login successful!");

      navigate("/profile");

    } catch (err) {
      console.error("Login error:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-box">

          {/* LOGO */}
          <div className="logo-container">
            <img src={logo} alt="Logo" className="login-logo" />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-field"
              onChange={handleChange}
            />

            <span
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="forgot">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* SIGNUP */}
          <p className="signup">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer" }}
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
