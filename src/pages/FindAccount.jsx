import React, { useState } from "react";
import "../styles/findAccount.css";
import { FiArrowLeft } from "react-icons/fi";

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
        <h1>Find My Account</h1>
        <p>
          To reset your password, please confirm your account first
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;
