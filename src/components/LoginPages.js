import React, { useState} from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
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

      <div className="content">
        {/* <img src={intro} alt="Introduction" className="intro"/> */}

        <div className="intro-container">
          <div className="card">
            <div className="circle"></div>
            <h1>
              🚗 Welcome to DL Easy - Your Smooth Ride to a Driving License!
            </h1>

            <p className="intro">
              Unlock a hassle-free path to getting your driving license with DL
              Easy. From learning to certification, we make the entire process
              simple and efficient!
            </p>

            <ul className="feature-list">
              <li>
                <span className="checkmark">✓</span> Learn & Get Certified -
                Master driving skills and earn your official certification.
              </li>
              <li>
                <span className="checkmark">✓</span> Connect with Experts -
                Access certified driving schools for professional guidance.
              </li>
              <li>
                <span className="checkmark">✓</span> Track Your Journey -
                Schedule lessons, monitor progress, and stay on track.
              </li>
              <li>
                <span className="checkmark">✓</span> One-Stop Solution - From
                learner's permit to final license - we've got you covered!
              </li>
            </ul>

            <div className="steps-section">
              <h2>
                <span className="note-icon">📝</span> Get Your Driving License
                in 5 Easy Steps:
              </h2>

              <ol className="steps-list">
                <li>
                  <span className="step-number">1</span> Your License, Our
                  Responsibility - We guide you every step of the way.
                </li>
                <li>
                  <span className="step-number">2</span> Simplifying Your
                  Journey - We handle the paperwork, you focus on driving.
                </li>
                <li>
                  <span className="step-number">3</span> We Manage the Process -
                  Fast-track your license with our seamless system.
                </li>
                <li>
                  <span className="step-number">4</span> Quick & Convenient -
                  Enjoy a smooth, easy, and efficient process.
                </li>
                <li>
                  <span className="step-number">5</span> From Learner to
                  Licensed - We ensure you achieve your driving goals.
                </li>
              </ol>
            </div>

            <p className="cta">
              ✨ Why Wait? Start Your Driving Journey Today!
            </p>
          </div>
        </div>

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
            <span
              onClick={() => navigate("/reset")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Forgot password?
            </span>
          </p>

          <button onClick={() => navigate("/home")} className="login-btn">
            Login
          </button>

          <p className="register-text">
            New Learner?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#1A73E8", cursor: "pointer" }}
            >
              Register here
            </span>
          </p>

          <button className="google-login">
            <FcGoogle size={20} /> Continue with Google
          </button>
        </section>
      </div>
      <footer className="lp-footer">
        <p onClick={() => navigate("/dllogin")}>Driving School Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
