import React, { useState, useEffect } from "react";
import "../styles/BookingSessions.css";
import { FaSearch, FaArrowRight, FaArrowLeft, FaCheckCircle, FaGooglePay } from "react-icons/fa";

const BookingSessions = () => {
  const [step, setStep] = useState(1);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idProof: null,
    drivingLicense: null,
    preferences: "",
  });

  // Fetch user's location and nearby driving schools
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchDrivingSchools(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to access your location. Using default location.");
          const defaultLat = 40.7128; // New York (example fallback)
          const defaultLng = -74.0060;
          setUserLocation({ lat: defaultLat, lng: defaultLng });
          fetchDrivingSchools(defaultLat, defaultLng);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const fetchDrivingSchools = async (lat, lng) => {
    setLoading(true);
    try {
      const bboxSize = 0.05; // Approx. 5km radius
      const bbox = `${lng - bboxSize},${lat - bboxSize},${lng + bboxSize},${lat + bboxSize}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=driving+school&bounded=1&viewbox=${bbox}&limit=10`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        console.warn("No driving schools found.");
      }
      
      setSchools(
        data.map((school, index) => ({
          id: index,
          name: school.display_name,
          location: school.address?.road || "Unknown location",
          lat: school.lat,
          lng: school.lon,
          rating: "N/A",
          price: "Price not available",
          openNow: "N/A",
          photo: "default-image.jpg",
        }))
      );
    } catch (error) {
      console.error("Error fetching driving schools:", error);
      alert("Failed to fetch driving schools. Please try again later.");
    }
    setLoading(false);
  };

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileUpload = (e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="stepper">
          {["Search", "Select", "Details", "Payment"].map((label, index) => (
            <div key={index} className={`step ${step >= index + 1 ? "active" : ""}`}>
              {index + 1}. {label}
            </div>
          ))}
        </div>

        {/* Step 1: Search Driving Schools */}
        {step === 1 && (
          <div className="step-content">
            <h1>Find a Driving School Near You</h1>
            <p>Fetching nearby driving schools...</p>
            {loading ? <p>Loading schools...</p> : <button onClick={handleNextStep}><FaSearch /> View Schools</button>}
          </div>
        )}

        {/* Step 2: Select a School */}
        {step === 2 && (
          <div className="step-content">
            <h2>Select a Driving School</h2>
            <div className="schools-grid">
              {schools.length ? (
                schools.map((school) => (
                  <div key={school.id} className="school-card" onClick={() => { setSelectedSchool(school); handleNextStep(); }}>
                    <h3>{school.name}</h3>
                    <p>📍 {school.location}</p>
                  </div>
                ))
              ) : (
                <p className="no-results">No schools found.</p>
              )}
            </div>
            <button className="back-btn" onClick={handlePrevStep}><FaArrowLeft /> Back</button>
          </div>
        )}

        {/* Step 3: Enter Details */}
        {step === 3 && selectedSchool && (
          <div className="step-content">
            <h2>Your Details</h2>
            <form className="booking-form">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
              <input type="text" name="address" placeholder="Your Address" value={formData.address} onChange={handleInputChange} required />
              <textarea name="preferences" placeholder="Special Requests / Preferences" value={formData.preferences} onChange={handleInputChange}></textarea>
              <label>ID Proof:</label>
              <input type="file" name="idProof" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} required />
              <label>Driving License (if any):</label>
              <input type="file" name="drivingLicense" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} />
            </form>
            <button className="next-btn" onClick={handleNextStep}>
              <FaArrowRight /> Next
            </button>
            <button className="back-btn" onClick={handlePrevStep}>
              <FaArrowLeft /> Back
            </button>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="step-content">
            <h2>Payment</h2>
            <p>Select Payment Method</p>
            <div className="payment-options">
              <button className={`payment-btn ${paymentMethod === "PhonePe" ? "selected" : ""}`} onClick={() => setPaymentMethod("PhonePe")}>PhonePe</button>
              <button className={`payment-btn ${paymentMethod === "Paytm" ? "selected" : ""}`} onClick={() => setPaymentMethod("Paytm")}>Paytm</button>
              <button className={`payment-btn ${paymentMethod === "GooglePay" ? "selected" : ""}`} onClick={() => setPaymentMethod("GooglePay")}>
                Google Pay <FaGooglePay />
              </button>
            </div>
            {paymentMethod && (
              <button className="confirm-btn">
                <FaCheckCircle /> Pay with {paymentMethod}
              </button>
            )}
            <button className="back-btn" onClick={handlePrevStep}>
              <FaArrowLeft /> Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSessions;
