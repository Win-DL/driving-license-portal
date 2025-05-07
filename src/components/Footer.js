import React from "react";
import PropTypes from "prop-types";
import "../styles/Footer.css";
import logo from "../images/logo.png";

const Footer = ({
  logoSrc = logo,
  logoAlt = "Driving License Portal Logo",
  copyrightText = "© 2025 Driving License Portal. All rights reserved.",
  developerText = "Designed and Developed by DLEasy Team",
  usefulLinks = [
    { text: "Contact Support", url: "/contact" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "About Us", url: "/about" },
    { text: "Help Center", url: "/help" }
  ]
}) => {
  return (
    <footer className="footer-footer1">
      <div className="footer-max-width">
        <div className="footer-content">
          <div className="footer-brand-section">
            <img alt={logoAlt} src={logoSrc} className="footer-logo" />
            <p className="footer-tagline">
              Your one-stop portal for all driving license needs
            </p>
          </div>

          <div className="footer-links-section">
            <div className="footer-links-column">
              <h3 className="footer-column-title">Quick Links</h3>
              <ul className="footer-links-list">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="footer-link">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-column-title">Contact</h3>
              <div className="footer-contact-info">
                <p>Email: drivinglicense6699@gmail.com</p>
                <p>Phone: +91 9876543210</p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-legal">
            <p className="footer-copyright">{copyrightText}</p>
            <p className="footer-developer">{developerText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  copyrightText: PropTypes.string,
  developerText: PropTypes.string,
  usefulLinks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string
    })
  )
};

export default Footer;