import React from "react";
import PropTypes from "prop-types";
import "../styles/Footer.css";
import logo from "../images/logo.png";

const Footer = ({
  logoSrc = logo,
  logoAlt = "Driving License Portal Logo",
  action1 = "Report a Bug",
  content2 = "© 2025 Driving License Portal. All rights reserved.",
  content3 = "Designed and Developed by WinDL Team",
  column1Title = "Quick Links",
  column2Title = "Support",
  link1 = "Apply for Learner's License",
  link2 = "Apply for Driving License",
  link3 = "Check Application Status",
  link4 = "Learner's License Tutorial",
  link5 = "FAQs",
  link6 = "Contact Us",
  link7 = "About Us",
  link8 = "Privacy Policy",
  link9 = "Terms and Conditions"
}) => {
  return (
    <footer className="footer-footer1 thq-section-padding">
      <div className="footer-max-width thq-section-max-width">
        <div className="footer-content">
          <div className="footer-newsletter">
            <img alt={logoAlt} src={logoSrc} className="footer-image1" />
            <span className="thq-body-small">Reach Us.</span>
            <div className="footer-actions">
              <div className="footer-form">
                <div className="footer-container">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="footer-text-input thq-input"
                  />
                </div>
                <button className="thq-button-outline footer-button">
                  <span className="thq-body-small">{action1}</span>
                </button>
              </div>
              <span className="footer-content2 thq-body-small">{content2}</span>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-column1">
              <strong className="thq-body-large footer-column1-title">
                {column1Title}
              </strong>
              <div className="footer-footer-links1">
                {[link1, link2, link3, link4, link5].map((link, index) => (
                  <a
                    key={index}
                    href={
                      link === "Apply for Learner's License" ? "/apply-learner" :
                      link === "Apply for Driving License" ? "/apply-driving" :
                      link === "Check Application Status" ? "/status" :
                      link === "Learner's License Tutorial" ? "/tutorial" :
                      link === "FAQs" ? "/faqs" : "#"
                    }
                    className="thq-body-small"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-column2">
              <strong className="thq-body-large footer-column2-title">
                {column2Title}
              </strong>
              <div className="footer-footer-links2">
                {[link6, link7, link8, link9].map((link, index) => (
                  <a
                    key={index}
                    href={
                      link === "Contact Us" ? "/contact" :
                      link === "About Us" ? "/about" :
                      link === "Privacy Policy" ? "/privacy" :
                      link === "Terms and Conditions" ? "/terms" : "#"
                    }
                    className="thq-body-small"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer-row">
            <span className="thq-body-small">{content3}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  action1: PropTypes.string,
  content2: PropTypes.string,
  content3: PropTypes.string,
  column1Title: PropTypes.string,
  column2Title: PropTypes.string,
  link1: PropTypes.string,
  link2: PropTypes.string,
  link3: PropTypes.string,
  link4: PropTypes.string,
  link5: PropTypes.string,
  link6: PropTypes.string,
  link7: PropTypes.string,
  link8: PropTypes.string,
  link9: PropTypes.string
};

export default Footer;
