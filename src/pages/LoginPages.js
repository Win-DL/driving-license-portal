import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/Loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
                <span className="user-checkmark">✓</span> Learn & Get Certified -
                Master driving skills and earn your official certification.
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
                <span className="user-checkmark">✓</span> One-Stop Solution - From
                learner's permit to final license - we've got you covered!
              </li>
            </ul>

            <div className="user-steps-section">
              <h2>
                <span className="user-note-icon">📝</span> Get Your Driving License
                in 5 Easy Steps:
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
                  <span className="user-step-number">3</span> We Manage the Process -
                  Fast-track your license with our seamless system.
                </li>
                <li>
                  <span className="user-step-number">4</span> Quick & Convenient -
                  Enjoy a smooth, easy, and efficient process.
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

        <form className="user-login-box">
          <h2>Login to your account</h2>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" id="email" />

          <label htmlFor="password">Password</label>
          <div className="user-password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            <button
              type="button"
              className="user-eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <p className="user-forgot-password">
            <span
              onClick={() => navigate("/reset")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Forgot password?
            </span>
          </p>

          <button onClick={() => navigate("/home")} className="user-login-btn">
            Login
          </button>

          <p className="user-register-text">
            New Learner?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Register here
            </span>
          </p>

          <button className="user-google-login">
            <FcGoogle size={20} /> Continue with Google
          </button>
        </form>
      </div>
      <footer className="user-lp-footer">
        <p onClick={() => navigate("/dllogin")}>Driving School Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;