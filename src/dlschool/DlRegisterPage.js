import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/DlRegisterPage.css";

const DlRegisterPage = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    licenseNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    twowheelerPrice: "",
    fourwheelerPrice: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    availableSlots: {
      morning: false,
      afternoon: false,
      evening: false
    },
    supportedVehicles: {
      twoWheeler: false,
      fourWheeler: false
    },
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type, field) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: !prev[type][field]
      }
    }));
  };

  const handleSendOtp = () => {
    if (formData.email) {
      setOtpSent(true);
      alert("OTP sent to your email!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration submitted successfully!");
    navigate("/dllogin");
  };

  return (
    <div className="dl-register-container">
      <nav className="dl2-navbar">
        <img alt="DL Easy Logo" src={logo} className="dl2-logo" />

        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item" onClick={() => navigate("/about")}>
              About Us
            </li>
            <li className="user-navbar-item" onClick={() => navigate("/contact")}>
              Contact Us
            </li>
            <li className="user-navbar-item" onClick={() => navigate("/privacy")}>
              Privacy Policy
            </li>
          </ul>
        </div>

      </nav>

      <div className="dl-main-content">
        <form className="dl-register-form" onSubmit={handleSubmit}>
          <h2>Driving School Registration</h2>

          <div className="dl-form-group">
            <label htmlFor="schoolName">School Name</label>
            <input
              id="schoolName"
              name="schoolName"
              type="text"
              placeholder="Official school name"
              value={formData.schoolName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="licenseNumber">License Number</label>
            <input
              id="licenseNumber"
              name="licenseNumber"
              type="text"
              placeholder="Government issued license number"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="contactPerson">Contact Person</label>
            <input
              id="contactPerson"
              name="contactPerson"
              type="text"
              placeholder="Authorized representative"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Primary contact number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Official email address"
              value={formData.email}
              onChange={handleChange}
              disabled={otpSent}
              required
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="price">Two Wheeler Price (₹)</label>
            <input
              id="twowheelerPrice"
              name="twowheelerPrice"
              type="number"
              placeholder="Two Wheeler Training price"
              value={formData.twowheelerPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="price">Four Wheeler Price (₹)</label>
            <input
              id="fourwheelerPrice"
              name="fourwheelerPrice"
              type="number"
              placeholder="Four Wheeler Training price (If Service Available)"
              value={formData.fourwheelerPrice}
              onChange={handleChange}
              
            />
          </div>

          <div className="dl-form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Street address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dl-form-row">
            <div className="dl-form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dl-form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dl-form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="dl-form-group">
            <label>Available Time Slots</label>
            <div className="dl-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.availableSlots.morning}
                  onChange={() => handleCheckboxChange("availableSlots", "morning")}
                />
                Morning
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.availableSlots.afternoon}
                  onChange={() => handleCheckboxChange("availableSlots", "afternoon")}
                />
                Afternoon
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.availableSlots.evening}
                  onChange={() => handleCheckboxChange("availableSlots", "evening")}
                />
                Evening
              </label>
            </div>
          </div>

          <div className="dl-form-group">
            <label>Supported Vehicles</label>
            <div className="dl-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.supportedVehicles.twoWheeler}
                  onChange={() => handleCheckboxChange("supportedVehicles", "twoWheeler")}
                />
                Two Wheeler
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.supportedVehicles.fourWheeler}
                  onChange={() => handleCheckboxChange("supportedVehicles", "fourWheeler")}
                />
                Four Wheeler
              </label>
            </div>
          </div>

          <div className="dl-form-group">
            <label htmlFor="password">Create Password</label>
            <div className="dl-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="dl-eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="dl-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="dl-password-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="dl-eye-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {otpSent && (
            <div className="dl-form-group">
              <label htmlFor="otp">OTP Verification</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type={otpSent ? "submit" : "button"}
            className="dl-register-btn"
            onClick={!otpSent ? handleSendOtp : undefined}
          >
            {otpSent ? "Complete Registration" : "Send OTP"}
          </button>

          <p className="dl-login-text">
            Already registered?{" "}
            <span onClick={() => navigate("/dllogin")}>Sign In</span>
          </p>
        </form>
      </div>

      <footer className="dl2-dlp-footer">
        <p onClick={() => navigate("/")}>User Login</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default DlRegisterPage;