import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/faq.css";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

const faqData = [
  {
    question: "How do I start investing?",
    answer:
      "Simply create an account, fund your wallet, and choose from available investment plans."
  },
  {
    question: "Is my money safe?",
    answer:
      "Yes, we use advanced encryption and secure systems to protect all user funds and data."
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "Withdrawals are typically processed within a few minutes to a few hours depending on network conditions."
  },
  {
    question: "What is the minimum investment?",
    answer:
      "The minimum investment depends on the plan you choose, but it is designed to be affordable for all users."
  },
  {
    question: "Can I invite friends?",
    answer:
      "Yes! You can earn rewards by inviting friends through your referral link."
  }
];

const FAQ = () => {
  const navigate = useNavigate();
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

      {/* FAQ CARD */}
      <div className="faq-card">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              {activeIndex === index ? (
                <FiChevronUp className="faq-icon" />
              ) : (
                <FiChevronDown className="faq-icon" />
              )}
            </div>

            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
