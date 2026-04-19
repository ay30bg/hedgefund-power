import React, { useState } from "react";
import "../styles/forgotPassword.css";

const FindAccount = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <div className="find-account-page">

      {/* Content */}
      <div className="content">
        <h1>Forgot Password</h1>
        <p>
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;
