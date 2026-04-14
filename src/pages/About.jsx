// About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/about.css";
import { FiInfo, FiShield, FiUsers, FiMail, FiArrowLeft } from "react-icons/fi";

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

      {/* CARD */}
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
    </div>
  );
};

export default About;
