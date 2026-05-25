import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/terms.css";

const TermsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  document.title = "Terms of Use | Hedgefund Power";
}, []);

  return (
    <div className="terms-page">

      {/* HEADER */}
      <div className="terms-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <h2>Terms of Use</h2>
      </div>

      {/* CONTENT */}
      <div className="terms-card">

        <div className="terms-item">
          <h4>PARTICIPATION AGREEMENT & SYSTEM TERMS</h4>

          <p>
            By proceeding with account creation and activation, you are entering
            a structured digital participation ecosystem designed to facilitate
            dynamic engagement within a liquidity-based reward environment.
            The platform provides users with access to automated participation
            cycles, tiered engagement pathways, and system-driven allocation
            mechanisms intended to distribute available resources across active
            participants.
          </p>

          <p>
            The system operates through adaptive scheduling and real-time
            balancing, allowing participants to engage with various earning
            cycles that are influenced by network activity, timing, and
            platform-wide participation levels. Users may benefit from
            structured access to different participation tiers, each offering
            varying levels of system interaction, feature availability,
            and cycle frequency.
          </p>

          <p>
            The platform is designed to optimize engagement flow through
            automated processing, queue-based participation distribution,
            and scalable resource allocation systems that adjust based on
            user activity and system demand.
          </p>
        </div>

        <div className="terms-item">
          <h4>Financial Risk Disclosure</h4>

          <p>
            Participation in this system carries significant financial risk.
            There is no guarantee of profit, stability, or capital preservation.
            You acknowledge that your financial outcome may vary widely
            depending on system conditions, participation levels, and external
            market or operational factors. In some cases, participants may
            experience partial or total loss of funds.
          </p>

          <p>
            The platform does not operate as a traditional banking or custodial
            institution, and therefore does not provide deposit insurance,
            government-backed guarantees, or conventional financial protections.
            Funds introduced into the system are integrated into a pooled
            operational structure and are not individually segregated or protected.
          </p>

          <p>
            Withdrawals may be subject to delays, processing queues,
            verification requirements, and system-wide liquidity constraints.
            These factors may affect the timing and availability of access
            to funds and are dependent on internal balancing requirements
            and network conditions.
          </p>

          <p>
            System performance may fluctuate due to infrastructure scaling,
            maintenance cycles, third-party service dependencies, and overall
            network demand. During such periods, certain features may be
            temporarily restricted or placed under review to ensure
            operational stability.
          </p>
        </div>

        <div className="terms-item">
          <h4>Participation Tiers & Operational Structure</h4>

          <p>
            The platform provides users with access to structured participation
            tiers, each of which may influence processing priority, system
            access levels, and engagement cycle availability. Tier assignment
            is determined by internal system metrics such as activity
            consistency, participation duration, and network interaction patterns.
          </p>

          <p>
            Advancement between tiers is not guaranteed and may be adjusted
            based on periodic system evaluations. Similarly, platform features
            associated with each tier may be modified, expanded, or restricted
            in response to operational requirements.
          </p>

          <p>
            Fees may be applied to various system interactions, including
            entry processing, participation activation, withdrawal handling,
            and system maintenance contributions. These fees are automatically
            deducted and are non-refundable under all circumstances.
          </p>

          <p>
            The platform may adjust its operational structure, participation
            rules, reward calculation methods, and system logic without prior
            notice. Such changes are implemented to maintain system stability,
            scalability, and long-term functionality.
          </p>
        </div>

        <div className="terms-item">
          <h4>User Responsibility & Acknowledgement</h4>

          <p>
            Users acknowledge that all dashboards, projections, and performance
            indicators displayed within the system are generated through
            internal computational models and should be considered
            informational estimates rather than guarantees of future outcomes.
          </p>

          <p>
            All participation is voluntary. By continuing, you confirm that
            you understand the speculative and variable nature of the system,
            and that you accept full responsibility for any financial decisions
            made within the platform.
          </p>

          <p>
            Disputes arising from participation will be handled through
            internal resolution processes or arbitration frameworks where
            applicable under jurisdictional guidelines.
          </p>

          <p>
            By proceeding beyond this point, you confirm that you have read,
            understood, and accepted all operational conditions, participation
            structures, system limitations, and risk disclosures contained
            within this agreement.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsPage;
