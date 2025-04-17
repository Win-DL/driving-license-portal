import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/DlResetPassword.css";

const DlResetPassword = () => {
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
    <div className="dl-reset-container">
      <nav className="navbar">
        <img alt="DL Easy Logo" src={logo} className="logo" />

      </nav>

      <div className="main-content">
        <div className="dllogin">
          {step > 1 && (
            <span onClick={() => setStep(step - 1)} className="dl-back-icon">
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
              <button className="dl-reset-btn" onClick={handleSendOtp}>
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
              {otpError && <p className="dl-error-text">{otpError}</p>}
              <button className="dl-reset-btn" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Set New Password</h2>
              <div className="dl-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="dl-eye-btn"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="dl-password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="dl-eye-btn"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className="dl-reset-btn" onClick={handleResetPassword}>
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>

      <footer className="dlp-footer">
        <p onClick={() => navigate("/")}>User Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default DlResetPassword;
