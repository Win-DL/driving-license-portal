import React from "react";
import PropTypes from "prop-types";
import "../styles/Contact.css";

const Contact = ({
  heading1 = "Contact Us",
  content1 = "Have a question or need assistance? Feel free to reach out to us.",
  content2 = "Our customer support team is available to help you with any queries.",
  content3 = "For general inquiries or feedback, you can also use the contact form on our website.",
  email1 = "drivinglicense6699@gmail.com"
}) => {
  return (
    <div className="contact-contact20 thq-section-padding">
      <div className="contact-max-width thq-section-max-width">
        <div className="contact-section-title">
          <span className="thq-body-small">{content2}</span>
          <div className="contact-content1">
            <h2 className="thq-heading-2">{heading1}</h2>
            <p className="contact-text3 thq-body-large">{content1}</p>
          </div>
        </div>
        <div className="contact-row">
          {/* Email Section */}
          <div className="contact-content2">
            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
              <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
            </svg>
            <div className="contact-contact-info1">
              <h3 className="thq-heading-3">Email</h3>
              <p className="thq-body-large">{content3}</p>
              <span className="thq-body-small">{email1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  content1: PropTypes.string,
  content2: PropTypes.string,
  content3: PropTypes.string,
  email1: PropTypes.string,
  heading1: PropTypes.string
};

export default Contact;
