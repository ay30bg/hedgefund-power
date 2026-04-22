import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data); // DEBUG

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 🚨 VALIDATION
      if (!data.token) {
        alert("Login failed: invalid token received");
        return;
      }

      if (!data.user || !data.user._id) {
        alert("Login failed: invalid user data received");
        return;
      }

      // ================= SAVE AUTH DATA =================
      localStorage.setItem("token", data.token);

      // store full user object
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 IMPORTANT FIX FOR YOUR BALANCE ISSUE
      localStorage.setItem("userId", data.user._id);

      console.log("Saved userId:", data.user._id);

      alert("Login successful!");

      navigate("/profile");

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again.");
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
