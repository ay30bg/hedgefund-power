import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";
import logo from "../assets/logo.png";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ================= AUTO FILL REFERRAL FROM URL =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setForm((prev) => ({
        ...prev,
        referralCode: ref.toUpperCase(),
      }));
    }
  }, [location.search]);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : name === "referralCode"
          ? value.toUpperCase()
          : value,
    });
  };

  // ================= VALIDATION =================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async () => {
    let errors = [];

    if (!emailRegex.test(form.email)) {
      errors.push("Enter a valid email.");
    }

    if (!passwordRegex.test(form.password)) {
      errors.push(
        "Password must be 8+ characters with letters and numbers."
      );
    }

    if (form.password !== form.confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (!form.terms) {
      errors.push("You must accept Terms & Privacy Policy.");
    }

    // 🚨 IMPORTANT: NO REFERRAL FORMAT VALIDATION HERE
    // Backend will validate real referral codes

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            referralCode: form.referralCode || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/verify", {
        state: {
          email: form.email,
          mode: "signup",
        },
      });
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

          {/* LOGO */}
          <div className="signup-logo-container">
            <img src={logo} alt="Logo" className="signup-logo" />
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
            value={form.referralCode}
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
                By registering, you agree to our{" "}
                <a href="/terms-of-use">Terms of Use</a> and{" "}
                <a href="/privacy-policy">Privacy Policy</a>
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
              onClick={() => navigate("/")}
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
