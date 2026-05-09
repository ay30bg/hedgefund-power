import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/faq.css";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

const faqData = [
  {
    question: "How do I start investing?",
    answer:
      "Getting started is simple and beginner-friendly. First, create your account using your email address and secure password. After completing your registration, you can fund your wallet using any of the supported payment methods available on the platform. Once your balance is updated, you can browse through the available investment plans, review their expected returns, durations, and requirements, then choose the plan that best fits your financial goals. Your earnings and investment activities can be monitored directly from your dashboard in real time."
  },

  {
    question: "Is my money safe on this platform?",
    answer:
      "Yes. Security is one of our highest priorities. We use advanced encryption technologies, secure authentication systems, protected servers, and modern infrastructure to safeguard user accounts and sensitive information. In addition, we continuously monitor platform activity to help prevent unauthorized access, suspicious transactions, and fraudulent behavior. While no online system can guarantee absolute security, we implement multiple layers of protection designed to keep your funds and personal data as secure as possible."
  },

  {
    question: "How long do withdrawals take?",
    answer:
      "Withdrawal requests are usually processed within a few minutes to a few hours depending on the selected payment method, blockchain network traffic, verification requirements, and overall transaction volume. In rare situations such as network congestion, maintenance, or additional security checks, processing may take longer than expected. Users can monitor the status of their withdrawal directly from the transaction history section of their dashboard."
  },

  {
    question: "What is the minimum investment amount?",
    answer:
      "The minimum investment amount depends on the investment plan you select. Our platform is designed to be accessible to both beginners and experienced investors, which is why we offer flexible plans with affordable entry levels. Before investing, users are encouraged to carefully review each plan’s duration, expected returns, risk level, and minimum funding requirement to ensure it aligns with their financial goals and preferences."
  },

  {
    question: "Can I invite friends and earn rewards?",
    answer:
      "Yes. Our referral program allows users to earn commissions and bonuses by inviting others to join the platform using their unique referral link. Once your invited users successfully register and complete qualifying activities such as deposits or investments, you may receive referral rewards automatically. Referral earnings and performance statistics can be tracked directly from your referral dashboard."
  },

  {
    question: "What payment methods are supported?",
    answer:
      "We support multiple payment methods to provide users with convenient and flexible funding options. Depending on your region, available methods may include cryptocurrency payments, bank transfers, digital wallets, and other secure online payment solutions. Supported payment options may continue to expand over time as we improve accessibility for global users."
  },

  {
    question: "Can I access the platform from any country?",
    answer:
      "Our platform is accessible in many countries around the world. However, certain features, payment methods, or services may vary depending on regional regulations, local financial laws, or network restrictions. Users are responsible for ensuring that the use of our services complies with the laws and regulations applicable in their country or jurisdiction."
  },

  {
    question: "How are profits calculated?",
    answer:
      "Profits are calculated based on the specific investment plan selected by the user. Each plan may have different return percentages, durations, and earning structures. Estimated profits are typically displayed before confirming an investment so users can clearly understand potential returns. Actual earnings may vary depending on market conditions, platform performance, and investment terms."
  },

  {
    question: "Do I need verification before withdrawing?",
    answer:
      "In some situations, account verification may be required before withdrawals can be processed. Verification procedures help improve platform security, prevent fraud, and ensure compliance with financial safety standards. Users may be asked to verify their identity, confirm account ownership, or complete additional security checks before accessing certain features or large transactions."
  },

  {
    question: "What happens when my investment plan ends?",
    answer:
      "Once your investment duration is completed, the invested capital and any generated profits are credited according to the terms of your selected plan. Depending on platform settings and plan type, funds may either be returned directly to your wallet balance or made available for withdrawal or reinvestment. Users can review completed investments from their investment history dashboard."
  },

  {
    question: "Can I cancel an active investment?",
    answer:
      "Investment cancellation policies may vary depending on the specific investment plan selected. Some plans may allow early termination with certain conditions or penalties, while others may remain locked until the investment duration is completed. Users are encouraged to carefully review all plan details before confirming any investment activity."
  },

  {
    question: "How do I contact customer support?",
    answer:
      "Users can contact customer support through the available support channels provided on the platform, such as live chat, support email, or help center services. Our support team aims to respond to inquiries as quickly as possible and assist users with account issues, transactions, technical difficulties, and general platform questions."
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
