import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/terms.css";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page">

      {/* HEADER */}
      <div className="terms-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2>Terms & Conditions</h2>
      </div>

      {/* CONTENT */}
      <div className="terms-card">

        <div className="terms-item">
          <h4>1. Platform Definition</h4>
          <p>
            This platform operates as a digital participation system that provides users
            access to structured engagement cycles, automated allocation processes,
            and tier-based system interactions. Features may vary based on system conditions.
          </p>
        </div>

        <div className="terms-item">
          <h4>2. Financial Risk Warning</h4>
          <p>
            Participation involves extremely high financial risk. There is no guarantee of profit,
            returns, or capital preservation. Users may lose part or all of their funds.
          </p>
        </div>

        <div className="terms-item">
          <h4>3. Funds Handling</h4>
          <p>
            All funds are pooled within the system for operational liquidity. They are not held
            in segregated or insured accounts and should not be treated as traditional deposits.
          </p>
        </div>

        <div className="terms-item">
          <h4>4. Withdrawals</h4>
          <p>
            Withdrawals are subject to processing queues, verification checks, liquidity conditions,
            and system demand. Delays may occur without prior notice.
          </p>
        </div>

        <div className="terms-item">
          <h4>5. System Operations</h4>
          <p>
            The platform uses automated systems for allocation, scheduling, and balancing.
            These systems may be adjusted at any time for stability and performance.
          </p>
        </div>

        <div className="terms-item">
          <h4>6. System Changes</h4>
          <p>
            Rules, fees, reward structures, and operational logic may be changed at any time
            without prior notice. Continued use implies acceptance of changes.
          </p>
        </div>

        <div className="terms-item">
          <h4>7. No Guarantees</h4>
          <p>
            The platform is not a financial institution. No deposits are insured, guaranteed,
            or protected by any government or third party.
          </p>
        </div>

        <div className="terms-item">
          <h4>8. Tier System</h4>
          <p>
            Access levels are assigned based on system metrics such as activity and engagement.
            Tier benefits may change or be revoked at any time.
          </p>
        </div>

        <div className="terms-item">
          <h4>9. Fees</h4>
          <p>
            Operational and processing fees may apply. These fees are automatically deducted
            and are non-refundable.
          </p>
        </div>

        <div className="terms-item">
          <h4>10. Data & Projections</h4>
          <p>
            All dashboards and projections are system-generated estimates and should not be
            considered financial guarantees or advice.
          </p>
        </div>

        <div className="terms-item">
          <h4>11. User Responsibility</h4>
          <p>
            Users are solely responsible for their decisions and acknowledge the speculative
            nature of participation.
          </p>
        </div>

        <div className="terms-item">
          <h4>12. Disputes</h4>
          <p>
            Disputes may be resolved through internal processes or arbitration depending on
            jurisdictional requirements.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsPage;
