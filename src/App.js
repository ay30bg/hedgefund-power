import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Market from "./pages/Market";
import InvestHub from "./pages/InvestHub";
import Portfolio from "./pages/Portfolio"
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Layout() {
  const location = useLocation();

  // hide header and bottom nav on auth pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}

      <main className={isAuthPage ? "login-main" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/investhub" element={<InvestHub />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {!isAuthPage && <BottomNavbar />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
