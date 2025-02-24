import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "../styles/RegisterPage.css";

const RegisterPage = ({ 
  header = "Register", 
  register = "Register" 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register">
        <h3>{header}</h3>
        <input type="text" placeholder="Full Name" id="name" />
        <input type="text" placeholder="Email" id="email" />

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