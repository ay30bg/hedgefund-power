import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";
import logo from "../assets/logo.png";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Regex patterns
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = () => {
    let errorMessages = [];

    if (!usernameRegex.test(form.username)) {
      errorMessages.push(
        "Username must be 3-16 characters (letters, numbers, underscore)."
      );
    }

    if (!emailRegex.test(form.email)) {
      errorMessages.push("Enter a valid email address.");
    }

    if (!passwordRegex.test(form.password)) {
      errorMessages.push(
        "Password must be at least 8 characters with letters and numbers."
      );
    }

    if (form.password !== form.confirmPassword) {
      errorMessages.push("Passwords do not match.");
    }

    if (!form.terms) {
      errorMessages.push(
        "You must accept the Terms of Use and Privacy Policy."
      );
    }

    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      return;
    }

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="overlay">
        <div className="signup-box">

          <div className="signup-logo-container">
            <img src={logo} alt="HedgeFund Power Logo" className="signup-logo" />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username *"
            className="input-field"
            onChange={handleChange}
          />

          <input
            type="text"
            name="email"
            placeholder="Email *"
            className="input-field"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password *"
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

          {/* CONFIRM PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password *"
              className="input-field"
              onChange={handleChange}
            />

            <span
              className="password-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="terms-container">
            <label className="terms-label">
              <input
                type="checkbox"
                name="terms"
                className="terms-checkbox"
                onChange={handleChange}
              />

              <span className="terms-text">
                By registering, you are agreeing to our
                <a href="/terms-of-use"> Terms of Use </a>
                and
                <a href="/privacy-policy"> Privacy Policy</a>
              </span>
            </label>
          </div>

          <button className="login-btn" onClick={handleSubmit}>
            Sign Up
          </button>

          <p className="signup">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignupPage;