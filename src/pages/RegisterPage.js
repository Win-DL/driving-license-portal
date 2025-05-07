import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
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
    <div className="user-register-container">
      <nav className="user-navbar">
        <img alt="DL Easy Logo" src={logo} className="user-logo" />

        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item" onClick={() => navigate("/about")}>
              About Us
            </li>
            <li className="user-navbar-item" onClick={() => navigate("/privacy")}>
              Privacy Policy
            </li>
            <li className="user-navbar-item" onClick={() => navigate("/help")}>
              Help Center
            </li>
          </ul>
        </div>

      </nav>

      <div className="user-content">
        <div className="user-intro-container">
          <div className="user-card">
            <div className="user-circle"></div>
            <h1>
              🚗 Welcome to DL Easy - Your Smooth Ride to a Driving License!
            </h1>

            <p className="user-intro">
              Unlock a hassle-free path to getting your driving license with DL
              Easy. From learning to certification, we make the entire process
              simple and efficient!
            </p>

            <ul className="user-feature-list">
              <li>
                <span className="user-checkmark">✓</span> Learn & Get Certified
                - Master driving skills and earn your official certification.
              </li>
              <li>
                <span className="user-checkmark">✓</span> Connect with Experts -
                Access certified driving schools for professional guidance.
              </li>
              <li>
                <span className="user-checkmark">✓</span> Track Your Journey -
                Schedule lessons, monitor progress, and stay on track.
              </li>
              <li>
                <span className="user-checkmark">✓</span> One-Stop Solution -
                From learner's permit to final license - we've got you covered!
              </li>
            </ul>

            <div className="user-steps-section">
              <h2>
                <span className="user-note-icon">📝</span> Get Your Driving
                License in 5 Easy Steps:
              </h2>

              <ol className="user-steps-list">
                <li>
                  <span className="user-step-number">1</span> Your License, Our
                  Responsibility - We guide you every step of the way.
                </li>
                <li>
                  <span className="user-step-number">2</span> Simplifying Your
                  Journey - We handle the paperwork, you focus on driving.
                </li>
                <li>
                  <span className="user-step-number">3</span> We Manage the
                  Process - Fast-track your license with our seamless system.
                </li>
                <li>
                  <span className="user-step-number">4</span> Quick & Convenient
                  - Enjoy a smooth, easy, and efficient process.
                </li>
                <li>
                  <span className="user-step-number">5</span> From Learner to
                  Licensed - We ensure you achieve your driving goals.
                </li>
              </ol>
            </div>

            <p className="user-cta">
              ✨ Why Wait? Start Your Driving Journey Today!
            </p>
          </div>
        </div>

        <section className="user-register-box">
          <h2>{header}</h2>

          <div style={{ marginBottom: "10px" }}>
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

          <div className="user-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="user-eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="user-eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="user-password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
              <FaEyeSlash
                className="user-eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <FaEye
                className="user-eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>

          <div style={{ marginTop: "10px" }}>
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
            className="user-register-btn"
            onClick={!otpSent ? handleSendOtp : undefined}
          >
            {otpSent ? register : "Send OTP"}
          </button>

          <p className="user-login-text">
            Have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Sign In
            </span>
          </p>
        </section>
      </div>
      <footer className="user-lp-footer">
        <p onClick={() => navigate("/dllogin")}>Driving School Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

RegisterPage.propTypes = {
  header: PropTypes.string,
  register: PropTypes.string,
};

export default RegisterPage;