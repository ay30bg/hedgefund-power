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
                            "Hello 👋 Welcome to Support Center. How can we help you today?",
                        createdAt:
                            new Date()
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

    // =========================
    // FORMAT DATE LABEL
    // =========================

    const formatDateLabel = (
        date
    ) => {
        const today =
            new Date();

        const yesterday =
            new Date();

        yesterday.setDate(
            today.getDate() - 1
        );

        if (
            date.toDateString() ===
            today.toDateString()
        ) {
            return "Today";
        }

        if (
            date.toDateString() ===
            yesterday.toDateString()
        ) {
            return "Yesterday";
        }

        return date.toLocaleDateString(
            [],
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    };

    return (
        <div className="support-page">

            <div className="support-chat">

                {/* ================= HEADER ================= */}

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

                {/* ================= CHAT BODY ================= */}

                <div className="chat-messages">
{loading ? (

    <div className="loading-state">

        <div className="loading-icon">
            💬
        </div>

        <p>
            Loading messages...
        </p>

    </div>

) : (

                        messages.map(
                            (
                                msg,
                                index
                            ) => {

                                // =========================
                                // SAFE DATE
                                // =========================

                                const hasValidDate =
                                    msg.createdAt &&
                                    !isNaN(
                                        new Date(
                                            msg.createdAt
                                        ).getTime()
                                    );

                                const messageDate =
                                    hasValidDate
                                        ? new Date(
                                              msg.createdAt
                                          )
                                        : null;

                                const currentDate =
                                    messageDate
                                        ? messageDate.toDateString()
                                        : "No Date";

                                const previousDate =
                                    index > 0 &&
                                    messages[
                                        index - 1
                                    ].createdAt
                                        ? new Date(
                                              messages[
                                                  index - 1
                                              ].createdAt
                                          ).toDateString()
                                        : null;

                                const showDate =
                                    currentDate !==
                                    previousDate;

                                const time =
                                    messageDate
                                        ? messageDate.toLocaleTimeString(
                                              [],
                                              {
                                                  hour: "2-digit",
                                                  minute: "2-digit"
                                              }
                                          )
                                        : "";

                                return (
                                    <React.Fragment
                                        key={
                                            index
                                        }
                                    >

                                        {/* DATE */}

                                        {showDate &&
                                            messageDate && (
                                                <div className="chat-date">
                                                    {formatDateLabel(
                                                        messageDate
                                                    )}
                                                </div>
                                            )}

                                        {/* MESSAGE */}

                                        <div
                                            className={`chat-message ${
                                                msg.sender ===
                                                "user"
                                                    ? "user"
                                                    : "ai"
                                            }`}
                                        >

                                            <div className="message-text">
                                                {
                                                    msg.message
                                                }
                                            </div>

                                            {time && (
                                                <div
                                                    className={`message-time ${
                                                        msg.sender ===
                                                        "user"
                                                            ? "user-time"
                                                            : "ai-time"
                                                    }`}
                                                >
                                                    {
                                                        time
                                                    }
                                                </div>
                                            )}

                                        </div>

                                    </React.Fragment>
                                );
                            }
                        )

                    )}

                    <div
                        ref={
                            messagesEndRef
                        }
                    />

                </div>

                {/* ================= INPUT ================= */}

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

