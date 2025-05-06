import React, { useState, useEffect } from "react";
import {
  FiBell, FiUsers, FiCalendar, FiMail, FiAlertOctagon, FiBookOpen, 
  FiClock, FiBarChart2, FiMenu, FiSearch, FiSettings, FiHome, FiUserPlus, 
  FiEdit2, FiTrash2, FiCheck, FiX, FiChevronDown, FiChevronRight, FiPlus
} from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdDashboard, MdDirectionsCar, MdTwoWheeler } from "react-icons/md";
import "../styles/DrivingSchoolDashboard.css";

// Constants
const VEHICLE_TYPES = {
  TWO_WHEELER: "2 Wheeler",
  FOUR_WHEELER: "4 Wheeler"
};

const BOOKING_STATUS = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  CANCELLED: "Cancelled"
};

// Utility functions
const generateId = () => Math.floor(Math.random() * 1000000);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
const formatTime = (timeString) => {
  const [time, period] = timeString.split(' ');
  return `${time} ${period}`;
};

// Custom hooks
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const DrivingSchoolDashboard = () => {
  // State management
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('ds-sidebar-open', true);
  const [activePage, setActivePage] = useLocalStorage('ds-active-page', "dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Data states
  const [schoolDetails, setSchoolDetails] = useLocalStorage('ds-school-details', {
    name: "Elite Driving School",
    address: "123 Main St, Bangalore, Karnataka",
    phone: "+91 9876543210",
    email: "info@elitedriving.com",
    established: "2015",
    pricing: {
      twoWheeler: 15000,
      fourWheeler: 25000
    }
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [registrationRequests, setRegistrationRequests] = useLocalStorage('ds-registration-requests', [
    { id: generateId(), name: "New Student 1", type: VEHICLE_TYPES.TWO_WHEELER, date: "2025-04-28", time: "10:00 AM", contact: "new1@example.com", phone: "+91 9876543201" },
    { id: generateId(), name: "New Student 2", type: VEHICLE_TYPES.FOUR_WHEELER, date: "2025-04-29", time: "02:30 PM", contact: "new2@example.com", phone: "+91 9876543202" }
  ]);

  const [bookingsData, setBookingsData] = useLocalStorage('ds-bookings', [
    { id: generateId(), student: "Aatif Faiz", type: VEHICLE_TYPES.TWO_WHEELER, date: "2025-04-22", time: "09:00 AM", status: BOOKING_STATUS.CONFIRMED, instructorId: 1 },
    { id: generateId(), student: "Atir Mustafa", type: VEHICLE_TYPES.TWO_WHEELER, date: "2025-04-22", time: "11:30 AM", status: BOOKING_STATUS.PENDING, instructorId: 2 },
    { id: generateId(), student: "Saquib Kausar", type: VEHICLE_TYPES.FOUR_WHEELER, date: "2025-04-23", time: "02:00 PM", status: BOOKING_STATUS.CONFIRMED, instructorId: 3 },
    { id: generateId(), student: "Huzaifa Khan", type: VEHICLE_TYPES.TWO_WHEELER, date: "2025-04-24", time: "10:15 AM", status: BOOKING_STATUS.CANCELLED, instructorId: 1 },
    { id: generateId(), student: "Daiyan Kamal", type: VEHICLE_TYPES.FOUR_WHEELER, date: "2025-04-25", time: "03:30 PM", status: BOOKING_STATUS.PENDING, instructorId: 2 },
    { id: generateId(), student: "Zaved Ahmed", type: VEHICLE_TYPES.FOUR_WHEELER, date: "2025-04-26", time: "09:00 AM", status: BOOKING_STATUS.PENDING, instructorId: 1 },
    { id: generateId(), student: "Mustafa Ali", type: VEHICLE_TYPES.TWO_WHEELER, date: "2025-04-27", time: "01:00 PM", status: BOOKING_STATUS.CONFIRMED, instructorId: 2 },
  ]);

  const [instructors, setInstructors] = useLocalStorage('ds-instructors', [
    {
      id: 1,
      name: "Hedayat",
      specialization: VEHICLE_TYPES.FOUR_WHEELER,
      contact: "hedayat@elitedriving.com",
      phone: "+91 9876543211",
      availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
      availableTime: "09:00 AM - 05:00 PM",
      rating: 4.8,
      lessonsCompleted: 124,
      studentsTaught: 32,
      joinedDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Nawaz",
      specialization: VEHICLE_TYPES.TWO_WHEELER,
      contact: "nawaz@elitedriving.com",
      phone: "+91 9876543212",
      availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
      availableTime: "10:00 AM - 06:00 PM",
      rating: 4.9,
      lessonsCompleted: 112,
      studentsTaught: 28,
      joinedDate: "2023-03-10"
    },
    {
      id: 3,
      name: "Ehtesham",
      specialization: VEHICLE_TYPES.FOUR_WHEELER,
      contact: "ehtesham@elitedriving.com",
      phone: "+91 9876543213",
      availableDays: ["Tuesday", "Wednesday", "Friday", "Saturday"],
      availableTime: "08:00 AM - 04:00 PM",
      rating: 4.7,
      lessonsCompleted: 98,
      studentsTaught: 25,
      joinedDate: "2023-05-22"
    }
  ]);

  const [studentsData, setStudentsData] = useLocalStorage('ds-students', [
    { id: generateId(), name: "Zaved Ahmed", age: 24, completedLessons: 12, remainingLessons: 18, licenseType: VEHICLE_TYPES.FOUR_WHEELER, joinDate: "2024-01-10" },
    { id: generateId(), name: "Huzaifa Khan", age: 22, completedLessons: 8, remainingLessons: 22, licenseType: VEHICLE_TYPES.TWO_WHEELER, joinDate: "2024-02-15" },
    { id: generateId(), name: "Atir Mustafa", age: 26, completedLessons: 18, remainingLessons: 12, licenseType: VEHICLE_TYPES.FOUR_WHEELER, joinDate: "2024-03-05" },
    { id: generateId(), name: "Mustafa Ali", age: 20, completedLessons: 14, remainingLessons: 16, licenseType: VEHICLE_TYPES.TWO_WHEELER, joinDate: "2024-01-22" },
    { id: generateId(), name: "Saquib Kausar", age: 25, completedLessons: 0, remainingLessons: 30, licenseType: VEHICLE_TYPES.FOUR_WHEELER, joinDate: "2024-04-10" },
  ]);

  const [contactsData, setContactsData] = useLocalStorage('ds-contacts', [
    { id: generateId(), name: "Aatif Faiz", email: "aatif@example.com", phone: "+91 1234567890", message: "Interested in pricing for package deals", date: "2025-04-20", archived: false, responded: false },
    { id: generateId(), name: "Nawaz Khan", email: "nawaz@example.com", phone: "+91 2345678901", message: "Question about schedule availability", date: "2025-04-19", archived: false, responded: false },
    { id: generateId(), name: "Daiyan Kamal", email: "daiyan@example.com", phone: "+91 3456789012", message: "Looking to schedule first driving lesson", date: "2025-04-18", archived: false, responded: true },
  ]);

  const [notifications, setNotifications] = useLocalStorage('ds-notifications', [
    { id: generateId(), type: "booking", message: "3 pending bookings require confirmation", timestamp: new Date(Date.now() - 600000), read: false },
    { id: generateId(), type: "registration", message: "2 new registration requests waiting for approval", timestamp: new Date(Date.now() - 7200000), read: false },
    { id: generateId(), type: "contact", message: "New contact request from Aatif Faiz", timestamp: new Date(Date.now() - 86400000), read: false },
    { id: generateId(), type: "reminder", message: "5 upcoming sessions this week", timestamp: new Date(Date.now() - 172800000), read: false },
  ]);

  // Derived state
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pendingBookings = bookingsData.filter(b => b.status === BOOKING_STATUS.PENDING);
  const todaysBookings = bookingsData.filter(b => 
    b.date === new Date().toISOString().split('T')[0] && 
    b.status !== BOOKING_STATUS.CANCELLED
  );
  const upcomingBookings = bookingsData.filter(b => 
    new Date(b.date) > new Date() && 
    b.status !== BOOKING_STATUS.CANCELLED
  );
  const newRegistrations = studentsData.filter(s => s.completedLessons === 0);
  const activeContacts = contactsData.filter(c => !c.archived);

  // Reports data
  const reportsData = {
    revenue: {
      monthly: calculateMonthlyRevenue(),
      quarterly: calculateQuarterlyRevenue(),
      yearly: calculateYearlyRevenue(),
    },
    instructorPerformance: instructors.map(instructor => ({
      id: instructor.id,
      name: instructor.name,
      rating: instructor.rating,
      completedLessons: instructor.lessonsCompleted,
      studentsTaught: instructor.studentsTaught,
      specialization: instructor.specialization
    })),
    studentCompletion: {
      passed: studentsData.filter(s => s.completedLessons >= 30 && s.remainingLessons === 0).length,
      failed: studentsData.filter(s => s.completedLessons >= 30 && s.remainingLessons > 0).length,
      inProgress: studentsData.filter(s => s.completedLessons < 30).length
    },
    vehicleTypeDistribution: {
      [VEHICLE_TYPES.TWO_WHEELER]: Math.round((studentsData.filter(s => s.licenseType === VEHICLE_TYPES.TWO_WHEELER).length / studentsData.length) * 100),
      [VEHICLE_TYPES.FOUR_WHEELER]: Math.round((studentsData.filter(s => s.licenseType === VEHICLE_TYPES.FOUR_WHEELER).length / studentsData.length) * 100)
    }
  };

  // Helper functions for reports
  function calculateMonthlyRevenue() {
    const twoWheelerStudents = studentsData.filter(s => 
      s.licenseType === VEHICLE_TYPES.TWO_WHEELER && 
      new Date(s.joinDate) > new Date(new Date().setMonth(new Date().getMonth() - 1))
      .length);
    
    const fourWheelerStudents = studentsData.filter(s => 
      s.licenseType === VEHICLE_TYPES.FOUR_WHEELER && 
      new Date(s.joinDate) > new Date(new Date().setMonth(new Date().getMonth() - 1))
      .length);
    
    return (twoWheelerStudents * schoolDetails.pricing.twoWheeler + 
            fourWheelerStudents * schoolDetails.pricing.fourWheeler).toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            });
  }

  function calculateQuarterlyRevenue() {
    const twoWheelerStudents = studentsData.filter(s => 
      s.licenseType === VEHICLE_TYPES.TWO_WHEELER && 
      new Date(s.joinDate) > new Date(new Date().setMonth(new Date().getMonth() - 3))
      ).length;
    
    const fourWheelerStudents = studentsData.filter(s => 
      s.licenseType === VEHICLE_TYPES.FOUR_WHEELER && 
      new Date(s.joinDate) > new Date(new Date().setMonth(new Date().getMonth() - 3))
      ).length;
    
    return (twoWheelerStudents * schoolDetails.pricing.twoWheeler + 
            fourWheelerStudents * schoolDetails.pricing.fourWheeler).toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            });
  }

  function calculateYearlyRevenue() {
    const twoWheelerStudents = studentsData.filter(s => 
      s.licenseType === VEHICLE_TYPES.TWO_WHEELER && 
      new Date(s.joinDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      ).length;
    
    const fourWheelerStudents = studentsData.filter(s => 
      s.licenseType === VEHICLE_TYPES.FOUR_WHEELER && 
      new Date(s.joinDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      ).length;
    
    return (twoWheelerStudents * schoolDetails.pricing.twoWheeler + 
            fourWheelerStudents * schoolDetails.pricing.fourWheeler).toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            });
  }

  // Data handlers
  const handleConfirmBooking = (bookingId) => {
    setBookingsData(bookingsData.map(b =>
      b.id === bookingId ? { ...b, status: BOOKING_STATUS.CONFIRMED } : b
    ));
    addNotification("booking", `Booking #${bookingId} confirmed`);
  };

  const handleCancelBooking = (bookingId) => {
    setBookingsData(bookingsData.map(b =>
      b.id === bookingId ? { ...b, status: BOOKING_STATUS.CANCELLED } : b
    ));
    addNotification("booking", `Booking #${bookingId} cancelled`);
  };

  const handleAcceptRegistration = (request) => {
    const newStudentId = generateId();
    const newStudent = {
      id: newStudentId,
      name: request.name,
      age: Math.floor(Math.random() * 15) + 18,
      completedLessons: 0,
      remainingLessons: 30,
      licenseType: request.type,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setStudentsData([...studentsData, newStudent]);
    setRegistrationRequests(registrationRequests.filter(r => r.id !== request.id));
    
    // Create initial booking
    const newBooking = {
      id: generateId(),
      student: request.name,
      type: request.type,
      date: request.date,
      time: request.time,
      status: BOOKING_STATUS.CONFIRMED,
      instructorId: getAvailableInstructor(request.date, request.type)?.id || instructors[0].id
    };

    setBookingsData([...bookingsData, newBooking]);
    addNotification("registration", `Registration accepted for ${request.name}`);
  };

  const handleDeclineRegistration = (requestId) => {
    setRegistrationRequests(registrationRequests.filter(r => r.id !== requestId));
    addNotification("registration", "Registration request declined");
  };

  const getAvailableInstructor = (date, type) => {
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    return instructors.find(i => 
      i.specialization === type && 
      i.availableDays.includes(day)
      || instructors.find(i => i.specialization === type));
  };

  const handleAddInstructor = (instructorData) => {
    const newInstructor = {
      id: generateId(),
      ...instructorData,
      rating: (Math.random() * 1 + 4).toFixed(1),
      lessonsCompleted: 0,
      studentsTaught: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setInstructors([...instructors, newInstructor]);
    addNotification("instructor", `New instructor ${newInstructor.name} added`);
  };

  const handleRemoveInstructor = (instructorId) => {
    const instructorName = instructors.find(i => i.id === instructorId)?.name;
    setInstructors(instructors.filter(i => i.id !== instructorId));
    
    // Cancel all bookings with this instructor
    setBookingsData(bookingsData.map(b => 
      b.instructorId === instructorId && b.status !== BOOKING_STATUS.CANCELLED
        ? { ...b, status: BOOKING_STATUS.CANCELLED }
        : b
    ));
    
    addNotification("instructor", `Instructor ${instructorName} removed`);
  };

  const handleUpdateInstructor = (instructorId, updatedData) => {
    setInstructors(instructors.map(i => 
      i.id === instructorId ? { ...i, ...updatedData } : i
    ));
    addNotification("instructor", `Instructor ${updatedData.name || instructors.find(i => i.id === instructorId)?.name} updated`);
  };

  const handleUpdateStudent = (studentId, updatedData) => {
    setStudentsData(studentsData.map(s => 
      s.id === studentId ? { ...s, ...updatedData } : s
    ));
    addNotification("student", `Student ${updatedData.name || studentsData.find(s => s.id === studentId)?.name} updated`);
  };

  const handleArchiveContact = (contactId) => {
    setContactsData(contactsData.map(c => 
      c.id === contactId ? { ...c, archived: true } : c
    ));
    addNotification("contact", `Contact request archived`);
  };

  const handleRespondToContact = (contactId, message) => {
    setContactsData(contactsData.map(c => 
      c.id === contactId ? { ...c, responded: true } : c
    ));
    setResponseMessage("");
    addNotification("contact", `Response sent to ${contactsData.find(c => c.id === contactId)?.name}`);
  };

  const handleUpdateSchoolDetails = (updatedDetails) => {
    setSchoolDetails({ ...schoolDetails, ...updatedDetails });
    addNotification("settings", "School details updated");
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    addNotification("settings", "Password changed");
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: generateId(),
      type,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Modal handlers
  const showEditBookingModal = (booking) => {
    setModalTitle(`Edit Booking #${booking.id}`);
    setModalContent(
      <EditBookingForm 
        booking={booking} 
        instructors={instructors}
        onSave={(updatedBooking) => {
          setBookingsData(bookingsData.map(b => 
            b.id === booking.id ? { ...b, ...updatedBooking } : b
          ));
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showAddInstructorModal = () => {
    setModalTitle("Add New Instructor");
    setModalContent(
      <AddInstructorForm 
        onSave={(instructorData) => {
          handleAddInstructor(instructorData);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showEditInstructorModal = (instructor) => {
    setModalTitle(`Edit Instructor: ${instructor.name}`);
    setModalContent(
      <EditInstructorForm 
        instructor={instructor}
        onSave={(updatedData) => {
          handleUpdateInstructor(instructor.id, updatedData);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showEditStudentModal = (student) => {
    setModalTitle(`Edit Student: ${student.name}`);
    setModalContent(
      <EditStudentForm 
        student={student}
        onSave={(updatedData) => {
          handleUpdateStudent(student.id, updatedData);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showViewStudentModal = (student) => {
    const instructor = instructors.find(i => i.id === student.instructorId);
    const studentBookings = bookingsData.filter(b => 
      b.student === student.name && 
      b.status === BOOKING_STATUS.CONFIRMED
    );

    setModalTitle(`Student Profile: ${student.name}`);
    setModalContent(
      <StudentProfile 
        student={student}
        instructor={instructor}
        bookings={studentBookings}
        onClose={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showSchoolDetailsModal = () => {
    setModalTitle("School Details");
    setModalContent(
      <SchoolDetailsForm 
        details={schoolDetails}
        onSave={handleUpdateSchoolDetails}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showChangePasswordModal = () => {
    setModalTitle("Change Password");
    setModalContent(
      <ChangePasswordForm 
        formData={passwordForm}
        onChange={setPasswordForm}
        onSubmit={handleChangePassword}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const showNotificationsModal = () => {
    setModalTitle("Notifications");
    setModalContent(
      <NotificationsPanel 
        notifications={notifications}
        onClear={() => {
          setNotifications([]);
          setShowModal(false);
        }}
        onClose={() => {
          markNotificationsAsRead();
          setShowModal(false);
        }}
      />
    );
    setShowModal(true);
  };

  const showRespondToContactModal = (contact) => {
    setModalTitle(`Respond to ${contact.name}`);
    setModalContent(
      <RespondToContactForm
        contact={contact}
        message={responseMessage}
        onMessageChange={setResponseMessage}
        onSend={(message) => {
          handleRespondToContact(contact.id, message);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  // Component rendering
  const renderDashboardCards = () => {
    const cards = [
      {
        icon: <FiCalendar className="ds-card-icon" />,
        title: "Today's Sessions",
        value: todaysBookings.length,
        content: todaysBookings.length > 0 ? (
          <ul className="ds-session-list">
            {todaysBookings.map((booking, index) => (
              <li key={index} className="ds-session-item">
                <span className="ds-session-time">{booking.time}</span>
                <span className="ds-session-student">{booking.student}</span>
              </li>
            ))}
          </ul>
        ) : <p className="ds-no-data">No sessions scheduled for today</p>
      },
      {
        icon: <FiAlertOctagon className="ds-card-icon" />,
        title: "Pending Confirmations",
        value: pendingBookings.length,
        content: pendingBookings.length > 0 ? (
          <ul className="ds-pending-list">
            {pendingBookings.slice(0, 3).map((booking, index) => (
              <li key={index} className="ds-pending-item">
                <div className="ds-pending-info">
                  <span>{booking.student}</span>
                  <small>{formatDate(booking.date)} at {booking.time}</small>
                </div>
                <div className="ds-pending-actions">
                  <button onClick={() => handleConfirmBooking(booking.id)}>
                    <FiCheck /> Confirm
                  </button>
                  <button onClick={() => handleCancelBooking(booking.id)}>
                    <FiX /> Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="ds-no-data">No pending bookings requiring confirmation</p>
      },
      {
        icon: <FiUsers className="ds-card-icon" />,
        title: "New Registrations",
        value: registrationRequests.length,
        content: registrationRequests.length > 0 ? (
          <ul className="ds-registration-list">
            {registrationRequests.slice(0, 3).map((request, index) => (
              <li key={index} className="ds-registration-item">
                <div className="ds-registration-info">
                  <span>{request.name}</span>
                  <small>{request.type} - {request.contact}</small>
                </div>
                <div className="ds-registration-actions">
                  <button onClick={() => handleAcceptRegistration(request)}>
                    <FiCheck /> Accept
                  </button>
                  <button onClick={() => handleDeclineRegistration(request.id)}>
                    <FiX /> Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="ds-no-data">No new registration requests</p>
      },
      {
        icon: <FiMail className="ds-card-icon" />,
        title: "Contact Requests",
        value: activeContacts.length,
        content: activeContacts.length > 0 ? (
          <ul className="ds-contact-list">
            {activeContacts.slice(0, 3).map((contact, index) => (
              <li key={index} className="ds-contact-item">
                <div className="ds-contact-info">
                  <span>{contact.name}</span>
                  <small>{contact.message.substring(0, 50)}...</small>
                </div>
                <button onClick={() => showRespondToContactModal(contact)}>
                  Respond
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="ds-no-data">No active contact requests</p>
      },
      {
        icon: <FiClock className="ds-card-icon" />,
        title: "Upcoming Sessions",
        value: upcomingBookings.length,
        content: upcomingBookings.length > 0 ? (
          <ul className="ds-upcoming-list">
            {upcomingBookings.slice(0, 3).map((booking, index) => (
              <li key={index} className="ds-upcoming-item">
                <span className="ds-upcoming-date">{formatDate(booking.date)}</span>
                <span className="ds-upcoming-time">{booking.time}</span>
                <span className="ds-upcoming-student">{booking.student}</span>
              </li>
            ))}
          </ul>
        ) : <p className="ds-no-data">No upcoming sessions scheduled</p>
      }
    ];

    return (
      <div className="ds-cards-grid">
        {cards.map((card, index) => (
          <div key={index} className="ds-card">
            <div className="ds-card-header">
              {card.icon}
              <h3>{card.title}</h3>
              <span className="ds-card-value">{card.value}</span>
            </div>
            <div className="ds-card-content">
              {card.content}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBookingsTable = () => (
    <div className="ds-table-container">
      {bookingsData.length > 0 ? (
        <table className="ds-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Type</th>
              <th>Instructor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map((booking) => {
              const instructor = instructors.find(i => i.id === booking.instructorId);
              return (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.student}</td>
                  <td>
                    <span className={`ds-badge ${booking.type === VEHICLE_TYPES.TWO_WHEELER ? "ds-two-wheeler" : "ds-four-wheeler"}`}>
                      {booking.type === VEHICLE_TYPES.TWO_WHEELER ? <MdTwoWheeler /> : <MdDirectionsCar />}
                      {booking.type}
                    </span>
                  </td>
                  <td>{instructor?.name || "Unassigned"}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{formatTime(booking.time)}</td>
                  <td>
                    <span className={`ds-badge ds-status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className="ds-actions">
                      <button onClick={() => showEditBookingModal(booking)}>
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleCancelBooking(booking.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="ds-no-data-container">
          <p className="ds-no-data">No bookings found</p>
        </div>
      )}
    </div>
  );

  const renderInstructorsGrid = () => (
    <div className="ds-instructors-grid">
      {instructors.length > 0 ? (
        instructors.map((instructor) => (
          <div key={instructor.id} className="ds-instructor-card">
            <div className="ds-instructor-header">
              <div className="ds-avatar">{instructor.name.charAt(0)}</div>
              <div className="ds-instructor-info">
                <h3>{instructor.name}</h3>
                <p>{instructor.specialization}</p>
                <div className="ds-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(instructor.rating) ? 'ds-star-filled' : 'ds-star-empty'}>
                      ★
                    </span>
                  ))}
                  <span>({instructor.rating})</span>
                </div>
              </div>
            </div>
            <div className="ds-instructor-details">
              <p><FiMail /> {instructor.contact}</p>
              <p><FiUsers /> {instructor.phone}</p>
              <p><FiCalendar /> Available: {instructor.availableTime}</p>
              <p><FiClock /> Days: {instructor.availableDays.join(', ')}</p>
            </div>
            <div className="ds-instructor-actions">
              <button onClick={() => showEditInstructorModal(instructor)}>
                <FiEdit2 /> Edit
              </button>
              <button onClick={() => handleRemoveInstructor(instructor.id)}>
                <FiTrash2 /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="ds-no-data-container">
          <p className="ds-no-data">No instructors found</p>
          <button className="ds-add-btn" onClick={showAddInstructorModal}>
            <FiPlus /> Add Instructor
          </button>
        </div>
      )}
    </div>
  );

  const renderStudentsTable = () => (
    <div className="ds-table-container">
      {filteredStudents.length > 0 ? (
        <table className="ds-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>License Type</th>
              <th>Completion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const completion = Math.round(
                (student.completedLessons / (student.completedLessons + student.remainingLessons)) * 100
              );
              
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <span className={`ds-badge ${student.licenseType === VEHICLE_TYPES.TWO_WHEELER ? "ds-two-wheeler" : "ds-four-wheeler"}`}>
                      {student.licenseType === VEHICLE_TYPES.TWO_WHEELER ? <MdTwoWheeler /> : <MdDirectionsCar />}
                      {student.licenseType}
                    </span>
                  </td>
                  <td>
                    <div className="ds-progress-bar">
                      <div 
                        className="ds-progress-fill" 
                        style={{ 
                          width: `${completion}%`,
                          backgroundColor: completion >= 70 ? "#4CAF50" : completion >= 30 ? "#FFC107" : "#2196F3"
                        }}
                      ></div>
                      <span>{completion}% ({student.completedLessons}/{student.completedLessons + student.remainingLessons})</span>
                    </div>
                  </td>
                  <td>
                    <div className="ds-actions">
                      <button onClick={() => showViewStudentModal(student)}>
                        View
                      </button>
                      <button onClick={() => showEditStudentModal(student)}>
                        <FiEdit2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="ds-no-data-container">
          <p className="ds-no-data">No students found matching your search</p>
        </div>
      )}
    </div>
  );

  const renderContactsGrid = () => (
    <div className="ds-contacts-grid">
      {activeContacts.length > 0 ? (
        activeContacts.map((contact) => (
          <div key={contact.id} className="ds-contact-card">
            <div className="ds-contact-header">
              <div className="ds-avatar">{contact.name.charAt(0)}</div>
              <div className="ds-contact-info">
                <h3>{contact.name}</h3>
                <small>{formatDate(contact.date)}</small>
              </div>
            </div>
            <div className="ds-contact-details">
              <p><FiMail /> {contact.email}</p>
              <p><FiUsers /> {contact.phone}</p>
            </div>
            <div className="ds-contact-message">
              <p>{contact.message}</p>
            </div>
            <div className="ds-contact-actions">
              <button 
                className={contact.responded ? 'ds-responded' : ''}
                onClick={() => showRespondToContactModal(contact)}
                disabled={contact.responded}
              >
                {contact.responded ? 'Responded' : 'Respond'}
              </button>
              <button onClick={() => handleArchiveContact(contact.id)}>
                Archive
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="ds-no-data-container">
          <p className="ds-no-data">No active contact requests</p>
        </div>
      )}
    </div>
  );

  const renderReports = () => (
    <div className="ds-reports-grid">
      <div className="ds-report-card">
        <h3>Revenue Summary</h3>
        <div className="ds-revenue-stats">
          <div className="ds-revenue-item">
            <span>Monthly</span>
            <strong>{reportsData.revenue.monthly}</strong>
          </div>
          <div className="ds-revenue-item">
            <span>Quarterly</span>
            <strong>{reportsData.revenue.quarterly}</strong>
          </div>
          <div className="ds-revenue-item">
            <span>Yearly</span>
            <strong>{reportsData.revenue.yearly}</strong>
          </div>
        </div>
      </div>

      <div className="ds-report-card">
        <h3>Instructor Performance</h3>
        <div className="ds-performance-list">
          {reportsData.instructorPerformance.map((instructor) => (
            <div key={instructor.id} className="ds-performance-item">
              <div className="ds-instructor-info">
                <h4>{instructor.name}</h4>
                <small>{instructor.specialization}</small>
              </div>
              <div className="ds-performance-stats">
                <div className="ds-rating">
                  <span>{instructor.rating}</span>
                  <div className="ds-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(instructor.rating) ? 'ds-star-filled' : 'ds-star-empty'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ds-lessons">
                  <span>{instructor.completedLessons}</span>
                  <small>Lessons</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-report-card">
        <h3>Student Completion</h3>
        <div className="ds-completion-stats">
          <div className="ds-completion-item ds-passed">
            <span>{reportsData.studentCompletion.passed}</span>
            <small>Passed</small>
          </div>
          <div className="ds-completion-item ds-failed">
            <span>{reportsData.studentCompletion.failed}</span>
            <small>Failed</small>
          </div>
          <div className="ds-completion-item ds-in-progress">
            <span>{reportsData.studentCompletion.inProgress}</span>
            <small>In Progress</small>
          </div>
        </div>
      </div>

      <div className="ds-report-card">
        <h3>Vehicle Type Distribution</h3>
        <div className="ds-distribution-chart">
          <div 
            className="ds-chart-slice ds-two-wheeler"
            style={{ width: `${reportsData.vehicleTypeDistribution[VEHICLE_TYPES.TWO_WHEELER]}%` }}
          >
            <span>{VEHICLE_TYPES.TWO_WHEELER}: {reportsData.vehicleTypeDistribution[VEHICLE_TYPES.TWO_WHEELER]}%</span>
          </div>
          <div 
            className="ds-chart-slice ds-four-wheeler"
            style={{ width: `${reportsData.vehicleTypeDistribution[VEHICLE_TYPES.FOUR_WHEELER]}%` }}
          >
            <span>{VEHICLE_TYPES.FOUR_WHEELER}: {reportsData.vehicleTypeDistribution[VEHICLE_TYPES.FOUR_WHEELER]}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className={`ds-container ${sidebarOpen ? "" : "ds-sidebar-collapsed"}`}>
      {/* Sidebar */}
      <aside className="ds-sidebar">
        <div className="ds-sidebar-header">
          <button className="ds-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <span className="ds-school-name">Elite Driving School</span>
        </div>

        <nav className="ds-sidebar-nav">
          <ul>
            <li 
              className={`ds-nav-item ${activePage === "dashboard" ? "ds-active" : ""}`}
              onClick={() => setActivePage("dashboard")}
            >
              <MdDashboard className="ds-nav-icon" />
              <span>Dashboard</span>
            </li>
            <li 
              className={`ds-nav-item ${activePage === "bookings" ? "ds-active" : ""}`}
              onClick={() => setActivePage("bookings")}
            >
              <FiBookOpen className="ds-nav-icon" />
              <span>Class Bookings</span>
            </li>
            <li 
              className={`ds-nav-item ${activePage === "schedule" ? "ds-active" : ""}`}
              onClick={() => setActivePage("schedule")}
            >
              <FiClock className="ds-nav-icon" />
              <span>Schedule Manager</span>
            </li>
            <li 
              className={`ds-nav-item ${activePage === "students" ? "ds-active" : ""}`}
              onClick={() => setActivePage("students")}
            >
              <FiUsers className="ds-nav-icon" />
              <span>Student Records</span>
            </li>
            <li 
              className={`ds-nav-item ${activePage === "contacts" ? "ds-active" : ""}`}
              onClick={() => setActivePage("contacts")}
            >
              <FiMail className="ds-nav-icon" />
              <span>Contact Requests</span>
            </li>
            <li 
              className={`ds-nav-item ${activePage === "reports" ? "ds-active" : ""}`}
              onClick={() => setActivePage("reports")}
            >
              <FiBarChart2 className="ds-nav-icon" />
              <span>Reports</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ds-main">
        <header className="ds-header">
          <h1 className="ds-page-title">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>

          <div className="ds-header-actions">
            <div className="ds-search">
              <FiSearch className="ds-search-icon" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="ds-notification-btn" onClick={showNotificationsModal}>
              <FiBell className="ds-notification-icon" />
              {unreadNotifications > 0 && (
                <span className="ds-notification-badge">{unreadNotifications}</span>
              )}
            </div>

            <div className="ds-user-menu">
              <div className="ds-user-avatar">A</div>
              <span>Admin</span>
              <FiChevronDown className="ds-dropdown-icon" />
              <div className="ds-dropdown-menu">
                <button onClick={showSchoolDetailsModal}>
                  <FiHome /> School Details
                </button>
                <button onClick={showChangePasswordModal}>
                  <FiSettings /> Change Password
                </button>
                <button onClick={() => {
                  if (window.confirm("Are you sure you want to logout?")) {
                    // Handle logout logic
                    alert("Logged out successfully");
                  }
                }}>
                  <RiLogoutCircleRLine /> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="ds-content">
          {activePage === "dashboard" && renderDashboardCards()}
          {activePage === "bookings" && renderBookingsTable()}
          {activePage === "schedule" && (
            <>
              <div className="ds-section-header">
                <h2>Instructors</h2>
                <button className="ds-add-btn" onClick={showAddInstructorModal}>
                  <FiPlus /> Add Instructor
                </button>
              </div>
              {renderInstructorsGrid()}
            </>
          )}
          {activePage === "students" && (
            <>
              <div className="ds-section-header">
                <h2>Students</h2>
                <div className="ds-search-container">
                  <FiSearch className="ds-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              {renderStudentsTable()}
            </>
          )}
          {activePage === "contacts" && renderContactsGrid()}
          {activePage === "reports" && renderReports()}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="ds-modal-overlay">
          <div className="ds-modal">
            <div className="ds-modal-header">
              <h2>{modalTitle}</h2>
              <button className="ds-modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="ds-modal-body">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form Components
const EditBookingForm = ({ booking, instructors, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    student: booking.student,
    type: booking.type,
    date: booking.date,
    time: booking.time,
    instructorId: booking.instructorId,
    status: booking.status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>Student Name</label>
        <input
          type="text"
          name="student"
          value={formData.student}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-group">
        <label>Lesson Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value={VEHICLE_TYPES.TWO_WHEELER}>{VEHICLE_TYPES.TWO_WHEELER}</option>
          <option value={VEHICLE_TYPES.FOUR_WHEELER}>{VEHICLE_TYPES.FOUR_WHEELER}</option>
        </select>
      </div>
      <div className="ds-form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-group">
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time.replace(" AM", "").replace(" PM", "")}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-group">
        <label>Instructor</label>
        <select
          name="instructorId"
          value={formData.instructorId}
          onChange={handleChange}
        >
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name} ({instructor.specialization})
            </option>
          ))}
        </select>
      </div>
      <div className="ds-form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value={BOOKING_STATUS.CONFIRMED}>{BOOKING_STATUS.CONFIRMED}</option>
          <option value={BOOKING_STATUS.PENDING}>{BOOKING_STATUS.PENDING}</option>
          <option value={BOOKING_STATUS.CANCELLED}>{BOOKING_STATUS.CANCELLED}</option>
        </select>
      </div>
      <div className="ds-form-actions">
        <button className="ds-btn ds-btn-primary" onClick={() => onSave(formData)}>
          Save Changes
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const AddInstructorForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: VEHICLE_TYPES.FOUR_WHEELER,
    contact: "",
    phone: "",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableTime: "09:00 AM - 05:00 PM"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Instructor's full name"
        />
      </div>
      <div className="ds-form-row">
        <div className="ds-form-group">
          <label>Specialization</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value={VEHICLE_TYPES.TWO_WHEELER}>{VEHICLE_TYPES.TWO_WHEELER}</option>
            <option value={VEHICLE_TYPES.FOUR_WHEELER}>{VEHICLE_TYPES.FOUR_WHEELER}</option>
          </select>
        </div>
        <div className="ds-form-group">
          <label>Contact Email</label>
          <input
            type="email"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
      </div>
      <div className="ds-form-group">
        <label>Available Time</label>
        <input
          type="text"
          name="availableTime"
          value={formData.availableTime}
          onChange={handleChange}
          placeholder="e.g. 09:00 AM - 05:00 PM"
        />
      </div>
      <div className="ds-form-group">
        <label>Available Days</label>
        <div className="ds-days-toggle">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <button
              key={day}
              type="button"
              className={`ds-day-toggle ${formData.availableDays.includes(day) ? 'ds-active' : ''}`}
              onClick={() => handleDayToggle(day)}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>
      <div className="ds-form-actions">
        <button 
          className="ds-btn ds-btn-primary" 
          onClick={() => onSave(formData)}
          disabled={!formData.name.trim()}
        >
          Add Instructor
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const EditInstructorForm = ({ instructor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: instructor.name,
    specialization: instructor.specialization,
    contact: instructor.contact,
    phone: instructor.phone,
    availableDays: [...instructor.availableDays],
    availableTime: instructor.availableTime
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-row">
        <div className="ds-form-group">
          <label>Specialization</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value={VEHICLE_TYPES.TWO_WHEELER}>{VEHICLE_TYPES.TWO_WHEELER}</option>
            <option value={VEHICLE_TYPES.FOUR_WHEELER}>{VEHICLE_TYPES.FOUR_WHEELER}</option>
          </select>
        </div>
        <div className="ds-form-group">
          <label>Contact Email</label>
          <input
            type="email"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="ds-form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-group">
        <label>Available Time</label>
        <input
          type="text"
          name="availableTime"
          value={formData.availableTime}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-group">
        <label>Available Days</label>
        <div className="ds-days-toggle">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <button
              key={day}
              type="button"
              className={`ds-day-toggle ${formData.availableDays.includes(day) ? 'ds-active' : ''}`}
              onClick={() => handleDayToggle(day)}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>
      <div className="ds-form-actions">
        <button 
          className="ds-btn ds-btn-primary" 
          onClick={() => onSave(formData)}
          disabled={!formData.name.trim()}
        >
          Save Changes
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const EditStudentForm = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    age: student.age,
    licenseType: student.licenseType,
    completedLessons: student.completedLessons,
    remainingLessons: student.remainingLessons,
    instructorId: student.instructorId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'completedLessons' || name === 'remainingLessons'
        ? parseInt(value) || 0
        : value
    }));
  };

  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-row">
        <div className="ds-form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="16"
            max="80"
          />
        </div>
        <div className="ds-form-group">
          <label>License Type</label>
          <select
            name="licenseType"
            value={formData.licenseType}
            onChange={handleChange}
          >
            <option value={VEHICLE_TYPES.TWO_WHEELER}>{VEHICLE_TYPES.TWO_WHEELER}</option>
            <option value={VEHICLE_TYPES.FOUR_WHEELER}>{VEHICLE_TYPES.FOUR_WHEELER}</option>
          </select>
        </div>
      </div>
      <div className="ds-form-row">
        <div className="ds-form-group">
          <label>Completed Lessons</label>
          <input
            type="number"
            name="completedLessons"
            value={formData.completedLessons}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="ds-form-group">
          <label>Remaining Lessons</label>
          <input
            type="number"
            name="remainingLessons"
            value={formData.remainingLessons}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>
      <div className="ds-form-actions">
        <button 
          className="ds-btn ds-btn-primary" 
          onClick={() => onSave(formData)}
          disabled={!formData.name.trim()}
        >
          Save Changes
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const StudentProfile = ({ student, instructor, bookings, onClose }) => {
  const completionPercentage = Math.round(
    (student.completedLessons / (student.completedLessons + student.remainingLessons)) * 100
  );

  return (
    <div className="ds-student-profile">
      <div className="ds-profile-header">
        <div className="ds-avatar-large">{student.name.charAt(0)}</div>
        <div className="ds-profile-info">
          <h3>{student.name}</h3>
          <p>ID: {student.id} | Age: {student.age}</p>
          <div className="ds-profile-badges">
            <span className={`ds-badge ${student.licenseType === VEHICLE_TYPES.TWO_WHEELER ? "ds-two-wheeler" : "ds-four-wheeler"}`}>
              {student.licenseType === VEHICLE_TYPES.TWO_WHEELER ? <MdTwoWheeler /> : <MdDirectionsCar />}
              {student.licenseType}
            </span>
          </div>
        </div>
      </div>

      <div className="ds-profile-section">
        <h4>Progress Overview</h4>
        <div className="ds-progress-container">
          <div className="ds-progress-bar">
            <div 
              className="ds-progress-fill" 
              style={{ 
                width: `${completionPercentage}%`,
                backgroundColor: completionPercentage >= 70 ? "#4CAF50" : completionPercentage >= 30 ? "#FFC107" : "#2196F3"
              }}
            ></div>
          </div>
          <div className="ds-progress-stats">
            <div className="ds-stat">
              <span>Completed</span>
              <strong>{student.completedLessons}</strong>
            </div>
            <div className="ds-stat">
              <span>Remaining</span>
              <strong>{student.remainingLessons}</strong>
            </div>
            <div className="ds-stat">
              <span>Completion</span>
              <strong>{completionPercentage}%</strong>
            </div>
          </div>
        </div>
      </div>

      {instructor && (
        <div className="ds-profile-section">
          <h4>Assigned Instructor</h4>
          <div className="ds-instructor-card">
            <div className="ds-instructor-header">
              <div className="ds-avatar">{instructor.name.charAt(0)}</div>
              <div className="ds-instructor-info">
                <h5>{instructor.name}</h5>
                <p>{instructor.specialization}</p>
                <div className="ds-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(instructor.rating) ? 'ds-star-filled' : 'ds-star-empty'}>
                      ★
                    </span>
                  ))}
                  <span>({instructor.rating})</span>
                </div>
              </div>
            </div>
            <div className="ds-instructor-details">
              <p><FiMail /> {instructor.contact}</p>
              <p><FiUsers /> {instructor.phone}</p>
              <p><FiClock /> Available: {instructor.availableTime}</p>
            </div>
          </div>
        </div>
      )}

      <div className="ds-profile-section">
        <h4>Recent Sessions</h4>
        {bookings.length > 0 ? (
          <ul className="ds-session-list">
            {bookings.slice(0, 5).map((booking, index) => (
              <li key={index} className="ds-session-item">
                <div className="ds-session-date">
                  {formatDate(booking.date)} at {formatTime(booking.time)}
                </div>
                <div className="ds-session-details">
                  <span className={`ds-badge ${booking.type === VEHICLE_TYPES.TWO_WHEELER ? "ds-two-wheeler" : "ds-four-wheeler"}`}>
                    {booking.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ds-no-data">No completed sessions yet</p>
        )}
      </div>

      <div className="ds-form-actions">
        <button className="ds-btn ds-btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const SchoolDetailsForm = ({ details, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: details.name,
    address: details.address,
    phone: details.phone,
    email: details.email,
    established: details.established,
    pricing: { ...details.pricing }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("pricing.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [field]: parseInt(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>School Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-group">
        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <div className="ds-form-row">
        <div className="ds-form-group">
          <label>Contact Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="ds-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="ds-form-group">
        <label>Established Year</label>
        <input
          type="text"
          name="established"
          value={formData.established}
          onChange={handleChange}
        />
      </div>
      <div className="ds-form-section">
        <h4>Pricing</h4>
        <div className="ds-form-row">
          <div className="ds-form-group">
            <label>2 Wheeler Course</label>
            <input
              type="number"
              name="pricing.twoWheeler"
              value={formData.pricing.twoWheeler}
              onChange={handleChange}
            />
          </div>
          <div className="ds-form-group">
            <label>4 Wheeler Course</label>
            <input
              type="number"
              name="pricing.fourWheeler"
              value={formData.pricing.fourWheeler}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="ds-form-actions">
        <button 
          className="ds-btn ds-btn-primary" 
          onClick={() => onSave(formData)}
          disabled={!formData.name.trim()}
        >
          Save Changes
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const ChangePasswordForm = ({ formData, onChange, onSubmit, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
        />
      </div>
      <div className="ds-form-group">
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
        />
      </div>
      <div className="ds-form-group">
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
        />
      </div>
      <div className="ds-form-actions">
        <button 
          className="ds-btn ds-btn-primary" 
          onClick={onSubmit}
          disabled={!formData.newPassword || !formData.confirmPassword}
        >
          Change Password
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const RespondToContactForm = ({ contact, message, onMessageChange, onSend, onCancel }) => {
  return (
    <div className="ds-form">
      <div className="ds-form-group">
        <label>To</label>
        <input
          type="text"
          value={`${contact.name} <${contact.email}>`}
          readOnly
        />
      </div>
      <div className="ds-form-group">
        <label>Your Response</label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your response message here..."
          rows="6"
        />
      </div>
      <div className="ds-form-actions">
        <button 
          className="ds-btn ds-btn-primary" 
          onClick={() => onSend(message)}
          disabled={!message.trim()}
        >
          Send Response
        </button>
        <button className="ds-btn ds-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const NotificationsPanel = ({ notifications, onClear, onClose }) => {
  return (
    <div className="ds-notifications-panel">
      {notifications.length > 0 ? (
        <>
          <ul className="ds-notification-list">
            {notifications.map(notification => (
              <li key={notification.id} className={`ds-notification-item ${notification.read ? 'ds-read' : ''}`}>
                <div className="ds-notification-icon">
                  {notification.type === "booking" && <FiCalendar />}
                  {notification.type === "registration" && <FiUserPlus />}
                  {notification.type === "contact" && <FiMail />}
                  {notification.type === "instructor" && <FiUsers />}
                  {notification.type === "student" && <FiBookOpen />}
                </div>
                <div className="ds-notification-content">
                  <p>{notification.message}</p>
                  <small>{new Date(notification.timestamp).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
          <div className="ds-notification-actions">
            <button className="ds-btn ds-btn-secondary" onClick={onClear}>
              Clear All
            </button>
            <button className="ds-btn ds-btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      ) : (
        <div className="ds-no-notifications">
          <p>No notifications</p>
          <button className="ds-btn ds-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DrivingSchoolDashboard;