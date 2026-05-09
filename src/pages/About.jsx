// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/about.css";

// import {
//   FiInfo,
//   FiShield,
//   FiUsers,
//   FiMail,
//   FiArrowLeft
// } from "react-icons/fi";

// const About = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="about-page">

//       {/* HEADER */}
//       <div className="about-header">

//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>

//         <h2>About Us</h2>

//         <p>
//           Learn more about our mission, security, and platform values.
//         </p>

//       </div>

//       {/* CONTENT */}
//       <div className="about-card">

//         <div className="about-item">
//           <FiInfo />

//           <div>
//             <h4>Who We Are</h4>

//             <p>
//               We are a modern digital investment platform focused on delivering
//               seamless financial experiences with transparency and security.
//             </p>
//           </div>
//         </div>

//         <div className="about-item">
//           <FiShield />

//           <div>
//             <h4>Security</h4>

//             <p>
//               Your funds and data are protected with advanced encryption and
//               industry-standard security protocols.
//             </p>
//           </div>
//         </div>

//         <div className="about-item">
//           <FiUsers />

//           <div>
//             <h4>Our Mission</h4>

//             <p>
//               To empower users globally with accessible and profitable digital
//               investment opportunities.
//             </p>
//           </div>
//         </div>

//         <div className="about-item">
//           <FiMail />

//           <div>
//             <h4>Contact Us</h4>

//             <p>Email: support@yourplatform.com</p>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default About;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/about.css";

import {
  FiInfo,
  FiShield,
  FiUsers,
  FiMail,
  FiArrowLeft,
  FiGlobe,
  FiCreditCard,
  FiCheckCircle,
  FiFileText,
  FiLock,
  FiTrendingUp
} from "react-icons/fi";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HEADER */}
      <div className="about-header">

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <h2>About Us</h2>

      </div>

      {/* MAIN INFO */}
      <div className="about-card">

        <div className="about-item">
          <FiInfo />

          <div>
            <h4>Who We Are</h4>

            <p>
              We are a modern digital investment platform focused on delivering
              seamless financial experiences with transparency and security.
            </p>
          </div>
        </div>

        <div className="about-item">
          <FiShield />

          <div>
            <h4>Security</h4>

            <p>
              Your funds and data are protected with advanced encryption and
              industry-standard security protocols.
            </p>
          </div>
        </div>

        <div className="about-item">
          <FiUsers />

          <div>
            <h4>Our Mission</h4>

            <p>
              To empower users globally with accessible and profitable digital
              investment opportunities.
            </p>
          </div>
        </div>

        <div className="about-item">
          <FiMail />

          <div>
            <h4>Contact Us</h4>

            <p>Email: support@yourplatform.com</p>
          </div>
        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div className="about-card">

        <div className="section-title">
          <h3>Why Choose Us</h3>
        </div>

        <div className="about-item">
          <FiShield />

          <div>
            <h4>Advanced Security</h4>

            <p>
              Your funds and personal information are protected with secure
              encrypted systems and modern infrastructure.
            </p>
          </div>
        </div>

        <div className="about-item">
          <FiTrendingUp />

          <div>
            <h4>Reliable Performance</h4>

            <p>
              We provide stable and seamless financial services with fast
              transaction processing.
            </p>
          </div>
        </div>

        <div className="about-item">
          <FiCheckCircle />

          <div>
            <h4>Trusted Experience</h4>

            <p>
              Thousands of users rely on our platform daily for secure
              investment and account management.
            </p>
          </div>
        </div>

      </div>

      {/* COMPANY STATS */}
      <div className="about-stats">

        <div className="stat-box">
          <h3>50K+</h3>
          <p>Active Users</p>
        </div>

        <div className="stat-box">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>

        <div className="stat-box">
          <h3>24/7</h3>
          <p>Support</p>
        </div>

      </div>

      {/* SUPPORTED REGIONS */}
      <div className="about-card">

        <div className="section-title">
          <h3>Supported Regions</h3>
        </div>

        <div className="about-item">
          <FiGlobe />

          <div>
            <h4>Worldwide Access</h4>

            <p>
              Our platform supports users across multiple countries with
              reliable and secure accessibility.
            </p>
          </div>
        </div>

      </div>

      {/* PAYMENT METHODS */}
      <div className="about-card">

        <div className="section-title">
          <h3>Payment Methods</h3>
        </div>

        <div className="about-item">
          <FiCreditCard />

          <div>
            <h4>Flexible Payments</h4>

            <p>
              We support bank transfers, cryptocurrency payments, and secure
              digital payment methods for fast transactions.
            </p>
          </div>
        </div>

      </div>

      {/* TRUST BADGES */}
      <div className="trust-badges">

        <div className="badge">
          <FiShield />
          <span>Secure Platform</span>
        </div>

        <div className="badge">
          <FiLock />
          <span>Encrypted Data</span>
        </div>

        <div className="badge">
          <FiCheckCircle />
          <span>Trusted Service</span>
        </div>

      </div>

      {/* LEGAL */}
      <div className="about-card">

        <div className="section-title">
          <h3>Legal</h3>
        </div>

        <div className="legal-links">

          <button>
            <FiFileText />
            Terms & Conditions
          </button>

          <button>
            <FiLock />
            Privacy Policy
          </button>

        </div>

      </div>

    </div>
  );
};

export default About;
