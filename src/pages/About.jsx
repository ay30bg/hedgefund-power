// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/about.css";

// import {
//   FiInfo,
//   FiShield,
//   FiUsers,
//   FiMail,
//   FiArrowLeft,
//   FiMessageSquare,
//   FiX
// } from "react-icons/fi";

// const About = () => {
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       from: "ai",
//       text: "Hi 👋 I’m your support assistant. How can I help you today?"
//     }
//   ]);
//   const [input, setInput] = useState("");

//   const openSupport = () => setOpen(true);
//   const closeSupport = () => setOpen(false);

//   // Simple AI response logic (replace later with real AI API)
//   const getAIResponse = (msg) => {
//     const text = msg.toLowerCase();

//     if (text.includes("withdraw")) {
//       return "Withdrawals are processed within 5–30 minutes depending on network load.";
//     }
//     if (text.includes("deposit")) {
//       return "Deposits are instant once confirmed on the blockchain/network.";
//     }
//     if (text.includes("referral")) {
//       return "You earn 5% commission on every deposit your referrals make.";
//     }
//     if (text.includes("security")) {
//       return "Your data and funds are secured with encrypted systems and protected infrastructure.";
//     }

//     return "I’m here to help 👍 Can you give me more details so I can assist you better?";
//   };

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg = { from: "user", text: input };

//     const aiMsg = {
//       from: "ai",
//       text: getAIResponse(input)
//     };

//     setMessages((prev) => [...prev, userMsg, aiMsg]);
//     setInput("");
//   };

//   return (
//     <div className="about-page">

//       {/* HEADER */}
//       <div className="about-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FiArrowLeft />
//         </button>
//         <h2>About Us</h2>
//       </div>

//       {/* CONTENT */}
//       <div className="about-card">

//         <div className="about-item">
//           <FiInfo />
//           <div>
//             <h4>Who We Are</h4>
//             <p>
//               We are a modern digital investment platform focused on delivering
//               seamless financial experiences with transparency and security.
//             </p>
//           </div>
//         </div>

//         <div className="about-item">
//           <FiShield />
//           <div>
//             <h4>Security</h4>
//             <p>
//               Your funds and data are protected with advanced encryption and
//               industry-standard security protocols.
//             </p>
//           </div>
//         </div>

//         <div className="about-item">
//           <FiUsers />
//           <div>
//             <h4>Our Mission</h4>
//             <p>
//               To empower users globally with accessible and profitable digital
//               investment opportunities.
//             </p>
//           </div>
//         </div>

//         <div className="about-item">
//           <FiMail />
//           <div>
//             <h4>Contact Us</h4>
//             <p>Email: support@yourplatform.com</p>
//           </div>
//         </div>

//       </div>

//       {/* FLOATING CHAT BUTTON */}
//       {!open && (
//         <button className="support-fab" onClick={openSupport}>
//           <FiMessageSquare />
//         </button>
//       )}

//       {/* CHAT WINDOW */}
//       {open && (
//         <div className="chat-bubble">

//           {/* HEADER */}
//           <div className="chat-header">
//             <span>Support Assistant</span>
//             <button onClick={closeSupport}>
//               <FiX />
//             </button>
//           </div>

//           {/* MESSAGES */}
//           <div className="chat-body">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`chat-msg ${msg.from === "user" ? "user" : "ai"}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* INPUT */}
//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default About;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/about.css";

import {
  FiInfo,
  FiShield,
  FiUsers,
  FiMail,
  FiArrowLeft
} from "react-icons/fi";

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

        <p>
          Learn more about our mission, security, and platform values.
        </p>

      </div>

      {/* CONTENT */}
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
