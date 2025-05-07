import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PrivacyPolicy.css';
import logo from "../images/logo.png";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="user-page-container">
      <nav className="user-navbar">
        <img alt="DL Easy Logo" src={logo} className="user-logo" onClick={() => navigate("/")}/>
        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item" onClick={() => navigate("/about")}>About Us</li>
            <li className="user-navbar-item active">Privacy Policy</li>
            <li className="user-navbar-item" onClick={() => navigate("/help")}>Help Center</li>
          </ul>
        </div>
      </nav>

      <main className="user-privacy-container">
        <section className="user-privacy-hero">
          <h1>Privacy Policy</h1>
          <p className="user-privacy-subtitle">Last updated: May 2025</p>
        </section>

        <section className="user-privacy-content">
          <div className="user-privacy-card">
            <h2>Introduction</h2>
            <p>
              At DL Easy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our services. Please read this policy carefully.
            </p>
          </div>

          <div className="user-privacy-card">
            <h2>Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="user-privacy-list">
              <li>Register for an account</li>
              <li>Use our services</li>
              <li>Make a Payment</li>
              <li>Contact us for support</li>
            </ul>
            <p>The types of information we may collect include:</p>
            <ul className="user-privacy-list">
              <li>Name and contact details (email, phone number)</li>
              <li>Personal details</li>
              <li>Payment information</li>
              <li>Usage data and preferences</li>
            </ul>
          </div>

          <div className="user-privacy-card">
            <h2>How We Use Your Information</h2>
            <ul className="user-privacy-features">
              <li>
                <span className="user-privacy-icon">🔒</span>
                <div>
                  <h3>Service Provision</h3>
                  <p>To provide and maintain our services, authenticate users, and process transactions</p>
                </div>
              </li>
              <li>
                <span className="user-privacy-icon">📈</span>
                <div>
                  <h3>Improvements</h3>
                  <p>To analyze usage and improve our services and user experience</p>
                </div>
              </li>
              <li>
                <span className="user-privacy-icon">📧</span>
                <div>
                  <h3>Communication</h3>
                  <p>To respond to inquiries and send important notices</p>
                </div>
              </li>
              <li>
                <span className="user-privacy-icon">🛡️</span>
                <div>
                  <h3>Security</h3>
                  <p>To detect and prevent fraud and enhance security</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="user-privacy-card">
            <h2>Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="user-privacy-list">
              <li>Service providers who will assist you in getting your license</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>
              Any third parties who receive your information are obligated to maintain its confidentiality and security.
            </p>
          </div>

          <div className="user-privacy-card">
            <h2>Your Rights and Choices</h2>
            <p>You have certain rights regarding your personal information:</p>
            <div className="user-privacy-rights">
              <div className="user-privacy-right">
                <h3>Access</h3>
                <p>Request a copy of your personal data</p>
              </div>
              <div className="user-privacy-right">
                <h3>Correction</h3>
                <p>Update or correct inaccurate information</p>
              </div>
              <div className="user-privacy-right">
                <h3>Deletion</h3>
                <p>Request deletion of your personal data</p>
              </div>
            </div>
          </div>

          <div className="user-privacy-card">
            <h2>Security Measures</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These include encryption, 
              access controls, and regular security assessments.
            </p>
          </div>

          <div className="user-privacy-card">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by posting 
              the new policy on our website and updating the "Last updated" date. Your continued use of our services 
              after such changes constitutes your acceptance of the revised policy.
            </p>
          </div>

          <div className="user-privacy-card">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@dleasy.com<br />
              <strong>Address:</strong> University Polytechnic, Jamia Millia Islamia, New Delhi, India<br />
            </p>
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

export default PrivacyPolicy;