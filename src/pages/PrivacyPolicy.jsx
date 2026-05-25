import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/privacyPolicy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Privacy Policy | Hedgefund Power";
  }, []);


  return (
    <div className="privacy-page">

      {/* HEADER */}
      <div className="privacy-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <h2>Privacy Policy</h2>
      </div>

      {/* CONTENT */}
      <div className="privacy-card">

        <div className="privacy-item">
          <h4>1. Information We Collect</h4>
          <p>
            We may collect personal information including your name, email address,
            phone number, wallet details, transaction activity, IP address, device
            information, and usage data when you access or interact with the platform.
          </p>
        </div>

        <div className="privacy-item">
          <h4>2. How Your Information Is Used</h4>
          <p>
            Your information may be used to provide platform access, process
            transactions, improve system performance, prevent fraud, verify
            identity, monitor activity, and enhance overall user experience.
          </p>
        </div>

        <div className="privacy-item">
          <h4>3. Data Protection</h4>
          <p>
            We implement encryption, secure infrastructure, and internal security
            measures designed to protect user data from unauthorized access,
            misuse, disclosure, or alteration.
          </p>
        </div>

        <div className="privacy-item">
          <h4>4. Financial Information</h4>
          <p>
            Transaction records and payment-related information may be stored for
            operational, verification, security, and compliance purposes. We do
            not guarantee absolute protection against all external threats.
          </p>
        </div>

        <div className="privacy-item">
          <h4>5. Cookies & Tracking</h4>
          <p>
            The platform may use cookies, analytics tools, and tracking technologies
            to improve functionality, analyze performance, personalize content,
            and enhance user interaction.
          </p>
        </div>

        <div className="privacy-item">
          <h4>6. Third-Party Services</h4>
          <p>
            Certain services may rely on third-party providers including payment
            processors, analytics platforms, cloud infrastructure, and verification
            systems. These providers may process data according to their own policies.
          </p>
        </div>

        <div className="privacy-item">
          <h4>7. Data Sharing</h4>
          <p>
            We do not sell personal information to third parties. However,
            information may be disclosed where required for operational purposes,
            fraud prevention, legal compliance, or security investigations.
          </p>
        </div>

        <div className="privacy-item">
          <h4>8. Account Security</h4>
          <p>
            Users are responsible for maintaining the confidentiality of their
            login credentials and account access. Any activity performed under
            your account may be treated as authorized activity.
          </p>
        </div>

        <div className="privacy-item">
          <h4>9. Data Retention</h4>
          <p>
            User information may be retained for operational, analytical,
            compliance, security, and dispute-resolution purposes for a period
            determined by internal policies or applicable regulations.
          </p>
        </div>

        <div className="privacy-item">
          <h4>10. Policy Updates</h4>
          <p>
            This Privacy Policy may be updated or modified at any time without
            prior notice. Continued use of the platform constitutes acceptance
            of any revised terms.
          </p>
        </div>

        <div className="privacy-item">
          <h4>11. User Consent</h4>
          <p>
            By using the platform, you consent to the collection, storage,
            processing, and use of your information as described in this policy.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
