import React, { useState, useEffect } from 'react';
import {
  FiHome, FiBook, FiCalendar, FiCreditCard, FiFileText,
  FiDownload, FiUser, FiLock, FiArrowLeft, FiCheck, FiX, FiClock,
  FiEdit, FiEye, FiMessageSquare, FiChevronDown, FiMail, FiPhone
} from 'react-icons/fi';
import './UserDashboard.css';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('schoolSelection');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // User data
  const [user] = useState({
    name: 'Aatif',
    email: 'aatif@example.com',
    phone: '9876543210'
  });

  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loadingSchools, setLoadingSchools] = useState(true);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('userDrivingLicenseFormData');
    return savedData ? JSON.parse(savedData) : {
      fullName: '',
      dob: '',
      gender: '',
      fatherName: '',
      motherName: '',
      bloodGroup: '',
      phone: '',
      alternatePhone: '',
      email: '',
      identificationMark1: '',
      identificationMark2: '',
      vehicleType: '',
      courseStartDate: '',
      permanentAddress: {
        country: 'India',
        state: '',
        district: '',
        city: '',
        pinCode: ''
      },
      correspondenceAddress: {
        country: 'India',
        state: '',
        district: '',
        city: '',
        pinCode: ''
      },
      sameAsPermanent: false,
      ageProof: null,
      addressProof: null,
      photo: null,
      signature: null,
      medicalCert: null,
      termsAccepted: false,
      submitted: false
    };
  });

  const [formErrors, setFormErrors] = useState({});
  const [applicationId] = useState(() => localStorage.getItem('userApplicationId') || '');

  // Payment state
  const [paymentStatus, setPaymentStatus] = useState(() => {
    const savedStatus = localStorage.getItem('userPaymentStatus');
    return savedStatus ? JSON.parse(savedStatus) : {
      completed: false,
      processing: false,
      success: false,
      amount: 0,
      date: '',
      transactionId: ''
    };
  });

  // Training progress
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('userDrivingLicenseProgress');
    if (savedProgress) return JSON.parse(savedProgress);

    // Only initialize progress if form is submitted and payment is completed
    const savedFormData = localStorage.getItem('userDrivingLicenseFormData');
    const savedPaymentStatus = localStorage.getItem('userPaymentStatus');

    if (!savedFormData || !savedPaymentStatus) return null;

    const parsedFormData = JSON.parse(savedFormData);
    const parsedPaymentStatus = JSON.parse(savedPaymentStatus);

    if (!parsedFormData.submitted || !parsedPaymentStatus.completed) return null;

    // Calculate start date from courseStartDate
    const startDate = parsedFormData.courseStartDate ? new Date(parsedFormData.courseStartDate) : new Date();

    return {
      totalClasses: 30,
      attendedClasses: 0,
      classes: Array(30).fill().map((_, i) => ({
        id: i + 1,
        date: new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        time: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'][i % 4],
        attended: false
      })),
      completed: false
    };
  });

  // License application state
  const [licenseStatus, setLicenseStatus] = useState(() => {
    const savedStatus = localStorage.getItem('userLicenseStatus');
    return savedStatus ? JSON.parse(savedStatus) : {
      applied: false,
      approved: false,
      downloaded: false,
      applicationDate: '',
      approvalDate: '',
      licenseNumber: '',
      vehicleType: ''
    };
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  // Calculate progress percentage
  const progressPercentage = progress ? Math.round(
    (progress.attendedClasses / progress.totalClasses) * 100
  ) : 0;

  // Load initial data
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        // Only fetch schools if no school is selected and payment isn't completed
        if (!paymentStatus.completed) {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const mockSchools = [
            {
              id: 1,
              name: 'Safe Wheels Driving School',
              address: '123 MG Road, Bangalore, Karnataka 560001',
              price: 8000,
              rating: 4.7,
              distance: '2.5 km',
              slots: ['Morning', 'Afternoon', 'Evening'],
              phone: '9876543210',
              email: 'safewheels@example.com',
              supportedVehicles: ['twoWheeler', 'fourWheeler']
            },
            {
              id: 2,
              name: 'Expert Drivers Institute',
              address: '456 Brigade Road, Bangalore, Karnataka 560025',
              price: 7500,
              rating: 4.5,
              distance: '3.1 km',
              slots: ['Morning', 'Evening'],
              phone: '8765432109',
              email: 'expertdrivers@example.com',
              supportedVehicles: ['twoWheeler']
            },
            {
              id: 3,
              name: 'City Driving Academy',
              address: '789 Residency Road, Bangalore, Karnataka 560002',
              price: 9000,
              rating: 4.9,
              distance: '1.8 km',
              slots: ['Afternoon'],
              phone: '7654321098',
              email: 'citydriving@example.com',
              supportedVehicles: ['fourWheeler']
            }
          ];

          setSchools(mockSchools);
        }
        setLoadingSchools(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, [paymentStatus.completed]);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('userDrivingLicenseFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (progress) {
      localStorage.setItem('userDrivingLicenseProgress', JSON.stringify(progress));
    }
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('userPaymentStatus', JSON.stringify(paymentStatus));
  }, [paymentStatus]);

  useEffect(() => {
    localStorage.setItem('userLicenseStatus', JSON.stringify(licenseStatus));
  }, [licenseStatus]);
  useEffect(() => {
    if (paymentStatus.completed && !progress) {
      const startDate = formData.courseStartDate ? new Date(formData.courseStartDate) : new Date();
      
      while (startDate.getDay() === 0 || startDate.getDay() === 6) {
        startDate.setDate(startDate.getDate() + 1);
      }
  
      const classes = [];
      let currentDate = new Date(startDate);
      let classCount = 0;
      
      while (classCount < 30) {
        const dayOfWeek = currentDate.getDay();
        
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          classes.push({
            id: classCount + 1,
            date: currentDate.toISOString().split('T')[0],
            time: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'][classCount % 4],
            attended: false
          });
          classCount++;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      setProgress({
        totalClasses: 30,
        attendedClasses: 0,
        classes: classes,
        completed: false
      });
    }
  }, [paymentStatus.completed, formData.courseStartDate, progress]);

  // Set initial view based on application status
  useEffect(() => {
    const savedPaymentStatus = localStorage.getItem('userPaymentStatus');
    if (savedPaymentStatus) {
      const parsedPaymentStatus = JSON.parse(savedPaymentStatus);
      if (parsedPaymentStatus.completed) {
        setCurrentView('progressTracker');
        return;
      }
    }

    const savedFormData = localStorage.getItem('userDrivingLicenseFormData');
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      if (parsedFormData.submitted) {
        setCurrentView('payment');
        return;
      }
    }

    const savedSchool = localStorage.getItem('userSelectedSchool');
    if (savedSchool) {
      setSelectedSchool(JSON.parse(savedSchool));
      setCurrentView('bookingForm');
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'fullName', 'dob', 'gender', 'fatherName', 'motherName',
      'phone', 'identificationMark1', 'identificationMark2',
      'vehicleType', 'courseStartDate'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });

    if (formData.fullName && !/^[a-zA-Z ]{3,}$/.test(formData.fullName)) {
      errors.fullName = 'Invalid name (min 3 letters)';
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Invalid mobile number (10 digits)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (formData.courseStartDate && new Date(formData.courseStartDate) < new Date()) {
      errors.courseStartDate = 'Start date must be in the future';
    }

    const validateAddress = (address, prefix) => {
      if (!address.state) errors[`${prefix}.state`] = 'Required';
      if (!address.district) errors[`${prefix}.district`] = 'Required';
      if (!address.city) errors[`${prefix}.city`] = 'Required';
      if (!/^[0-9]{6}$/.test(address.pinCode)) {
        errors[`${prefix}.pinCode`] = 'Invalid PIN code (6 digits)';
      }
    };

    validateAddress(formData.permanentAddress, 'permanentAddress');

    if (!formData.sameAsPermanent) {
      validateAddress(formData.correspondenceAddress, 'correspondenceAddress');
    }

    const requiredDocuments = ['ageProof', 'addressProof', 'photo', 'signature'];
    requiredDocuments.forEach(doc => {
      if (!formData[doc]) errors[doc] = 'This document is required';
    });

    if (!formData.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('permanentAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        permanentAddress: {
          ...prev.permanentAddress,
          [field]: value
        }
      }));
    } else if (name.startsWith('correspondenceAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        correspondenceAddress: {
          ...prev.correspondenceAddress,
          [field]: value
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));

      if (name === 'sameAsPermanent' && checked) {
        setFormData(prev => ({
          ...prev,
          correspondenceAddress: { ...prev.permanentAddress }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = {
      ageProof: ['application/pdf', 'image/jpeg', 'image/png'],
      addressProof: ['application/pdf', 'image/jpeg', 'image/png'],
      photo: ['image/jpeg', 'image/png'],
      signature: ['image/jpeg', 'image/png'],
      medicalCert: ['application/pdf', 'image/jpeg', 'image/png']
    };

    if (validTypes[field] && !validTypes[field].includes(file.type)) {
      setFormErrors(prev => ({
        ...prev,
        [field]: `Invalid file type. Accepted: ${validTypes[field].join(', ')}`
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFormErrors(prev => ({
        ...prev,
        [field]: 'File size must be less than 2MB'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: file
    }));

    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSelectSchool = (school) => {
    setSelectedSchool(school);
    localStorage.setItem('userSelectedSchool', JSON.stringify(school));
    setCurrentView('bookingForm');
  };

  const previewForm = () => {
    setModalTitle('Application Preview');
    setModalContent(
      <div className="user-form-preview">
        <h3>Personal Details</h3>
        <div className="user-preview-section">
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Date of Birth:</strong> {new Date(formData.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Father's Name:</strong> {formData.fatherName}</p>
          <p><strong>Mother's Name:</strong> {formData.motherName}</p>
          <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Alternate Phone:</strong> {formData.alternatePhone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Identification Mark 1:</strong> {formData.identificationMark1}</p>
          <p><strong>Identification Mark 2:</strong> {formData.identificationMark2}</p>
          <p><strong>Vehicle Type:</strong> {formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'}</p>
          <p><strong>Course Start Date:</strong> {new Date(formData.courseStartDate).toLocaleDateString()}</p>
        </div>

        <h3>Address Details</h3>
        <div className="user-preview-section">
          <h4>Permanent Address</h4>
          <p><strong>Country:</strong> {formData.permanentAddress.country}</p>
          <p><strong>State:</strong> {formData.permanentAddress.state}</p>
          <p><strong>District:</strong> {formData.permanentAddress.district}</p>
          <p><strong>City/Village:</strong> {formData.permanentAddress.city}</p>
          <p><strong>PIN Code:</strong> {formData.permanentAddress.pinCode}</p>

          <h4>Correspondence Address</h4>
          {formData.sameAsPermanent ? (
            <p>Same as Permanent Address</p>
          ) : (
            <>
              <p><strong>Country:</strong> {formData.correspondenceAddress.country}</p>
              <p><strong>State:</strong> {formData.correspondenceAddress.state}</p>
              <p><strong>District:</strong> {formData.correspondenceAddress.district}</p>
              <p><strong>City/Village:</strong> {formData.correspondenceAddress.city}</p>
              <p><strong>PIN Code:</strong> {formData.correspondenceAddress.pinCode}</p>
            </>
          )}
        </div>

        <div className="user-form-actions">
          <button
            className="user-btn user-btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          {!formData.submitted && (
            <button
              className="user-btn user-btn-primary"
              onClick={() => {
                setShowModal(false);
                handleSubmitForm();
              }}
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    );
    setShowModal(true);
  };

  const handleSubmitForm = (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) return;

    if (!applicationId) {
      const newAppId = 'LL' + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('userApplicationId', newAppId);
    }

    setFormData(prev => ({
      ...prev,
      submitted: true
    }));

    setCurrentView('payment');
  };

  const handlePayment = async () => {
    setPaymentStatus(prev => ({
      ...prev,
      processing: true
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    const transactionId = 'TRX' + Math.floor(10000000 + Math.random() * 90000000);

    setPaymentStatus({
      completed: true,
      processing: false,
      success: true,
      amount: selectedSchool.price,
      date: new Date().toISOString(),
      transactionId
    });

    setCurrentView('progressTracker');
  };

  const generateFormPDF = () => {
    const pdfContent = `
      Driving License Application Form
      ---------------------------------
      Application ID: ${applicationId}
      Date: ${new Date().toLocaleDateString()}
      
      Personal Details:
      - Name: ${formData.fullName}
      - DOB: ${new Date(formData.dob).toLocaleDateString()}
      - Gender: ${formData.gender}
      - Father: ${formData.fatherName}
      - Mother: ${formData.motherName}
      - Phone: ${formData.phone}
      - Vehicle Type: ${formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'}
      - Course Start Date: ${new Date(formData.courseStartDate).toLocaleDateString()}
      
      School Details:
      - Name: ${selectedSchool.name}
      - Address: ${selectedSchool.address}
      - Contact: ${selectedSchool.phone}, ${selectedSchool.email}
      - Fee: ₹${selectedSchool.price}
      
      Status: Payment Received
      Payment Date: ${new Date(paymentStatus.date).toLocaleDateString()}
      Transaction ID: ${paymentStatus.transactionId}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DL_Application_${applicationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyLicense = async () => {
    setPaymentStatus(prev => ({
      ...prev,
      processing: true
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    setLicenseStatus({
      applied: true,
      approved: false,
      downloaded: false,
      applicationDate: new Date().toISOString(),
      approvalDate: '',
      licenseNumber: '',
      vehicleType: formData.vehicleType
    });

    setTimeout(() => {
      setLicenseStatus(prev => ({
        ...prev,
        approved: true,
        approvalDate: new Date().toISOString(),
        licenseNumber: `DL${Math.floor(10000000 + Math.random() * 90000000)}`
      }));
      setCurrentView('licenseDownload');
    }, 5000);
  };

  const handleDownloadLicense = () => {
    const licenseContent = `
      DRIVING LICENSE
      --------------------------------
      License No: ${licenseStatus.licenseNumber}
      Name: ${formData.fullName}
      DOB: ${new Date(formData.dob).toLocaleDateString()}
      Valid From: ${new Date(licenseStatus.approvalDate).toLocaleDateString()}
      Valid Until: ${new Date(new Date(licenseStatus.approvalDate).setFullYear(
      new Date(licenseStatus.approvalDate).getFullYear() + 20
    )).toLocaleDateString()}
      Blood Group: ${formData.bloodGroup}
      Vehicle Type: ${licenseStatus.vehicleType === 'twoWheeler' ? 'MCWG (Motorcycle With Gear)' : 'LMV (Light Motor Vehicle)'}
      Address: ${formData.permanentAddress.city}, ${formData.permanentAddress.state}
      
      Issuing Authority:
      DL Easy, ${selectedSchool.address.split(',')[2]?.trim() || 'New Delhi'}
    `;

    const blob = new Blob([licenseContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Driving_License_${formData.fullName.replace(' ', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setLicenseStatus(prev => ({
      ...prev,
      downloaded: true
    }));
  };

  const showChangePasswordModal = () => {
    setModalTitle('Change Password');
    setModalContent(
      <div className="user-modal-form">
        <div className="user-form-group">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" required />
        </div>
        <div className="user-form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            pattern=".{8,}"
            title="Minimum 8 characters"
            required
          />
        </div>
        <div className="user-form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" required />
        </div>
        <div className="user-form-actions">
          <button
            className="user-btn user-btn-primary"
            onClick={() => {
              alert('Password changed successfully!');
              setShowModal(false);
            }}
          >
            Change Password
          </button>
          <button
            className="user-btn user-btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
    setShowModal(true);
    setShowUserDropdown(false);
  };

  const showContactSchoolModal = () => {
    if (!selectedSchool) return;

    setModalTitle(`Contact ${selectedSchool.name}`);
    setModalContent(
      <div className="user-contact-school">
        <div className="user-contact-method">
          <FiPhone className="user-contact-icon" />
          <div>
            <h4>Phone</h4>
            <p>{selectedSchool.phone}</p>
          </div>
        </div>
        <div className="user-contact-method">
          <FiMail className="user-contact-icon" />
          <div>
            <h4>Email</h4>
            <p>{selectedSchool.email}</p>
          </div>
        </div>
        <div className="user-contact-method">
          <FiHome className="user-contact-icon" />
          <div>
            <h4>Address</h4>
            <p>{selectedSchool.address}</p>
          </div>
        </div>
        <div className="user-form-actions">
          <button
            className="user-btn user-btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  const getAvailableViews = () => {
    const views = [];

    if (!paymentStatus.completed) {
      if (!selectedSchool && !formData.submitted) {
        views.push('schoolSelection');
      }

      if (selectedSchool || formData.submitted) {
        views.push('bookingForm');
      }

      if (formData.submitted) {
        views.push('payment');
      }
    } else {
      views.push('progressTracker');

      if (progress?.completed) {
        views.push('applyLicense');
      }

      if (licenseStatus.approved) {
        views.push('licenseDownload');
      }
    }

    return views;
  };

  const renderSchoolSelection = () => (
    <div className="user-content-section">
      <h2 className="user-section-title">Select a Driving School</h2>
      {loadingSchools ? (
        <div className="user-loading-spinner">Loading schools...</div>
      ) : (
        <div className="user-schools-grid">
          {schools.map(school => (
            <div key={school.id} className="user-school-card">
              <div className="user-school-header">
                <h3>{school.name}</h3>
                <div className="user-school-rating">
                  <span className="user-stars">★★★★★</span>
                  <span>{school.rating}</span>
                </div>
              </div>
              <div className="user-school-details">
                <p><strong>Address:</strong> {school.address}</p>
                <p><strong>Price:</strong> ₹{school.price}</p>
                <p><strong>Distance:</strong> {school.distance}</p>
                <p><strong>Available Slots:</strong> {school.slots.join(', ')}</p>
                <p><strong>Supported Vehicles:</strong> {school.supportedVehicles.map(v =>
                  v === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'
                ).join(', ')}</p>
                <div className="user-school-contact">
                  <p><strong>Contact:</strong> {school.phone}</p>
                  <p><strong>Email:</strong> {school.email}</p>
                </div>
              </div>
              <button
                className="user-btn user-btn-primary"
                onClick={() => handleSelectSchool(school)}
              >
                Select This School
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBookingForm = () => {
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));

      if (name === 'sameAsPermanent' && checked) {
        setFormData(prev => ({
          ...prev,
          correspondenceAddress: { ...prev.permanentAddress }
        }));
      }
    };

    return (
      <div className="user-content-section">
        <div className="user-section-header">
          {!formData.submitted && (
            <button
              className="user-btn user-btn-secondary user-btn-icon"
              onClick={() => setCurrentView('schoolSelection')}
            >
              <FiArrowLeft /> Back
            </button>
          )}
          <h2 className="user-section-title">Driving License Application Form</h2>

          {applicationId && (
            <div className="user-application-id">
              Application ID: <strong>{applicationId}</strong>
            </div>
          )}
        </div>

        {formData.submitted ? (
          <div className="user-form-submitted-view">
            <div className="user-submitted-message">
              <FiCheck className="user-success-icon" />
              <h3>Application Submitted Successfully!</h3>
              <p>Your application has been submitted. You can now proceed to payment.</p>
            </div>

            <div className="user-form-actions">
              <button
                className="user-btn user-btn-primary user-btn-icon"
                onClick={previewForm}
              >
                <FiEye /> View Application
              </button>
              <button
                className="user-btn user-btn-primary"
                onClick={() => setCurrentView('payment')}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitForm} className="user-booking-form">
            <div className="user-form-section">
              <h3>Personal Details</h3>
              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Full Name (as per Aadhaar)</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={formErrors.fullName ? 'user-error' : ''}
                  />
                  {formErrors.fullName && <span className="user-error-message">{formErrors.fullName}</span>}
                </div>
                <div className="user-form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={formErrors.dob ? 'user-error' : ''}
                  />
                  {formErrors.dob && <span className="user-error-message">{formErrors.dob}</span>}
                </div>
              </div>

              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={formErrors.gender ? 'user-error' : ''}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && <span className="user-error-message">{formErrors.gender}</span>}
                </div>
                <div className="user-form-group">
                  <label>Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={formErrors.fatherName ? 'user-error' : ''}
                  />
                  {formErrors.fatherName && <span className="user-error-message">{formErrors.fatherName}</span>}
                </div>
              </div>

              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                    className={formErrors.motherName ? 'user-error' : ''}
                  />
                  {formErrors.motherName && <span className="user-error-message">{formErrors.motherName}</span>}
                </div>
                <div className="user-form-group">
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? 'user-error' : ''}
                  />
                  {formErrors.phone && <span className="user-error-message">{formErrors.phone}</span>}
                </div>
                <div className="user-form-group">
                  <label>Alternate Phone Number</label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className={formErrors.alternatePhone ? 'user-error' : ''}
                  />
                  {formErrors.alternatePhone && <span className="user-error-message">{formErrors.alternatePhone}</span>}
                </div>
              </div>

              <div className="user-form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'user-error' : ''}
                />
                {formErrors.email && <span className="user-error-message">{formErrors.email}</span>}
              </div>

              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Identification Mark 1</label>
                  <input
                    type="text"
                    name="identificationMark1"
                    value={formData.identificationMark1}
                    onChange={handleInputChange}
                    className={formErrors.identificationMark1 ? 'user-error' : ''}
                  />
                  {formErrors.identificationMark1 && <span className="user-error-message">{formErrors.identificationMark1}</span>}
                </div>
                <div className="user-form-group">
                  <label>Identification Mark 2</label>
                  <input
                    type="text"
                    name="identificationMark2"
                    value={formData.identificationMark2}
                    onChange={handleInputChange}
                    className={formErrors.identificationMark2 ? 'user-error' : ''}
                  />
                  {formErrors.identificationMark2 && <span className="user-error-message">{formErrors.identificationMark2}</span>}
                </div>
              </div>

              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className={formErrors.vehicleType ? 'user-error' : ''}
                  >
                    <option value="">Select Vehicle Type</option>
                    <option
                      value="twoWheeler"
                      disabled={selectedSchool && !selectedSchool.supportedVehicles.includes('twoWheeler')}
                    >
                      Two Wheeler
                    </option>
                    <option
                      value="fourWheeler"
                      disabled={selectedSchool && !selectedSchool.supportedVehicles.includes('fourWheeler')}
                    >
                      Four Wheeler
                    </option>
                  </select>
                  {formErrors.vehicleType && <span className="user-error-message">{formErrors.vehicleType}</span>}
                </div>
                <div className="user-form-group">
                  <label>Preferred Course Start Date</label>
                  <input
                    type="date"
                    name="courseStartDate"
                    value={formData.courseStartDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={formErrors.courseStartDate ? 'user-error' : ''}
                  />
                  {formErrors.courseStartDate && <span className="user-error-message">{formErrors.courseStartDate}</span>}
                </div>
              </div>
            </div>

            <div className="user-form-section">
              <h3>Address Details</h3>

              <div className="user-address-section">
                <h4>Permanent Address</h4>
                <div className="user-form-row">
                  <div className="user-form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="permanentAddress.country"
                      value={formData.permanentAddress.country}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="user-form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="permanentAddress.state"
                      value={formData.permanentAddress.state}
                      onChange={handleInputChange}
                      className={formErrors['permanentAddress.state'] ? 'user-error' : ''}
                    />
                    {formErrors['permanentAddress.state'] && <span className="user-error-message">{formErrors['permanentAddress.state']}</span>}
                  </div>
                </div>

                <div className="user-form-row">
                  <div className="user-form-group">
                    <label>District</label>
                    <input
                      type="text"
                      name="permanentAddress.district"
                      value={formData.permanentAddress.district}
                      onChange={handleInputChange}
                      className={formErrors['permanentAddress.district'] ? 'user-error' : ''}
                    />
                    {formErrors['permanentAddress.district'] && <span className="user-error-message">{formErrors['permanentAddress.district']}</span>}
                  </div>
                  <div className="user-form-group">
                    <label>City/Village</label>
                    <input
                      type="text"
                      name="permanentAddress.city"
                      value={formData.permanentAddress.city}
                      onChange={handleInputChange}
                      className={formErrors['permanentAddress.city'] ? 'user-error' : ''}
                    />
                    {formErrors['permanentAddress.city'] && <span className="user-error-message">{formErrors['permanentAddress.city']}</span>}
                  </div>
                </div>

                <div className="user-form-group">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    name="permanentAddress.pinCode"
                    value={formData.permanentAddress.pinCode}
                    onChange={handleInputChange}
                    className={formErrors['permanentAddress.pinCode'] ? 'user-error' : ''}
                  />
                  {formErrors['permanentAddress.pinCode'] && <span className="user-error-message">{formErrors['permanentAddress.pinCode']}</span>}
                </div>
              </div>

              <div className="user-address-section">
                <div className="user-same-address-checkbox">
                  <input
                    type="checkbox"
                    id="sameAsPermanent"
                    name="sameAsPermanent"
                    checked={formData.sameAsPermanent}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="sameAsPermanent">Correspondence Address same as Permanent Address</label>
                </div>

                {!formData.sameAsPermanent && (
                  <>
                    <h4>Correspondence Address</h4>
                    <div className="user-form-row">
                      <div className="user-form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          name="correspondenceAddress.country"
                          value={formData.correspondenceAddress.country}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      <div className="user-form-group">
                        <label>State</label>
                        <input
                          type="text"
                          name="correspondenceAddress.state"
                          value={formData.correspondenceAddress.state}
                          onChange={handleInputChange}
                          className={formErrors['correspondenceAddress.state'] ? 'user-error' : ''}
                        />
                        {formErrors['correspondenceAddress.state'] && <span className="user-error-message">{formErrors['correspondenceAddress.state']}</span>}
                      </div>
                    </div>

                    <div className="user-form-row">
                      <div className="user-form-group">
                        <label>District</label>
                        <input
                          type="text"
                          name="correspondenceAddress.district"
                          value={formData.correspondenceAddress.district}
                          onChange={handleInputChange}
                          className={formErrors['correspondenceAddress.district'] ? 'user-error' : ''}
                        />
                        {formErrors['correspondenceAddress.district'] && <span className="user-error-message">{formErrors['correspondenceAddress.district']}</span>}
                      </div>
                      <div className="user-form-group">
                        <label>City/Village</label>
                        <input
                          type="text"
                          name="correspondenceAddress.city"
                          value={formData.correspondenceAddress.city}
                          onChange={handleInputChange}
                          className={formErrors['correspondenceAddress.city'] ? 'user-error' : ''}
                        />
                        {formErrors['correspondenceAddress.city'] && <span className="user-error-message">{formErrors['correspondenceAddress.city']}</span>}
                      </div>
                    </div>

                    <div className="user-form-group">
                      <label>PIN Code</label>
                      <input
                        type="text"
                        name="correspondenceAddress.pinCode"
                        value={formData.correspondenceAddress.pinCode}
                        onChange={handleInputChange}
                        className={formErrors['correspondenceAddress.pinCode'] ? 'user-error' : ''}
                      />
                      {formErrors['correspondenceAddress.pinCode'] && <span className="user-error-message">{formErrors['correspondenceAddress.pinCode']}</span>}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="user-form-section">
              <h3>Required Documents</h3>
              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Proof of Age (Aadhaar, Birth Certificate, etc.)</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'ageProof')}
                    className={formErrors.ageProof ? 'user-error' : ''}
                  />
                  {formErrors.ageProof && <span className="user-error-message">{formErrors.ageProof}</span>}
                  {formData.ageProof && (
                    <div className="user-file-info">
                      Selected: {formData.ageProof.name || 'File selected'}
                    </div>
                  )}
                </div>
                <div className="user-form-group">
                  <label>Proof of Address (Aadhaar, Voter ID, etc.)</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'addressProof')}
                    className={formErrors.addressProof ? 'user-error' : ''}
                  />
                  {formErrors.addressProof && <span className="user-error-message">{formErrors.addressProof}</span>}
                  {formData.addressProof && (
                    <div className="user-file-info">
                      Selected: {formData.addressProof.name || 'File selected'}
                    </div>
                  )}
                </div>
              </div>

              <div className="user-form-row">
                <div className="user-form-group">
                  <label>Passport-size Photograph</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photo')}
                    className={formErrors.photo ? 'user-error' : ''}
                  />
                  {formErrors.photo && <span className="user-error-message">{formErrors.photo}</span>}
                  {formData.photo && (
                    <div className="user-file-info">
                      Selected: {formData.photo.name || 'File selected'}
                    </div>
                  )}
                </div>
                <div className="user-form-group">
                  <label>Scanned Signature</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'signature')}
                    className={formErrors.signature ? 'user-error' : ''}
                  />
                  {formErrors.signature && <span className="user-error-message">{formErrors.signature}</span>}
                  {formData.signature && (
                    <div className="user-file-info">
                      Selected: {formData.signature.name || 'File selected'}
                    </div>
                  )}
                </div>
              </div>

              <div className="user-form-group">
                <label>Medical Certificate (Form 1A, if above 40 years)</label>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'medicalCert')}
                />
                {formData.medicalCert && (
                  <div className="user-file-info">
                    Selected: {formData.medicalCert.name || 'File selected'}
                  </div>
                )}
              </div>
            </div>

            <div className="user-form-section user-terms-section">
              <div className="user-terms-checkbox">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className={formErrors.termsAccepted ? 'user-error' : ''}
                />
                <label htmlFor="termsAccepted">
                  I hereby declare that the information provided is true and correct to the best of my knowledge.
                  I understand that any false information may lead to rejection of my application.
                </label>
              </div>
              {formErrors.termsAccepted && <span className="user-error-message">{formErrors.termsAccepted}</span>}
            </div>

            <div className="user-form-actions">
              <button
                type="button"
                className="user-btn user-btn-secondary user-btn-icon"
                onClick={previewForm}
              >
                <FiEye /> Preview
              </button>
              <button type="submit" className="user-btn user-btn-primary">
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const renderPayment = () => (
    <div className="user-content-section user-payment-section">
      <div className="user-section-header">
        <button
          className="user-btn user-btn-secondary user-btn-icon"
          onClick={() => setCurrentView('bookingForm')}
        >
          <FiArrowLeft /> Back
        </button>
        <h2 className="user-section-title">Complete Your Payment</h2>
      </div>

      <div className="user-payment-container">
        <div className="user-payment-summary-card">
          <div className="user-payment-header">
            <h3>Payment Summary</h3>
            <div className="user-application-id">Application ID: {applicationId}</div>
          </div>

          <div className="user-payment-details">
            <div className="user-detail-row">
              <span>Driving School:</span>
              <span className="user-detail-value">{selectedSchool.name}</span>
            </div>
            <div className="user-detail-row">
              <span>Address:</span>
              <span className="user-detail-value">{selectedSchool.address}</span>
            </div>
            <div className="user-detail-row">
              <span>Contact:</span>
              <span className="user-detail-value">{selectedSchool.phone}, {selectedSchool.email}</span>
            </div>
            <div className="user-detail-row">
              <span>Vehicle Type:</span>
              <span className="user-detail-value">
                {formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'}
              </span>
            </div>
            <div className="user-detail-row">
              <span>Course Start Date:</span>
              <span className="user-detail-value">
                {new Date(formData.courseStartDate).toLocaleDateString()}
              </span>
            </div>
            <div className="user-detail-row user-total">
              <span>Total Amount:</span>
              <span className="user-detail-value">₹{selectedSchool.price}</span>
            </div>
          </div>
        </div>

        {!paymentStatus.success ? (
          <div className="user-payment-method-card">
            <div className="user-payment-method-header">
              <h3>UPI Payment</h3>
            </div>

            <div className="user-upi-payment">
              <div className="user-upi-header">
                <div className="user-upi-logo">UPI</div>
                <span>Pay via any UPI app</span>
              </div>

              <div className="user-form-group">
                <label>Enter UPI ID</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210@upi"
                  className="user-upi-input"
                  required
                />
              </div>

              <div className="user-payment-security">
                <div className="user-security-badge">
                  <FiLock /> Secure Payment
                </div>
                <p>Your payment is secured with 256-bit encryption</p>
              </div>

              <div className="user-payment-actions">
                <button
                  className="user-btn user-btn-primary user-pay-now-btn"
                  onClick={handlePayment}
                  disabled={paymentStatus.processing}
                >
                  {paymentStatus.processing ? (
                    <span className="user-processing-payment">
                      <span className="user-spinner"></span> Processing Payment...
                    </span>
                  ) : (
                    `Pay ₹${selectedSchool.price}`
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="user-payment-success-card">
            <div className="user-success-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <h3>Payment Received Successfully!</h3>
            <p className="user-success-message">Your payment of ₹{selectedSchool.price} has been processed successfully.</p>

            <div className="user-payment-receipt">
              <div className="user-receipt-row">
                <span>Transaction ID:</span>
                <span>{paymentStatus.transactionId}</span>
              </div>
              <div className="user-receipt-row">
                <span>Date & Time:</span>
                <span>{new Date(paymentStatus.date).toLocaleString()}</span>
              </div>
              <div className="user-receipt-row">
                <span>Payment Method:</span>
                <span>UPI</span>
              </div>
              <div className="user-receipt-row">
                <span>Vehicle Type:</span>
                <span>{formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'}</span>
              </div>
              <div className="user-receipt-row">
                <span>Course Start Date:</span>
                <span>{new Date(formData.courseStartDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="user-payment-success-actions">
              <button
                className="user-btn user-btn-secondary user-btn-icon"
                onClick={generateFormPDF}
              >
                <FiDownload /> Download Receipt
              </button>
              <button
                className="user-btn user-btn-primary"
                onClick={() => setCurrentView('progressTracker')}
              >
                View Training Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProgressTracker = () => {
    if (!progress) {
      return (
        <div className="user-content-section">
          <div className="user-loading-spinner">Loading your progress...</div>
        </div>
      );
    }

    return (
      <div className="user-content-section user-progress-section">
        <div className="user-progress-header">
          <h2 className="user-section-title">Your Learning Journey</h2>
          <div className="user-application-id">Application ID: {applicationId}</div>
        </div>

        <div className="user-progress-container">
          <div className="user-progress-card">
            <div className="user-progress-visual">
              <div className="user-circular-progress">
                <svg className="user-progress-ring" viewBox="0 0 100 100">
                  <circle className="user-progress-ring-circle-bg" cx="50" cy="50" r="45" />
                  <circle
                    className="user-progress-ring-circle"
                    cx="50" cy="50" r="45"
                    style={{
                      strokeDasharray: `${(progressPercentage / 100) * 283} 283`
                    }}
                  />
                </svg>
                <div className="user-progress-percentage">{progressPercentage}%</div>
              </div>

              <div className="user-progress-stats">
                <div className="user-stat">
                  <div className="user-stat-value">{progress.attendedClasses}</div>
                  <div className="user-stat-label">Classes Attended</div>
                </div>
                <div className="user-stat">
                  <div className="user-stat-value">{progress.totalClasses - progress.attendedClasses}</div>
                  <div className="user-stat-label">Classes Remaining</div>
                </div>
                <div className="user-stat">
                  <div className="user-stat-value">
                    {formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'}
                  </div>
                  <div className="user-stat-label">Vehicle Type</div>
                </div>
              </div>
            </div>

            <div className="user-progress-details">
              <div className="user-progress-actions">
                <h3>Your Class Schedule</h3>
                <button
                  className="user-btn user-btn-secondary user-btn-icon"
                  onClick={showContactSchoolModal}
                >
                  <FiMessageSquare /> Contact School
                </button>
              </div>
              <div className="user-classes-timeline">
                {progress.classes.map(cls => (
                  <div key={cls.id} className={`user-class-item ${cls.attended ? 'user-attended' : ''}`}>
                    <div className="user-class-indicator">
                      {cls.attended ? <FiCheck className="user-attended-icon" /> : <FiClock className="user-pending-icon" />}
                    </div>
                    <div className="user-class-info">
                      <div className="user-class-number">Class {cls.id}</div>
                      <div className="user-class-date">
                        {new Date(cls.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })} • {cls.time}
                      </div>
                      <div className="user-class-status">
                        {cls.attended ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {progress.completed && (
          <div className="user-progress-complete-card">
            <div className="user-complete-icon">🎉</div>
            <h3>Congratulations on Completing Your Training!</h3>
            <p>You've successfully completed all {progress.totalClasses} classes for {formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'} training. You're now eligible to apply for your driving license test.</p>

            <button
              className="user-btn user-btn-primary"
              onClick={() => setCurrentView('applyLicense')}
            >
              Apply for Driving License
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderApplyLicense = () => (
    <div className="user-content-section user-license-section">
      <div className="user-license-header">
        <h2 className="user-section-title">Driving License Application</h2>
        <div className="user-application-id">Application ID: {applicationId}</div>
      </div>

      <div className="user-license-process">
        <div className="user-process-steps">
          <div className="user-step user-completed">
            <div className="user-step-number">1</div>
            <div className="user-step-info">
              <h4>Complete Training</h4>
              <p>Attend all {progress.totalClasses} classes</p>
            </div>
          </div>

          <div className={`user-step ${licenseStatus.applied ? 'user-completed' : 'user-active'}`}>
            <div className="user-step-number">2</div>
            <div className="user-step-info">
              <h4>Apply for License</h4>
              <p>Submit application and pay fees</p>
            </div>
          </div>

          <div className={`user-step ${licenseStatus.approved ? 'user-completed' : licenseStatus.applied ? 'user-active' : ''}`}>
            <div className="user-step-number">3</div>
            <div className="user-step-info">
              <h4>License Approval</h4>
              <p>Processing and verification</p>
            </div>
          </div>

          <div className={`user-step ${licenseStatus.downloaded ? 'user-completed' : licenseStatus.approved ? 'user-active' : ''}`}>
            <div className="user-step-number">4</div>
            <div className="user-step-info">
              <h4>Download License</h4>
              <p>Get your digital driving license</p>
            </div>
          </div>
        </div>

        <div className="user-license-content">
          {!licenseStatus.applied ? (
            <div className="user-license-application">
              <h3>License Application Details</h3>

              <div className="user-fee-card">
                <div className="user-fee-header">
                  <h4>License Fee Breakdown</h4>
                </div>
                <div className="user-fee-details">
                  <div className="user-fee-row">
                    <span>License Application Fee</span>
                    <span>₹500</span>
                  </div>
                  <div className="user-fee-row">
                    <span>Processing Charges</span>
                    <span>₹100</span>
                  </div>
                  <div className="user-fee-row user-total">
                    <span>Total Payable</span>
                    <span>₹600</span>
                  </div>
                  <div className="user-test-info">
                    <span>Vehicle Type:</span>
                    <span>{formData.vehicleType === 'twoWheeler' ? 'Two Wheeler (MCWG)' : 'Four Wheeler (LMV)'}</span>
                  </div>
                </div>
              </div>

              <div className="user-payment-actions">
                <button
                  className="user-btn user-btn-primary"
                  onClick={handleApplyLicense}
                  disabled={paymentStatus.processing}
                >
                  {paymentStatus.processing ? 'Processing Payment...' : 'Pay & Apply'}
                </button>
              </div>
            </div>
          ) : !licenseStatus.approved ? (
            <div className="user-application-status">
              <div className="user-status-icon">⏳</div>
              <h3>Application Submitted Successfully!</h3>
              <p>Your driving license application for {formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'} is being processed. This usually takes 3-5 working days.</p>

              <div className="user-status-details">
                <div className="user-detail">
                  <span>Application Number:</span>
                  <strong>DL-APP-{applicationId}</strong>
                </div>
                <div className="user-detail">
                  <span>Vehicle Type:</span>
                  <strong>{formData.vehicleType === 'twoWheeler' ? 'Two Wheeler (MCWG)' : 'Four Wheeler (LMV)'}</strong>
                </div>
              </div>

              <p className="user-note">You'll receive an SMS and email once your license is approved and ready for download.</p>
            </div>
          ) : (
            <div className="user-license-ready">
              <div className="user-ready-icon">✅</div>
              <h3>Your Driving License is Ready!</h3>
              <p>Congratulations! Your {formData.vehicleType === 'twoWheeler' ? 'Two Wheeler' : 'Four Wheeler'} driving license has been approved and is now available for download.</p>

              <div className="user-license-details">
                <div className="user-detail">
                  <span>License Number:</span>
                  <strong>{licenseStatus.licenseNumber}</strong>
                </div>
                <div className="user-detail">
                  <span>Vehicle Type:</span>
                  <strong>{licenseStatus.vehicleType === 'twoWheeler' ? 'MCWG (Motorcycle With Gear)' : 'LMV (Light Motor Vehicle)'}</strong>
                </div>
                <div className="user-detail">
                  <span>Valid From:</span>
                  <strong>{new Date(licenseStatus.approvalDate).toLocaleDateString()}</strong>
                </div>
                <div className="user-detail">
                  <span>Valid Until:</span>
                  <strong>
                    {new Date(new Date(licenseStatus.approvalDate).setFullYear(
                      new Date(licenseStatus.approvalDate).getFullYear() + 20
                    )).toLocaleDateString()}
                  </strong>
                </div>
              </div>

              <button
                className="user-btn user-btn-primary user-btn-icon"
                onClick={handleDownloadLicense}
              >
                <FiDownload /> Download License
              </button>

              <p className="user-email-note">A copy has been sent to your registered email: {formData.email || 'john.doe@example.com'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLicenseDownload = () => (
    <div className="user-content-section user-download-section">
      <h2 className="user-section-title">Your Driving License</h2>

      <div className="user-license-card">
        <div className="user-license-header">
          <h3>Driving License</h3>
          <div className="user-license-number">{licenseStatus.licenseNumber}</div>
        </div>

        <div className="user-license-details">
          <div className="user-license-photo">
            <div className="user-photo-placeholder">Photo</div>
          </div>

          <div className="user-license-info">
            <p><strong>Name:</strong> {formData.fullName || 'John Doe'}</p>
            <p><strong>DOB:</strong> {new Date(formData.dob).toLocaleDateString() || '01/01/1990'}</p>
            <p><strong>License Type:</strong> {licenseStatus.vehicleType === 'twoWheeler' ? 'MCWG' : 'LMV'}</p>
            <p><strong>Valid From:</strong> {new Date(licenseStatus.approvalDate).toLocaleDateString()}</p>
            <p><strong>Valid Until:</strong>
              {new Date(new Date(licenseStatus.approvalDate).setFullYear(
                new Date(licenseStatus.approvalDate).getFullYear() + 20
              )).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="user-license-footer">
          <div className="user-signature">
            <div className="user-signature-placeholder">Signature</div>
          </div>
          <div className="user-qr-code">
            <div className="user-qr-placeholder">QR Code</div>
          </div>
        </div>
      </div>

      <div className="user-download-actions">
        <button
          className="user-btn user-btn-primary user-btn-icon"
          onClick={handleDownloadLicense}
        >
          <FiDownload /> Download PDF
        </button>
        <p className="user-download-notice">Your license has also been sent to {formData.email || 'your registered email'}.</p>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'schoolSelection':
        return renderSchoolSelection();
      case 'bookingForm':
        return renderBookingForm();
      case 'payment':
        return renderPayment();
      case 'progressTracker':
        return renderProgressTracker();
      case 'applyLicense':
        return renderApplyLicense();
      case 'licenseDownload':
        return renderLicenseDownload();
      default:
        const availableViews = getAvailableViews();
        if (availableViews.length > 0) {
          setCurrentView(availableViews[0]);
          return renderCurrentView();
        }
        return renderSchoolSelection();
    }
  };

  return (
    <div className={`user-dashboard ${sidebarOpen ? '' : 'user-sidebar-collapsed'}`}>
      <aside className="user-sidebar">
        <div className="user-sidebar-header">
          <button
            className="user-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h2>DL Portal</h2>
        </div>

        <nav className="user-sidebar-nav">
          <ul>
            {getAvailableViews().map(view => (
              <li
                key={view}
                className={currentView === view ? 'user-active' : ''}
                onClick={() => setCurrentView(view)}
              >
                {view === 'schoolSelection' && <><FiHome className="user-icon" /><span>Find School</span></>}
                {view === 'bookingForm' && <><FiFileText className="user-icon" /><span>Application</span></>}
                {view === 'payment' && <><FiCreditCard className="user-icon" /><span>Payment</span></>}
                {view === 'progressTracker' && <><FiCalendar className="user-icon" /><span>My Progress</span></>}
                {view === 'applyLicense' && <><FiCreditCard className="user-icon" /><span>Get License</span></>}
                {view === 'licenseDownload' && <><FiDownload className="user-icon" /><span>Download License</span></>}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="user-main-content">
        <header className="user-main-header">
          <div className="user-header-left">
            <h1>
              {currentView === 'schoolSelection' && 'Find Driving School'}
              {currentView === 'bookingForm' && 'License Application'}
              {currentView === 'payment' && 'Complete Payment'}
              {currentView === 'progressTracker' && 'My Learning Progress'}
              {currentView === 'applyLicense' && 'Apply for License'}
              {currentView === 'licenseDownload' && 'Download License'}
            </h1>
            {applicationId && (
              <div className="user-application-id">Application ID: {applicationId}</div>
            )}
          </div>

          <div className="user-header-right">
            <div className="user-profile">
              <div
                className="user-profile-dropdown"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <span className="user-name"><FiUser /> {user.name}</span>
                <FiChevronDown className={`user-dropdown-icon ${showUserDropdown ? 'user-rotate' : ''}`} />
              </div>

              {showUserDropdown && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-item">
                    <FiUser className="user-dropdown-icon" />
                    <span>{user.name}</span>
                  </div>
                  <div className="user-dropdown-item">
                    <FiMail className="user-dropdown-icon" />
                    <span>{user.email}</span>
                  </div>
                  <div className="user-dropdown-item">
                    <FiPhone className="user-dropdown-icon" />
                    <span>{user.phone}</span>
                  </div>
                  <div
                    className="user-dropdown-item"
                    onClick={showChangePasswordModal}
                  >
                    <FiLock className="user-dropdown-icon" />
                    <span>Change Password</span>
                  </div>
                </div>
              )}
            </div>

            {selectedSchool && paymentStatus.completed && (
              <button
                className="user-btn user-btn-secondary user-btn-icon"
                onClick={showContactSchoolModal}
              >
                <FiMessageSquare /> Contact School
              </button>
            )}
          </div>
        </header>

        {renderCurrentView()}
      </main>

      {showModal && (
        <div className="user-modal-overlay">
          <div className="user-modal-container">
            <div className="user-modal-header">
              <h3>{modalTitle}</h3>
              <button
                className="user-modal-close"
                onClick={() => setShowModal(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="user-modal-body">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;