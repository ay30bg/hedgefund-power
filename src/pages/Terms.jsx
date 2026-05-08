import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/terms.css";

import {
  FiArrowLeft,
  FiAlertTriangle,
  FiDollarSign,
  FiLock,
  FiRefreshCw,
  FiFileText,
  FiUsers
} from "react-icons/fi";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page">

      {/* HEADER */}
      <div className="terms-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Terms & Conditions</h2>
      </div>

      {/* CONTENT CARD */}
      <div className="terms-card">

        <div className="terms-item">
          <FiFileText />
          <div>
            <h4>Platform Overview</h4>
            <p>
              This platform provides access to a structured digital participation
              system with tier-based engagement and automated processing cycles.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiAlertTriangle />
          <div>
            <h4>Risk Disclosure</h4>
            <p>
              Participation carries financial risk. No profit, returns, or capital
              preservation is guaranteed. Users may lose all funds.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiDollarSign />
          <div>
            <h4>Funds & Payments</h4>
            <p>
              All funds are pooled for operational use. Withdrawals may be delayed
              due to system load, verification, or liquidity conditions.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiLock />
          <div>
            <h4>No Guarantees</h4>
            <p>
              The platform does not function as a bank or financial institution and
              offers no insurance or government-backed protection.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiRefreshCw />
          <div>
            <h4>System Changes</h4>
            <p>
              Rules, fees, and system logic may change at any time without prior
              notice to maintain stability and scalability.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiUsers />
          <div>
            <h4>User Responsibility</h4>
            <p>
              All participation is voluntary. Users are fully responsible for their
              actions and financial decisions on the platform.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TermsPage;
