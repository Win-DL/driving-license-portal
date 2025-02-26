import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import intro from "../images/IntroductionNote.jpg";
import "../styles/Loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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

      <main className="content">

        <img src={intro} alt="Introduction" className="intro"/>

        <section className="login-box">
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
            <span onClick={() => navigate("/reset")} style={{ color: "#1A73E8", cursor: "pointer" }}>
              Forgot password?
            </span>
          </p>

          <button onClick={() => navigate("/home")} className="login-btn">Login</button>
          
          <p className="register-text">
            New Learner? {" "}
            <span onClick={() => navigate("/register")} style={{ color: "#1A73E8", cursor: "pointer" }}>
              Register here
            </span>
          </p>
          
          <button className="google-login">
            <FcGoogle size={20} /> Continue with Google
          </button>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;