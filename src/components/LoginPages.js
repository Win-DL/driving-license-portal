import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import intro from "../images/IntroductionNote.png";
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

        {/* <div className="intro-container">
          <div className="intro">
            <p><strong>Welcome to DL Easy - </strong>Your Smooth Ride to a Driving License!</p>
            <p>Unlock a hassle-free path to getting your driving license with DL Easy. From 
              learing to certification, we make the entire process simple and efficient!
            </p>
            <p>Learn & Get Certified - Master driving skills and earn your official certification.</p>
            <p>Connect with Experts - Access certified driving schools for professional guidance.</p>
            <p>Track  Your Journey - Schedule lessons, moniter progress, and stay on track.</p>
            <p>One-Stop Solution - From Learner's permit to final license - we've got you covered!</p>
            <br />
            <p><strong>Get Your Driving License in 5 Easy Steps:</strong></p>
            <p>Your License, Our Responsibility - We guide you every step of the way.</p>
            <p>Simplifying Your Journey - We handle the paperwork, you focus on driving.</p>
            <p>We Manage the Process - Fast-track your license with our seamless system.</p>
            <p>Quick & Convenient - Enjoy a smooth, easy, and efficient process.</p>
            <p>From Learner to Licensed - We ensure you achieve your driving goals.</p>

            <h4>✨{" "}Why Wait? Start Your Driving Journey Today!</h4>
            <div className="circle"></div>
          </div>
        </div> */}

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