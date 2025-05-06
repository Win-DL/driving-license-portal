import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Contact.css";

const Contact = ({
  heading1 = "Contact Us",
  content1 = "Have a question or need assistance? Feel free to reach out to us.",
  content2 = "Our customer support team is available to help you with any queries.",
  content3 = "For general inquiries or feedback, you can also use the contact form below.",
  email1 = "drivinglicense6699@gmail.com",
  phone = "+1 (555) 123-4567",
  address = "123 Driving School Ave, City, State 12345"
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("email"); // 'email', 'phone', 'form'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
    setFormData({ name: "", email: "", message: "" });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard!`);
  };

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

        <div className="contact-tabs">
          <button 
            className={`contact-tab ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            Email
          </button>
          <button 
            className={`contact-tab ${activeTab === 'phone' ? 'active' : ''}`}
            onClick={() => setActiveTab('phone')}
          >
            Phone
          </button>
          <button 
            className={`contact-tab ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            Contact Form
          </button>
        </div>

        <div className="contact-row">
          {activeTab === 'email' && (
            <div className="contact-content2">
              <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
                <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
              </svg>
              <div className="contact-contact-info1">
                <h3 className="thq-heading-3">Email</h3>
                <p className="thq-body-large">{content3}</p>
                <div className="contact-email-container">
                  <span className="thq-body-small">{email1}</span>
                  <button 
                    className="contact-copy-btn"
                    onClick={() => copyToClipboard(email1)}
                    aria-label="Copy email to clipboard"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <a 
                  href={`mailto:${email1}`} 
                  className="thq-button-outline"
                >
                  Send Email
                </a>
              </div>
            </div>
          )}

          {activeTab === 'phone' && (
            <div className="contact-content2">
              <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
                <path d="M725 333c-26 0-52 10-71 29l-85 85q-28 28-28 68t28 68l215 215q28 28 68 28t68-28l85-85q19-19 29-45t10-53-10-53-29-45l-124-124q-19-19-45-29t-53-10zM426 896h-214q-34 0-59-25t-25-59v-214q0-16 6-30t17-25l172-172q-14 42-4 86t40 76 76 40 86-4l-172 172q-11 11-25 17t-30 6z"></path>
              </svg>
              <div className="contact-contact-info1">
                <h3 className="thq-heading-3">Phone</h3>
                <p className="thq-body-large">Call us during business hours (9AM-5PM, Mon-Fri)</p>
                <div className="contact-phone-container">
                  <span className="thq-body-small">{phone}</span>
                  <button 
                    className="contact-copy-btn"
                    onClick={() => copyToClipboard(phone)}
                    aria-label="Copy phone number to clipboard"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <a 
                  href={`tel:${phone.replace(/\D/g, '')}`} 
                  className="thq-button-outline"
                >
                  Call Now
                </a>
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <div className="contact-form-container">
              {isSubmitted ? (
                <div className="contact-success-message">
                  <svg viewBox="0 0 24 24" className="contact-success-icon">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3>Thank you for your message!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="thq-button-outline">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}
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
  heading1: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string
};

export default Contact;