// import React, { useState } from "react";
// import "../styles/forgotPassword.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       alert("Please enter your email");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: email.toLowerCase().trim()
//           })
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Request failed");
//         return;
//       }

//       alert(data.message || "Reset link sent successfully");
//       setEmail("");

//     } catch (err) {
//       console.error(err);
//       alert("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="find-account-page">

//       <div className="content">
//         <h1>Forgot Password</h1>
//         <p>Enter your email and we’ll send you a reset link.</p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <button type="submit">Send Reset Link</button>
//         </form>
//       </div>

//       <div className="back-to-login">
//           Back to <Link to="/">Login</Link>
//         </div>

//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim()
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Request failed");
        return;
      }

      alert(data.message || "Reset link sent successfully");
      setEmail("");

    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="find-account-page">

      <div className="content">
        <h1>Forgot Password</h1>
        <p>Enter your email and we’ll send you a reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>
      </div>

      <div className="back-to-login">
        Back to <Link to="/login">Login</Link>
      </div>

    </div>
  );
};

export default ForgotPassword;
