import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/DlRegisterPage.css";

const DlRegisterPage = ({ header = "Register", register = "Register" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (email) {
      setOtpSent(true);
      alert("OTP sent to your email!");
    }
  };

  return (
    <div className="dl-register-container">
      <nav className="navbar">
        <img alt="DL Easy Logo" src={logo} className="logo" />
      </nav>

      <div className="main-content">
        <div className="dllogin">
          <h2>{header}</h2>

          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />

          <label htmlFor="password">New Password</label>
          <div className="dl-password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="dl-eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="dl-password-wrapper">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="dl-eye-button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {otpSent && (
            <>
              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}

          <button
            type="button"
            className="dl-register-btn"
            onClick={!otpSent ? handleSendOtp : undefined}
          >
            {otpSent ? register : "Send OTP"}
          </button>

          <p className="dl-login-text">
            Have an account?{" "}
            <span
              onClick={() => navigate("/dllogin")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      <footer className="dlp-footer">
        <p onClick={() => navigate("/")}>User Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

DlRegisterPage.propTypes = {
  header: PropTypes.string,
  register: PropTypes.string,
};

export default DlRegisterPage;
