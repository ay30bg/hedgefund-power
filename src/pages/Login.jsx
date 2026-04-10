import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    emailOrPhone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    if (!form.emailOrPhone.trim()) {
      alert("Please enter your email or phone number.");
      return;
    }

    if (!form.password.trim()) {
      alert("Please enter your password.");
      return;
    }

    // Simulated successful login
    alert("Login successful!");
    navigate("/profile");
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-box">

          <div className="logo-container">
            <img src={logo} alt="HedgeFund Power Logo" className="login-logo" />
          </div>

          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email/Phone Number"
            className="input-field"
            onChange={handleChange}
          />

          {/* PASSWORD INPUT */}
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

          <div className="forgot">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

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