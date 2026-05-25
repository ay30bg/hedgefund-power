import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/verify.css";

export default function VerifyPage() {
  const location = useLocation();
  const email = location.state?.email || "";
  const mode = location.state?.mode || "login";
  const navigate = useNavigate();

  // USE AUTH CONTEXT
  const { login } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  document.title =
    "Verify Account | Hedgefund Power";
}, []);

  // ================= TIMER =================
  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= OTP INPUT =================
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";

      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }

    if (e.key.length === 1 && /\D/.test(e.key)) {
      e.preventDefault();
    }
  };

  // ================= VERIFY OTP =================
  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < 5) {
      alert("Please enter the complete OTP");
      return;
    }

    if (!email) {
      alert("Missing email. Please restart signup/login.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otpCode,
            mode,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      // USE AUTH CONTEXT LOGIN
      if (data.token && data.user) {
        login({
          token: data.token,
          user: data.user,
        });
      }

      alert("Verification successful!");

      navigate("/profile");

    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");

    } finally {
      setLoading(false);
    }
  };

  // ================= RESEND OTP =================
  const handleResend = async () => {
    try {
      setTimer(60);
      setResendEnabled(false);

      setOtp(["", "", "", "", ""]);

      inputsRef.current[0]?.focus();

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to resend OTP");
        return;
      }

      alert("OTP resent successfully");

    } catch (err) {
      console.error(err);
      alert("Server error while resending OTP");
    }
  };

  return (
    <div className="lp-container">
      <h1 className="lp-greeting">
        {mode === "signup"
          ? "Verify Your Email to Sign Up"
          : "Verify Your Email"}
      </h1>

      <p className="lp-subtext">
        Enter the 5-digit code sent to <strong>{email}</strong>
      </p>

      <p className="verify-note">
        Didn’t receive the code? Check your spam or junk folder.
      </p>

      {/* OTP INPUTS */}
      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={value}
            placeholder="-"
            className="otp-input"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* VERIFY BUTTON */}
      <button
        className="lp-btn"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          "Verify"
        )}
      </button>

      {/* RESEND */}
      <div className="verify-resend">
        {resendEnabled ? (
          <button
            className="resend-btn"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        ) : (
          <p>Resend OTP in {timer}s</p>
        )}
      </div>
    </div>
  );
}
