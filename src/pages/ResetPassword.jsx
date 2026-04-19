import React, { useState } from "react";
import "../styles/resetPassword.css";
import { FiArrowLeft } from "react-icons/fi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("New Password:", password);
  };

  return (
    <div className="reset-page">
      {/* Header */}
      <div className="header">
        <FiArrowLeft className="back-icon" />
      </div>

      {/* Content */}
      <div className="content">
        <h1>Reset Password</h1>
        <p>
          Use 6-14 characters with at least one letter and one number.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
