import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = () => {
    alert(`OTP sent to ${email}`);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setOtpError("");
      alert("OTP Verified Successfully");
      setStep(3);
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successfully");
    navigate("/");
  };

  return (
    <div className="user-login-container">
      <nav className="user-navbar">
        <img alt="DL Easy Logo" src={logo} className="user-logo" />
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

        <section className="user-reset-box">
          {step > 1 && (
            <span onClick={() => setStep(step - 1)} className="user-back-icon">
              <FaArrowLeft />
            </span>
          )}

          {step === 1 && (
            <>
              <h2>Reset Password</h2>
              <p>Enter your registered email to receive an OTP</p>
              <input
                type="email"
                placeholder="Enter Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="user-reset-btn" onClick={handleSendOtp}>
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Verify OTP</h2>
              <p>Enter the OTP sent to your email</p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && <p className="user-error-text">{otpError}</p>}
              <button className="user-reset-btn" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Set New Password</h2>
              <div className="user-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="user-eye-btn"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="user-password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="user-eye-btn"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className="user-reset-btn" onClick={handleResetPassword}>
                Reset Password
              </button>
            </>
          )}
        </section>
      </div>
      <footer className="user-lp-footer">
        <p onClick={() => navigate("/dllogin")}>Driving School Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ResetPassword;