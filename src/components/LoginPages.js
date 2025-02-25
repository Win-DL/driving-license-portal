import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import logo from "../images/logo.png";
import "../styles/Loginpage.css";
import { useNavigate, Routes, Route } from "react-router-dom";

const LoginPage = () => {
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const bannerShown = localStorage.getItem("bannerShown");
    if (!bannerShown) {
      setShowBanner(true);
      localStorage.setItem("bannerShown", "true");
    }
  }, []);

  return (
    <div className={`login-container ${showBanner ? "blur-active" : ""}`}>
      {showBanner && <div className="blur-bg"></div>}

      <nav className="navbar">
        <img alt="DL Easy Logo" src={logo} className="logo" />
        <div className="nav-links">
          <a href="#">Our services</a>
          <a href="#">About</a>
        </div>
      </nav>

      {showBanner && (
        <div className="banner">
          <button className="close-btn" onClick={() => setShowBanner(false)}>
            <IoClose size={20} />
          </button>
          <h3>🚗 Get Your Driving License in 5 Easy Steps</h3>
          <ul>
            <li>1️⃣ Your License, Our Responsibility - Let's Get Started!</li>
            <li>2️⃣ Simplifying Your Driving License Journey - Hassle-Free!</li>
            <li>3️⃣ We Handle the Process, You Focus on Driving! 🚦</li>
            <li>4️⃣ Fast-Track Your Driving License - Easy & Quick!</li>
            <li>5️⃣ From Learner's Permit to License - We've Got You Covered!</li>
          </ul>
        </div>
      )}

      <main className="content">
        <section className="info-section">
          <h3>Welcome to DL Easy - Your Path to a Hassle-Free Driving License!</h3>
          <p>🚗 Learn. Get Certified. Apply for Your License - All in One Place!</p>
          <p>🔹 Connect with certified driving schools</p>
          <p>🔹 Book driving lessons & track your progress</p>
          <p>🔹 Get certified and your Driving License at one place</p>
        </section>

        <section className="login-box">
          <h2>Login to your account</h2>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" />
          
          <p className="forgot-password">
            <span
              onClick={() => navigate("/reset")}
              style={{
                color: "#000",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </span>
          </p>

          <button onClick={() => navigate("/home")} className="login-btn">Login</button>
          
          <p className="register-text">
            New Learner?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#000",
                cursor: "pointer",
              }}
            >
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
