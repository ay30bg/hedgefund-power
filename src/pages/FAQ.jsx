import React, { useState } from "react";
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
        "Create an account, fund your wallet using any supported payment method, and choose an investment plan that matches your financial goals."
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Withdrawals are usually processed within a few minutes to a few hours depending on network traffic and verification requirements."
    }
  ],

  Account: [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password using the 'Forgot Password' option on the login page."
    },
    {
      question: "Can I have multiple accounts?",
      answer:
        "Users are generally expected to maintain one verified account for security and compliance purposes."
    }
  ],

  Investment: [
    {
      question: "What is the minimum investment?",
      answer:
        "Minimum investment requirements depend on the selected investment plan."
    },
    {
      question: "Can I cancel an active investment?",
      answer:
        "Cancellation policies vary depending on the plan type and investment duration."
    }
  ],

  Payments: [
    {
      question: "What payment methods are supported?",
      answer:
        "We support crypto payments, bank transfers, and secure digital payment methods."
    },
    {
      question: "Why is my deposit delayed?",
      answer:
        "Delays may occur because of blockchain confirmations, banking delays, or payment provider processing."
    }
  ],

  Security: [
    {
      question: "Is my account secure?",
      answer:
        "Yes. We use encrypted systems, secure authentication, and infrastructure protection to secure user accounts."
    },
    {
      question: "Do I need identity verification?",
      answer:
        "Verification may sometimes be required for withdrawals or account protection purposes."
    }
  ]
};

const FAQ = () => {
  const navigate = useNavigate();

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
