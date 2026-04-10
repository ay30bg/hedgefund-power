import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLineChart } from "react-icons/ai"; // Home + chart icons
import { GiWallet } from "react-icons/gi";                        // InvestHub icon
import { FaUserCircle, FaBriefcase  } from "react-icons/fa";                    // Profile icon
import "../styles/bottomNavbar.css";

const BottomNavbar = () => {
  const location = useLocation(); // for active link styling

  const navItems = [
    { path: "/", label: "Home", icon: <AiFillHome /> },
    { path: "/market", label: "Market", icon: <AiOutlineLineChart /> }, 
    { path: "/investhub", label: "InvestHub", icon: <GiWallet /> },
    { path: "/portfolio", label: "Portfolio", icon: <FaBriefcase  /> },
    { path: "/profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  return (
    <nav className="bottom-navbar">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? "active" : ""}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavbar;
