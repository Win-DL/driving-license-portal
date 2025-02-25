import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "../styles/RegisterPage.css";

const RegisterPage = ({ header = "Register", register = "Register" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (email) {
      const otpCode = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
      setGeneratedOtp(otpCode);
      alert(`Your OTP is: ${otpCode}`); // Replace with actual email service
    }
  };

  const handleVerifyOtp = () => {
    if (parseInt(otp) === generatedOtp) {
      setIsEmailVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <h3>{header}</h3>
        <input type="text" placeholder="Full Name" id="name" />
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isEmailVerified}
        />
        {!isEmailVerified ? (
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : null}

        {/* OTP Verification */}
        {!isEmailVerified && generatedOtp && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="button" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {isEmailVerified && (
          <>
            {/* Password Input */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
              />
              {showPassword ? (
                <IoEyeOffOutline
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoEyeOutline
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="cpassword"
              />
              {showConfirmPassword ? (
                <IoEyeOffOutline
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <IoEyeOutline
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            <button type="button">{register}</button>
          </>
        )}

        <p className="login-text">
          Have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  header: PropTypes.string,
  register: PropTypes.string,
};

export default RegisterPage;
