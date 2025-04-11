import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/DlLoginPage.css";
import { useNavigate } from "react-router-dom";

const DlLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <nav className="navbar">
        <img alt="DL Easy Logo" src={logo} className="logo" />
        <div className="nav-links">
          <a href="#">Our Services</a>
          <a href="#">About</a>
        </div>
      </nav>

      <div className="dlcontent">
        <section className="dllogin">
          <h2>Login to your account</h2>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" id="email" />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <p className="forgot-password">
            <span
              onClick={() => navigate("/reset")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Forgot password?
            </span>
          </p>

          <button onClick={() => navigate("/dashboard")} className="login-btn">
            Login
          </button>

          <p className="register-text">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Register here
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default DlLoginPage;
