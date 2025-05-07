import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutUs.css';
import logo from "../images/logo.png";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="user-page-container">
      {/* Reuse your navbar component */}
      <nav className="user-navbar">
        <img alt="DL Easy Logo" src={logo} className="user-logo" onClick={() => navigate("/")} />
        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item active">About Us</li>
            <li className="user-navbar-item" onClick={() => navigate("/privacy")}>Privacy Policy</li>
            <li className="user-navbar-item" onClick={() => navigate("/help")}>Help Center</li>
          </ul>
        </div>
      </nav>

      <main className="user-about-container">
        <section className="user-about-hero">
          <h1>Our Story</h1>
          <p className="user-about-subtitle">Building innovative solutions since 2024</p>
        </section>

        <section className="user-about-content">
          <div className="user-about-card">
            <h2>Who We Are</h2>
            <p>
              We are a passionate team of developers, designers, and problem-solvers dedicated to creating
              intuitive digital experiences. Our mission is to simplify complex processes through elegant
              solutions that just work.
            </p>
          </div>

          <div className="user-about-card">
            <h2>Our Values</h2>
            <ul className="user-about-values">
              <li>
                <span className="user-value-icon">💡</span>
                <div>
                  <h3>Innovation</h3>
                  <p>We push boundaries to deliver cutting-edge solutions</p>
                </div>
              </li>
              <li>
                <span className="user-value-icon">🤝</span>
                <div>
                  <h3>Integrity</h3>
                  <p>Honest and transparent in all our dealings</p>
                </div>
              </li>
              <li>
                <span className="user-value-icon">🎯</span>
                <div>
                  <h3>Excellence</h3>
                  <p>Committed to the highest quality standards</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="user-about-card user-team-section">
            <h2>Meet The Team</h2>
            <div className="user-team-grid">
              <div className="user-team-member">
                <div className="user-avatar"></div>
                <h3>Aatif Faiz & Saquib Kausar</h3>
                <p>Frontend Developer</p>
              </div>
              <div className="user-team-member">
                <div className="user-avatar"></div>
                <h3>Atir Mustafa & Daiyan Kamal</h3>
                <p>Backend Developer</p>
              </div>
              <div className="user-team-member">
                <div className="user-avatar"></div>
                <h3>Md Hedaytullah & Huzaifa</h3>
                <p>UX Designer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="user-lp-footer">
        <p>DL Easy</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;