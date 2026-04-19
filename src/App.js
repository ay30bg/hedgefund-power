// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "./App.css";

// import Header from "./components/Header";
// import BottomNavbar from "./components/BottomNavbar";
// import ScrollToTop from "./components/ScrollToTop";

// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import About from "./pages/About";
// import Market from "./pages/Market";
// import InvestHub from "./pages/InvestHub";
// import Rewards from "./pages/Rewards";
// import Faq from "./pages/FAQ";
// import TopUp from "./pages/TopUp";
// import Withdraw from "./pages/Withdraw";
// import Invite from "./pages/InviteFriends";
// import Portfolio from "./pages/Portfolio";
// import TransactionHistory from "./pages/TransactionHistory";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import FindAccount from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// function Layout() {
//   const location = useLocation();

//   // hide header and bottom nav on auth pages
//   const isAuthPage =
//     location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password" || location.pathname === "/reset-password";

//   return (
//     <>
//       {!isAuthPage && <Header />}

//       <main className={isAuthPage ? "login-main" : "main-content"}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/market" element={<Market />} />
//           <Route path="/investhub" element={<InvestHub />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/rewards" element={<Rewards />} />
//           <Route path="/faq" element={<Faq />} />
//           <Route path="/topup" element={<TopUp />} />
//           <Route path="/withdraw" element={<Withdraw />} />
//           <Route path="/transaction-history" element={<TransactionHistory />} />
//           <Route path="/invite" element={<Invite />} />
//           <Route path="/portfolio" element={<Portfolio />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<FindAccount />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </main>

//       {!isAuthPage && <BottomNavbar />}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       {/* ✅ Scroll resets on every route change */}
//       <ScrollToTop />

//       <Layout />
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Market from "./pages/Market";
import InvestHub from "./pages/InvestHub";
import Rewards from "./pages/Rewards";
import Faq from "./pages/FAQ";
import TopUp from "./pages/TopUp";
import Withdraw from "./pages/Withdraw";
import Invite from "./pages/InviteFriends";
import Portfolio from "./pages/Portfolio";
import TransactionHistory from "./pages/TransactionHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function Layout() {
  const location = useLocation();

  // ✅ AUTH PAGES (no header/footer)
  const isAuthPage =
    ["/login", "/signup", "/forgot-password"].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  return (
    <>
      {/* HEADER */}
      {!isAuthPage && <Header />}

      {/* MAIN CONTENT */}
      <main className={isAuthPage ? "login-main" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/investhub" element={<InvestHub />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>

      {/* BOTTOM NAVBAR */}
      {!isAuthPage && <BottomNavbar />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;
