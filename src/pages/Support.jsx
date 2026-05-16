import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/support.css";

import {
    FiArrowLeft,
    FiSend,
    FiHeadphones,
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

    const getAIResponse = (msg) => {
        const text = msg.toLowerCase();

        if (text.includes("withdraw")) {
            return "Withdrawals are usually completed within 5–30 minutes.";
        }

        if (text.includes("deposit")) {
            return "Deposits reflect instantly after confirmation.";
        }

        if (text.includes("referral")) {
            return "Referral rewards are added automatically.";
        }

        return "Thanks for your message 👍 Our support team will assist you shortly.";
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

            <div className="support-chat">

                {/* HEADER */}
                <div className="chat-top">

                    <div className="chat-top-left">

                        <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            <FiArrowLeft />
                        </button>

                    </div>
                    <div className="chat-top-right">
                        <div className="chat-avatar">
                            <FiHeadphones />
                        </div>

                        <div className="chat-user-info">
                            <div className="support-name">
                               <h4>Support Assistant</h4>

                               <FiCheckCircle className="verified-badge" />
                           </div>
                            
                            <span>Online now</span>
                        </div>
                    </div>




                </div>

                {/* CHAT BODY */}
                <div className="chat-messages">

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.from === "user" ? "user" : "ai"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}

                    <div ref={messagesEndRef} />

                </div>

                {/* INPUT */}
                <div className="chat-input-box">

                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && sendMessage()
                        }
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
