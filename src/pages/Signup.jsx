import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";
import logo from "../assets/logo.png";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    terms: false
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const referralRegex = /^[A-Z0-9]{4,12}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : name === "referralCode"
          ? value.toUpperCase()
          : value
    });
  };

  const handleSubmit = async () => {
    let errorMessages = [];

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

    if (form.referralCode && !referralRegex.test(form.referralCode)) {
      errorMessages.push("Invalid referral code format.");
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

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            referralCode: form.referralCode || null
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Optional: auto login after signup
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Signup successful!");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="overlay">
        <div className="signup-box">

          <div className="signup-logo-container">
            <img src={logo} alt="HedgeFund Power Logo" className="signup-logo" />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="input-field"
            onChange={handleChange}
          />

          {/* REFERRAL CODE */}
          <input
            type="text"
            name="referralCode"
            placeholder="Referral Code (optional)"
            className="input-field optional"
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

          {/* TERMS */}
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

          {/* BUTTON */}
          <button
            className="login-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
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
