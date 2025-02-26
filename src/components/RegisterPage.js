import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import profile from "../images/Driving-License.jpg";
import "../styles/RegisterPage.css";

const RegisterPage = ({ header = "Register", register = "Register" }) => {
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
    <div className="register-container">
      <nav className="navbar">
        <img alt="DL Easy Logo" src={logo} className="logo" />
        <div className="nav-links">
          <a href="#">Our Services</a>
          <a href="#">About</a>
        </div>
      </nav>

      <main className="content">
        <img src={profile} alt="Home Page" className="home-pic" />
        <section className="register-box">
          <h2>{header}</h2>

          <div style={{ marginBottom: '10px' }} >
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              />
          </div>  

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <FaEye
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>

          <div style={{ marginTop: '10px' }}> 
            {otpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
          </div>

          <button
            type="button"
            className="register-btn"
            onClick={!otpSent ? handleSendOtp : undefined}
          >
            {otpSent ? register : "Send OTP"}
          </button>

          <p className="login-text">
            Have an account?{" "}
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Sign In
            </span>
          </p>
        </section>
      </main>
    </div>
  );
};

RegisterPage.propTypes = {
  header: PropTypes.string,
  register: PropTypes.string,
};

export default RegisterPage;
