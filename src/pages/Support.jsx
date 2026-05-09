// src/pages/SupportChatPage.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  FiArrowLeft,
  FiSend,
  FiPaperclip,
  FiMoreVertical,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/support.css";

const SupportChatPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Hello 👋 Welcome to Support.",
      time: "09:10 AM",
    },
    {
      id: 2,
      sender: "support",
      text: "How can we help you today?",
      time: "09:11 AM",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // fake support reply
    setTimeout(() => {
      const supportReply = {
        id: Date.now() + 1,
        sender: "support",
        text: "Thanks for contacting support. We’ll respond shortly.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, supportReply]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="support-chat-page">
      {/* HEADER */}
      <div className="support-chat-header">
        <div className="support-chat-left">
          <button
            className="support-back-btn"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
          </button>

          <div className="support-avatar">
            S
          </div>

          <div>
            <h3>Support Team</h3>
            <p>Typically replies in a few minutes</p>
          </div>
        </div>

        <button className="support-menu-btn">
          <FiMoreVertical />
        </button>
      </div>

      {/* CHAT BODY */}
      <div className="support-chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "user"
                ? "user-message"
                : "support-message"
            }`}
          >
            <div className="chat-bubble">
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="support-chat-input-area">
        <button className="attachment-btn">
          <FiPaperclip />
        </button>

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          className="send-btn"
          onClick={handleSend}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default SupportChatPage;
