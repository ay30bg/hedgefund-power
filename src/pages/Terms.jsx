// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/terms.css";

// import {
//   FiArrowLeft,
//   FiAlertTriangle,
//   FiDollarSign,
//   FiLock,
//   FiRefreshCw,
//   FiFileText,
//   FiUsers
// } from "react-icons/fi";

// const TermsPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="terms-page">

//       {/* HEADER */}
//       <div className="terms-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>
//         <h2>Terms & Conditions</h2>
//       </div>

//       {/* CONTENT CARD */}
//       <div className="terms-card">

//         <div className="terms-item">
//           <FiFileText />
//           <div>
//             <h4>Platform Overview</h4>
//             <p>
//               This platform provides access to a structured digital participation
//               system with tier-based engagement and automated processing cycles.
//             </p>
//           </div>
//         </div>

//         <div className="terms-item">
//           <FiAlertTriangle />
//           <div>
//             <h4>Risk Disclosure</h4>
//             <p>
//               Participation carries financial risk. No profit, returns, or capital
//               preservation is guaranteed. Users may lose all funds.
//             </p>
//           </div>
//         </div>

//         <div className="terms-item">
//           <FiDollarSign />
//           <div>
//             <h4>Funds & Payments</h4>
//             <p>
//               All funds are pooled for operational use. Withdrawals may be delayed
//               due to system load, verification, or liquidity conditions.
//             </p>
//           </div>
//         </div>

//         <div className="terms-item">
//           <FiLock />
//           <div>
//             <h4>No Guarantees</h4>
//             <p>
//               The platform does not function as a bank or financial institution and
//               offers no insurance or government-backed protection.
//             </p>
//           </div>
//         </div>

//         <div className="terms-item">
//           <FiRefreshCw />
//           <div>
//             <h4>System Changes</h4>
//             <p>
//               Rules, fees, and system logic may change at any time without prior
//               notice to maintain stability and scalability.
//             </p>
//           </div>
//         </div>

//         <div className="terms-item">
//           <FiUsers />
//           <div>
//             <h4>User Responsibility</h4>
//             <p>
//               All participation is voluntary. Users are fully responsible for their
//               actions and financial decisions on the platform.
//             </p>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default TermsPage;

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
  FiUsers,
  FiDatabase,
  FiClock,
  FiTrendingDown
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

      {/* CONTENT */}
      <div className="terms-card">

        <div className="terms-item">
          <FiFileText />
          <div>
            <h4>1. Platform Definition</h4>
            <p>
              This platform operates as a digital participation system that
              provides users access to structured engagement cycles, automated
              allocation processes, and tier-based system interactions.
              All features are system-generated and may vary based on network
              conditions and operational demand.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiTrendingDown />
          <div>
            <h4>2. Financial Risk Warning</h4>
            <p>
              Participation involves extremely high financial risk. You may
              lose part or all of your funds. There is no guarantee of profit,
              yield, or capital preservation under any circumstance.
              Past performance or displayed metrics do not guarantee future outcomes.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiDollarSign />
          <div>
            <h4>3. Funds Handling & Structure</h4>
            <p>
              All user funds are pooled within a centralized operational system
              for liquidity balancing and platform functionality. Funds are not
              held in segregated or insured accounts and should not be treated
              as traditional deposits or savings.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiClock />
          <div>
            <h4>4. Withdrawals & Processing Time</h4>
            <p>
              Withdrawals are subject to system validation, queue processing,
              liquidity availability, and verification checks. Processing time
              may vary significantly depending on system demand and operational load.
              Delays are possible at any time without prior notice.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiDatabase />
          <div>
            <h4>5. System Operations</h4>
            <p>
              The platform operates using automated logic, scheduling engines,
              and adaptive resource allocation systems. These systems may adjust,
              pause, or modify participation cycles to maintain platform stability
              and scalability.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiRefreshCw />
          <div>
            <h4>6. System Changes & Updates</h4>
            <p>
              The platform reserves the right to modify rules, algorithms,
              reward structures, fees, and participation conditions at any time
              without prior notice. Continued use of the platform constitutes
              acceptance of all changes.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiLock />
          <div>
            <h4>7. No Financial Guarantees</h4>
            <p>
              The platform is not a bank, brokerage, or regulated financial institution.
              No deposits are insured, guaranteed, or protected by any government entity.
              All activity is speculative and user-driven.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiUsers />
          <div>
            <h4>8. Tier System & Access Levels</h4>
            <p>
              Users may be assigned to tiers based on system-defined metrics
              including activity, consistency, and participation history.
              Tier benefits are dynamic and may change, be removed, or be restricted
              at any time.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiAlertTriangle />
          <div>
            <h4>9. Fees & Deductions</h4>
            <p>
              The platform may apply operational, maintenance, processing,
              or participation fees. These fees are automatically deducted,
              are non-refundable, and may vary based on system conditions.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiTrendingDown />
          <div>
            <h4>10. Data, Metrics & Projections</h4>
            <p>
              All dashboards, earnings projections, analytics, and performance
              indicators are system-generated estimates. They are not financial
              advice and should not be interpreted as guaranteed outcomes.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiAlertTriangle />
          <div>
            <h4>11. User Responsibility</h4>
            <p>
              All participation is voluntary. Users are solely responsible for
              their financial decisions, actions, and outcomes while using the platform.
              You acknowledge full understanding of the speculative nature of the system.
            </p>
          </div>
        </div>

        <div className="terms-item">
          <FiRefreshCw />
          <div>
            <h4>12. Disputes & Arbitration</h4>
            <p>
              Any disputes arising from platform usage will be handled through
              internal resolution systems or arbitration frameworks where applicable
              under jurisdictional regulations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsPage;
