import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ContactUs.css';
import logo from "../images/logo.png";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="user-page-container">
      {/* Reuse your navbar component */}
      <nav className="user-navbar">
        <img alt="DL Easy Logo" src={logo} className="user-logo" onClick={() => navigate("/")}/>
        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item" onClick={() => navigate("/about")}>About Us</li>
            <li className="user-navbar-item active">Contact Us</li>
            <li className="user-navbar-item" onClick={() => navigate("/privacy")}>Privacy Policy</li>
          </ul>
        </div>
      </nav>

      <main className="user-contact-container">
        <section className="user-contact-hero">
          <h1>Get in Touch</h1>
          <p className="user-contact-subtitle">We'd love to hear from you! Reach out for inquiries, support, or just to say hello.</p>
        </section>

        <div className="user-contact-content">
          <section className="user-contact-info">
            <div className="user-contact-card">
              <div className="user-contact-icon">📍</div>
              <h3>Our Location</h3>
              <p>University Polytechnic, Jamia Millia Islamia, Okhla</p>
              <p>New Delhi, 110025</p>
            </div>

            <div className="user-contact-card">
              <div className="user-contact-icon">✉️</div>
              <h3>Email Us</h3>
              <p>support@dleasy.com</p>
              <p>info@dleasy.com</p>
            </div>

            <div className="user-contact-card">
              <div className="user-contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>+91 9876543210</p>
              <p>Mon-Fri: 9am-5pm PST</p>
            </div>
          </section>

          <section className="user-contact-form-section">
            <h2>Send Us a Message</h2>
            <form className="user-contact-form" onSubmit={handleSubmit}>
              <div className="user-form-group">
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

              <div className="user-form-group">
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

              <div className="user-form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="user-form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="user-submit-btn">Send Message</button>
            </form>
          </section>

          <section className="user-contact-map">
            <h2>Find Us</h2>
            <div className="user-map-placeholder">
              {/* Replace with your actual map embed */}
              <div className="user-map-overlay">Map Loading...</div>
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194&zoom=13&size=800x400&key=YOUR_API_KEY" 
                   alt="Map location" />
            </div>
          </section>
        </div>
      </main>

      <footer className="user-lp-footer">
        <p>DL Easy</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;