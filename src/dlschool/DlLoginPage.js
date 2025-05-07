import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/DlLoginPage.css";
import { useNavigate } from "react-router-dom";

const DlLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dl2-login-page-container">
      <nav className="dl2-navbar">
        <img alt="DL Easy Logo" src={logo} className="dl2-logo" />
        
        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item" onClick={() => navigate("/about")}>
              About Us
            </li>
            <li className="user-navbar-item" onClick={() => navigate("/contact")}>
              Contact Us
            </li>
            <li className="user-navbar-item" onClick={() => navigate("/privacy")}>
              Privacy Policy
            </li>
          </ul>
        </div>

      </nav>
  
      <div className="dl2-main-content">
        <div className="dl2-dllogin">
          <h2>Login to your account</h2>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" id="email" />
  
          <label htmlFor="password">Password</label>
          <div className="dl2-password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            <button
              type="button"
              className="dl2-eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
  
          <p className="dl2-forgot-password">
            <span
              onClick={() => navigate("/dlreset")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Forgot password?
            </span>
          </p>
  
          <button onClick={() => navigate("/dldashboard")} className="dl2-login-btn">
            Login
          </button>
  
          <p className="dl2-register-text">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/dlregister")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
  
      <footer className="dl2-dlp-footer">
        <p onClick={() => navigate("/")}>User Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );  
};

export default DlLoginPage;