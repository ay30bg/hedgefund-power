import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/faq.css";

import {
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiHelpCircle,
  FiMessageCircle
} from "react-icons/fi";

const faqCategories = [
  "Popular",
  "Account",
  "Investment",
  "Payments",
  "Security"
];

const faqData = {
  Popular: [
    {
      question: "How do I start investing?",
      answer:
        "To start investing, create an account, log in, fund your wallet using any supported payment method, then select an investment plan that matches your financial goals. Once confirmed, your investment starts immediately and can be tracked from your dashboard."
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Withdrawals are typically processed within a few minutes to a few hours depending on network traffic, payment method, and verification status. In rare cases, delays may occur during peak periods."
    },
    {
      question: "Is there a minimum deposit?",
      answer:
        "Yes, each investment plan has a minimum deposit requirement to ensure structured participation across all users."
    },
    {
      question: "Can I use the platform on mobile?",
      answer:
        "Yes, the platform is fully optimized for mobile, tablet, and desktop devices, allowing you to manage everything on the go."
    },
    {
      question: "Do I need experience to invest?",
      answer:
        "No experience is required. The platform is designed for both beginners and advanced users with simple and guided investment options."
    }
  ],

  Account: [
    {
      question: "How do I reset my password?",
      answer:
        "Use the 'Forgot Password' option on the login page. A secure reset link will be sent to your email to create a new password."
    },
    {
      question: "Can I update my account details?",
      answer:
        "Yes, you can update basic information such as your name and profile details from your account settings page."
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes, you can request account deletion through support. Some data may be retained for legal and security compliance."
    },
    {
      question: "What if I forget my registered email?",
      answer:
        "You will need to contact support for identity verification and account recovery assistance."
    },
    {
      question: "Why is my account restricted?",
      answer:
        "Accounts may be restricted due to suspicious activity, incomplete verification, or violation of platform policies."
    }
  ],

  Investment: [
    {
      question: "What is the minimum investment?",
      answer:
        "The minimum investment depends on the plan selected. Each plan is designed to accommodate different budget levels."
    },
    {
      question: "Can I withdraw before my investment ends?",
      answer:
        "Some plans allow early withdrawal, while others require completion before funds can be accessed."
    },
    {
      question: "How are profits calculated?",
      answer:
        "Profits are based on your investment amount, plan rate, and duration. Returns are automatically credited at the end of the cycle."
    },
    {
      question: "Can I reinvest my earnings?",
      answer:
        "Yes, you can reinvest your earnings into new or existing plans to increase your returns."
    },
    {
      question: "Do investments renew automatically?",
      answer:
        "Some plans support auto-renewal while others require manual reinvestment."
    }
  ],

  Payments: [
    {
      question: "What payment methods are supported?",
      answer:
        "We support bank transfers, cryptocurrencies, and selected digital payment systems depending on your region."
    },
    {
      question: "Why is my deposit not showing?",
      answer:
        "Deposits may take time due to network confirmations or payment processing delays. Contact support if it exceeds expected time."
    },
    {
      question: "Are there transaction fees?",
      answer:
        "Some payment methods include small processing or network fees, which are shown before confirmation."
    },
    {
      question: "Can I cancel a deposit?",
      answer:
        "Once a transaction is initiated, especially on blockchain networks, it usually cannot be reversed."
    },
    {
      question: "What if I send the wrong amount?",
      answer:
        "Incorrect amounts may still process depending on system rules, but you should contact support immediately for assistance."
    }
  ],

  Security: [
    {
      question: "Is my account secure?",
      answer:
        "Yes. We use advanced encryption, secure authentication, and monitoring systems to protect user accounts and data."
    },
    {
      question: "How do you protect user data?",
      answer:
        "All user data is encrypted and stored securely using industry-standard security protocols to prevent unauthorized access."
    },
    {
      question: "Do I need identity verification?",
      answer:
        "Verification may be required for withdrawals, security checks, or regulatory compliance."
    },
    {
      question: "What should I do if my account is hacked?",
      answer:
        "Immediately contact support, reset your password, and secure your email account. Our team will assist you in recovering your account."
    },
    {
      question: "Do you share my personal information?",
      answer:
        "No. We do not sell or share your personal data. Information is only used to provide and improve platform services."
    }
  ]
};

const FAQ = () => {
  const navigate = useNavigate();

   useEffect(() => {
    document.title = "FAQs | Hedgefund Power";
  }, []);

  const [activeCategory, setActiveCategory] = useState("Popular");
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">

      {/* HEADER */}
      <div className="faq-header">

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <h2>FAQs</h2>

      </div>

      {/* CATEGORY TABS */}
      <div className="faq-tabs">

        {faqCategories.map((category) => (
          <button
            key={category}
            className={`faq-tab ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => {
              setActiveCategory(category);
              setActiveIndex(null);
            }}
          >
            {category}
          </button>
        ))}

      </div>

      {/* POPULAR SECTION */}
      <div className="popular-section">

        <div className="popular-title">
          <FiHelpCircle />
          <h3>{activeCategory} Questions</h3>
        </div>

      </div>

      {/* FAQ CARD */}
      <div className="faq-card">

        {faqData[activeCategory].map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
          >

            <div className="faq-question">

              <span>{faq.question}</span>

              {activeIndex === index ? (
                <FiChevronUp className="faq-icon" />
              ) : (
                <FiChevronDown className="faq-icon" />
              )}

            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}

          </div>
        ))}

      </div>

      {/* STILL NEED HELP */}
      <div className="help-section">

        <div className="help-icon">
          <FiMessageCircle />
        </div>

        <h3>Still Need Help?</h3>

        <p>
          Our support team is available to assist you with account issues,
          transactions, technical support, and general inquiries.
        </p>

        <button
          className="help-btn"
          onClick={() => navigate("/support")}
        >
          Contact Support
        </button>

      </div>

    </div>
  );
};

export default FAQ;
