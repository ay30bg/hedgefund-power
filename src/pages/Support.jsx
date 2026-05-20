// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/support.css";

// import {
//     FiArrowLeft,
//     FiSend,
//     FiHeadphones
// } from "react-icons/fi";

// import { RiVerifiedBadgeFill } from "react-icons/ri";

// const Support = () => {
//     const navigate = useNavigate();

//     const [messages, setMessages] = useState([
//         {
//             from: "ai",
//             text: "Hello 👋 Welcome to Support Center. How can we help you today?"
//         }
//     ]);

//     const [input, setInput] = useState("");

//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({
//             behavior: "smooth"
//         });
//     }, [messages]);

//     const getAIResponse = (msg) => {
//         const text = msg.toLowerCase();

//         if (text.includes("withdraw")) {
//             return "Withdrawals are usually completed within 5–30 minutes.";
//         }

//         if (text.includes("deposit")) {
//             return "Deposits reflect instantly after confirmation.";
//         }

//         if (text.includes("referral")) {
//             return "Referral rewards are added automatically.";
//         }

//         return "Thanks for your message 👍 Our support team will assist you shortly.";
//     };

//     const sendMessage = () => {
//         if (!input.trim()) return;

//         const userMessage = {
//             from: "user",
//             text: input
//         };

//         const aiMessage = {
//             from: "ai",
//             text: getAIResponse(input)
//         };

//         setMessages((prev) => [...prev, userMessage, aiMessage]);

//         setInput("");
//     };

//     return (
//         <div className="support-page">

//             <div className="support-chat">

//                 {/* HEADER */}
//                 <div className="chat-top">

//                     <div className="chat-top-left">

//                         <button
//                             className="back-btn back-button"
//                             onClick={() => navigate(-1)}
//                         >
//                             <FiArrowLeft />
//                         </button>

//                     </div>
//                     <div className="chat-top-right">
//                         <div className="chat-avatar">
//                             <FiHeadphones />
//                         </div>

//                         <div className="chat-user-info">
//                             <div className="support-name">
//                                <h4>Support Assistant</h4>

//                                <RiVerifiedBadgeFill className="verified-badge" />
//                            </div>
                            
//                             <span>Online now</span>
//                         </div>
//                     </div>




//                 </div>

//                 {/* CHAT BODY */}
//                 <div className="chat-messages">

//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`chat-message ${msg.from === "user" ? "user" : "ai"
//                                 }`}
//                         >
//                             {msg.text}
//                         </div>
//                     ))}

//                     <div ref={messagesEndRef} />

//                 </div>

//                 {/* INPUT */}
//                 <div className="chat-input-box">

//                     <input
//                         type="text"
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) =>
//                             e.key === "Enter" && sendMessage()
//                         }
//                     />

//                     <button onClick={sendMessage}>
//                         <FiSend />
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Support;

import React, {
    useState,
    useRef,
    useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../styles/support.css";

import {
    FiArrowLeft,
    FiSend,
    FiHeadphones
} from "react-icons/fi";

import { RiVerifiedBadgeFill } from "react-icons/ri";

const API_URL =
    process.env.REACT_APP_API_URL;

const Support = () => {
    const navigate = useNavigate();

    const [messages, setMessages] =
        useState([]);

    const [input, setInput] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const messagesEndRef =
        useRef(null);

    // =========================
    // AUTO SCROLL
    // =========================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    // =========================
    // FETCH MESSAGES
    // =========================

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            const res = await axios.get(
                `${API_URL}/api/support/messages`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.length === 0) {
                setMessages([
                    {
                        sender: "admin",
                        message:
                            "Hello 👋 Welcome to Support Center. How can we help you today?"
                    }
                ]);
            } else {
                setMessages(
                    res.data
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // SEND MESSAGE
    // =========================

    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            const res = await axios.post(
                `${API_URL}/api/support/send`,
                {
                    message: input
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessages((prev) => [
                ...prev,
                res.data
            ]);

            setInput("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="support-page">

            <div className="support-chat">

                {/* HEADER */}

                <div className="chat-top">

                    <div className="chat-top-left">

                        <button
                            className="back-btn back-button"
                            onClick={() =>
                                navigate(-1)
                            }
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

                                <h4>
                                    Support Assistant
                                </h4>

                                <RiVerifiedBadgeFill className="verified-badge" />

                            </div>

                            <span>
                                Online now
                            </span>

                        </div>

                    </div>

                </div>

                {/* CHAT BODY */}

                <div className="chat-messages">

                    {loading ? (
                        <div className="loading-chat">
                            Loading...
                        </div>
                    ) : (
                        messages.map(
                            (msg, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${
                                        msg.sender ===
                                        "user"
                                            ? "user"
                                            : "ai"
                                    }`}
                                >
                                    {
                                        msg.message
                                    }
                                </div>
                            )
                        )
                    )}

                    <div
                        ref={
                            messagesEndRef
                        }
                    />

                </div>

                {/* INPUT */}

                <div className="chat-input-box">

                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) =>
                            setInput(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) =>
                            e.key ===
                                "Enter" &&
                            sendMessage()
                        }
                    />

                    <button
                        onClick={
                            sendMessage
                        }
                    >
                        <FiSend />
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Support;
