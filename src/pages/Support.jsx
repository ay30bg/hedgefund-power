import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/support.css";

import {
  FiArrowLeft,
  FiSend,
  FiHeadphones,
  FiClock,
  FiShield,
  FiCheckCircle
} from "react-icons/fi";

const Support = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hello 👋 Welcome to Support Center. How can we help you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  // AI AUTO REPLY
  const getAIResponse = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("withdraw")) {
      return "Withdrawals are usually completed within 5–30 minutes depending on network congestion.";
    }

    if (text.includes("deposit")) {
      return "Deposits reflect instantly after successful blockchain confirmation.";
    }

    if (text.includes("referral")) {
      return "You receive referral commissions whenever your invited users make deposits.";
    }

    if (text.includes("account")) {
      return "You can manage your account settings inside the Profile section.";
    }

    if (text.includes("security")) {
      return "Your account is protected with encrypted security systems and secure authentication.";
    }

    return "Thanks for your message 👍 Our support team is always ready to assist you.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      from: "user",
      text: input
    };

    const aiMessage = {
      from: "ai",
      text: getAIResponse(input)
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);

    setInput("");
  };

  return (
    <div className="support-page">

      {/* HEADER */}
      <div className="support-header">

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <div>
          <h2>Support Center</h2>
          <p>Fast & reliable customer assistance</p>
        </div>

      </div>

      {/* SUPPORT INFO */}
      <div className="support-card">

        <div className="support-item">
          <FiHeadphones />
          <div>
            <h4>24/7 Live Support</h4>
            <p>
              Our support team is available anytime to assist you with
              transactions, accounts, and platform issues.
            </p>
          </div>
        </div>

        <div className="support-item">
          <FiClock />
          <div>
            <h4>Fast Response</h4>
            <p>
              Most inquiries are answered within a few minutes during active
              support hours.
            </p>
          </div>
        </div>

        <div className="support-item">
          <FiShield />
          <div>
            <h4>Secure Assistance</h4>
            <p>
              Your conversations and account details remain fully protected and
              confidential.
            </p>
          </div>
        </div>

        <div className="support-item">
          <FiCheckCircle />
          <div>
            <h4>Trusted Service</h4>
            <p>
              We are committed to providing transparent and professional support
              for every user.
            </p>
          </div>
        </div>

      </div>

      {/* CHAT BOX */}
      <div className="support-chat">

        {/* CHAT HEADER */}
        <div className="chat-top">
          <div className="chat-avatar">
            <FiHeadphones />
          </div>

          <div>
            <h4>Support Assistant</h4>
            <span>Online now</span>
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="chat-messages">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.from === "user" ? "user" : "ai"
              }`}
            >
              {msg.text}
            </div>
          ))}

          <div ref={messagesEndRef} />

        </div>

        {/* CHAT INPUT */}
        <div className="chat-input-box">

          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={sendMessage}>
            <FiSend />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Support;
