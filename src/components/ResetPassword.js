import React, { useState } from "react";
import "../styles/ResetPassword.css";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSendOtp = () => {
    alert("OTP sent to " + email);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      alert("OTP verified");
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successfully");
    setStep(1);

    navigate('/');
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); 
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
      
        {step === 2 && (
          <span onClick={handleBack} className="back-icon">
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
            <button onClick={handleSendOtp}>Send OTP</button>
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
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Set New Password</h2>
            <p>Choose a strong password for security</p>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="password-input"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="eye-button">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="password-input"
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-button">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
