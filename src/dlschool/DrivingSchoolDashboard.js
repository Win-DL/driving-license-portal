import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  FiBell,
  FiUsers,
  FiCalendar,
  FiMail,
  FiAlertOctagon,
  FiBookOpen,
  FiClock,
  FiBarChart2,
  FiMenu,
} from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "../styles/DrivingSchoolDashboard.css";

const DrivingSchoolDashboard = ({
  todaysSessions = 5,
  pendingConfirmations = 8,
  newRegistrations = 12,
  contactRequests = 3,
  upcomingSessions = 24,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const [bookingsData, setBookingsData] = useState([
    { id: 1, student: "Aatif Faiz", type: "2 Wheeler", date: "2025-04-22", time: "09:00 AM", status: "Confirmed" },
    { id: 2, student: "Atir Mustafa", type: "2 Wheeler", date: "2025-04-22", time: "11:30 AM", status: "Pending" },
    { id: 3, student: "Saquib Kausar", type: "4 Wheeler", date: "2025-04-23", time: "02:00 PM", status: "Confirmed" },
    { id: 4, student: "Huzaifa", type: "2 Wheeler", date: "2025-04-24", time: "10:15 AM", status: "Canceled" },
    { id: 5, student: "Daiyan Kamal", type: "4 Wheeler", date: "2025-04-25", time: "03:30 PM", status: "Pending" },
  ]);

  const [scheduleData, setScheduleData] = useState([
    { day: "Monday", instructor: "Angelina Jolie", slots: ["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "2:00 PM - 3:30 PM", "4:00 PM - 5:30 PM"] },
    { day: "Tuesday", instructor: "Milie Bobby Brown", slots: ["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "2:00 PM - 3:30 PM"] },
    { day: "Wednesday", instructor: "Jennifer Lawrence", slots: ["10:00 AM - 11:30 AM", "1:00 PM - 2:30 PM", "3:00 PM - 4:30 PM"] },
    { day: "Thursday", instructor: "Sydney Sweeney", slots: ["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "3:00 PM - 4:30 PM"] },
    { day: "Friday", instructor: "Sadie Sink", slots: ["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "2:00 PM - 3:30 PM", "4:00 PM - 5:30 PM"] },
  ]);

  const [studentsData, setStudentsData] = useState([
    { id: 101, name: "Emma Watson", age: 24, progress: "Advanced", completedLessons: 12, remainingLessons: 18 },
    { id: 102, name: "Emma Stone", age: 22, progress: "Intermediate", completedLessons: 8, remainingLessons: 22 },
    { id: 103, name: "Emily Wilis", age: 26, progress: "Beginner", completedLessons: 18, remainingLessons: 12 },
    { id: 104, name: "Elizabeth Olsen", age: 20, progress: "Advanced", completedLessons: 14, remainingLessons: 16 },
    { id: 105, name: "Sophie Turner", age: 25, progress: "Intermediate", completedLessons: 0, remainingLessons: 30 },
  ]);

  const [contactsData, setContactsData] = useState([
    { id: 201, name: "Preitty Zinta", email: "preitty.zinta@example.com", phone: "(91) 123-4567", message: "Interested in pricing for package deals", date: "2025-04-20", archived: false },
    { id: 202, name: "Scarlett Johansson", email: "scarlett.johansson@example.com", phone: "(91) 234-5678", message: "Question about schedule availability", date: "2025-04-19", archived: false },
    { id: 203, name: "Katrina Kaif", email: "katrina.kaif@example.com", phone: "(91) 345-6789", message: "Looking to schedule first driving lesson", date: "2025-04-18", archived: false },
  ]);

  // Dashboard cards data
  const cardsData = [
    {
      icon: <FiCalendar className="card-icon blue" />,
      label: "Today's Sessions",
      value: todaysSessions,
    },
    {
      icon: <FiAlertOctagon className="card-icon yellow" />,
      label: "Pending Confirmations",
      value: pendingConfirmations,
    },
    {
      icon: <FiUsers className="card-icon purple" />,
      label: "New Registrations",
      value: newRegistrations,
    },
    {
      icon: <FiMail className="card-icon orange" />,
      label: "Contact Requests",
      value: contactsData.filter(c => !c.archived).length,
    },
    {
      icon: <FiClock className="card-icon indigo" />,
      label: "Upcoming Sessions",
      value: upcomingSessions,
    },
  ];

  // Dummy data for Reports section
  const reportsData = {
    revenue: {
      monthly: "₹25,000",
      quarterly: "₹1,20,000",
      yearly: "₹10,53,000",
    },
    instructorPerformance: [
      { name: "Angelina Jolie", rating: 4.8, completedLessons: 124 },
      { name: "Milie Bobby Brown", rating: 4.9, completedLessons: 112 },
      { name: "Jennifer Lawrence", rating: 4.7, completedLessons: 98 },
      { name: "Sydney Sweeney", rating: 4.6, completedLessons: 103 },
      { name: "Sadie Sink", rating: 4.8, completedLessons: 118 },
    ],
    studentCompletion: {
      passed: 23,
      failed: 98,
      inProgress: 45,
    }
  };

  // Handler for edit booking
  const handleEditBooking = (booking) => {
    setModalTitle("Edit Booking");
    setModalContent(
      <div className="edit-form">
        <div className="form-group">
          <label>Student Name:</label>
          <input type="text" defaultValue={booking.student} />
        </div>
        <div className="form-group">
          <label>Lesson Type:</label>
          <select defaultValue={booking.type}>
            <option value="2 Wheeler">2 Wheeler</option>
            <option value="4 Wheeler">4 Wheeler</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" defaultValue={booking.date} />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input type="time" defaultValue={convertTimeToInputFormat(booking.time)} />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select defaultValue={booking.status}>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="form-actions">
          <button
            className="action-btn save"
            onClick={() => {
              alert(`Booking #${booking.id} updated successfully!`);
              setShowModal(false);
            }}>
            Save Changes
          </button>
          <button
            className="action-btn cancel"
            onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  const convertTimeToInputFormat = (timeStr) => {
    if (timeStr.includes("AM")) {
      return timeStr.replace(" AM", "");
    } else {
      const hour = parseInt(timeStr.split(':')[0]);
      const minutes = timeStr.split(':')[1].replace(" PM", "");
      return `${hour + 12}:${minutes}`;
    }
  };

  const handleCancelBooking = (booking) => {
    setModalTitle("Cancel Booking");
    setModalContent(
      <div className="cancel-confirmation">
        <p>Are you sure you want to cancel the booking for {booking.student} on {booking.date} at {booking.time}?</p>
        <div className="form-actions">
          <button
            className="action-btn delete"
            onClick={() => {
              const updatedBookings = bookingsData.map(b =>
                b.id === booking.id ? { ...b, status: "Canceled" } : b
              );
              setBookingsData(updatedBookings);
              setShowModal(false);
              alert(`Booking #${booking.id} has been canceled.`);
            }}>
            Yes, Cancel Booking
          </button>
          <button
            className="action-btn"
            onClick={() => setShowModal(false)}>
            No, Keep Booking
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  // Handler for manage slots
  const handleManageSlots = (day) => {
    setModalTitle(`Manage Slots - ${day.day}`);
    setModalContent(
      <div className="slots-manager">
        <div className="instructor-selection">
          <label>Instructor:</label>
          <select defaultValue={day.instructor}>
            <option value="Angelina Jolie">Angelina Jolie</option>
            <option value="Milie Bobby Brown">Milie Bobby Brown</option>
            <option value="Jennifer Lawrence">Jennifer Lawrence</option>
            <option value="Sydney Sweeney">Sydney Sweeney</option>
            <option value="Sadie Sink">Sadie Sink</option>
          </select>
        </div>
        <div className="slots-list">
          <h4>Current Time Slots:</h4>
          <ul>
            {day.slots.map((slot, index) => (
              <li key={index} className="slot-item">
                <span>{slot}</span>
                <button
                  className="action-btn delete small"
                  onClick={() => {
                    const updatedSchedule = scheduleData.map(d => {
                      if (d.day === day.day) {
                        return { ...d, slots: d.slots.filter((_, i) => i !== index) };
                      }
                      return d;
                    });
                    setScheduleData(updatedSchedule);
                  }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-slot">
          <h4>Add New Slot:</h4>
          <div className="time-inputs">
            <input type="time" id="start-time" />
            <span>to</span>
            <input type="time" id="end-time" />
            <button
              className="action-btn add"
              onClick={() => {
                // In a real app, would get values from inputs
                const newSlot = "1:30 PM - 3:00 PM";
                const updatedSchedule = scheduleData.map(d => {
                  if (d.day === day.day) {
                    return { ...d, slots: [...d.slots, newSlot] };
                  }
                  return d;
                });
                setScheduleData(updatedSchedule);
                alert(`New slot added to ${day.day}'s schedule.`);
              }}>
              Add Slot
            </button>
          </div>
        </div>
        <div className="form-actions">
          <button
            className="action-btn save"
            onClick={() => {
              setShowModal(false);
              alert(`${day.day}'s schedule updated successfully!`);
            }}>
            Save Changes
          </button>
          <button
            className="action-btn cancel"
            onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  // Handler for view student
  const handleViewStudent = (student) => {
    setModalTitle(`Student Profile: ${student.name}`);
    setModalContent(
      <div className="student-profile">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <div className="profile-info">
            <h3>{student.name}</h3>
            <p>ID: {student.id} | Age: {student.age}</p>
            <span className={`progress-badge ${student.progress.toLowerCase()}`}>
              {student.progress}
            </span>
          </div>
        </div>
        <div className="progress-section">
          <h4>Learning Progress</h4>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(student.completedLessons / (student.completedLessons + student.remainingLessons)) * 100}%` }}>
            </div>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-label">Completed Lessons:</span>
              <span className="stat-value">{student.completedLessons}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Remaining Lessons:</span>
              <span className="stat-value">{student.remainingLessons}</span>
            </div>
          </div>
        </div>
        <div className="recent-sessions">
          <h4>Recent Sessions</h4>
          <ul className="sessions-list">
            <li className="session-item">
              <span className="session-date">2025-04-18</span>
              <span className="session-instructor">Instructor: Mark Davis</span>
              <span className="session-rating">Rating: ⭐⭐⭐⭐⭐</span>
            </li>
            <li className="session-item">
              <span className="session-date">2025-04-15</span>
              <span className="session-instructor">Instructor: Sarah Johnson</span>
              <span className="session-rating">Rating: ⭐⭐⭐⭐</span>
            </li>
          </ul>
        </div>
        <div className="form-actions">
          <button
            className="action-btn"
            onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  // Handler for edit student
  const handleEditStudent = (student) => {
    setModalTitle(`Edit Student: ${student.name}`);

    // Create a component for the edit form that correctly manages state
    const EditStudentForm = () => {
      const [formData, setFormData] = useState({
        name: student.name,
        age: student.age,
        progress: student.progress,
        completedLessons: student.completedLessons,
        remainingLessons: student.remainingLessons
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: name === 'age' || name === 'completedLessons' || name === 'remainingLessons'
            ? parseInt(value)
            : value
        }));
      };

      const handleSave = () => {
        // Update the studentsData state in parent component
        const updatedStudents = studentsData.map(s =>
          s.id === student.id ? { ...s, ...formData } : s
        );
        setStudentsData(updatedStudents);

        alert(`Student ${formData.name}'s information updated successfully!`);
        setShowModal(false);
      };

      return (
        <div className="edit-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Progress:</label>
            <select
              name="progress"
              value={formData.progress}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label>Completed Lessons:</label>
            <input
              type="number"
              name="completedLessons"
              value={formData.completedLessons}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Remaining Lessons:</label>
            <input
              type="number"
              name="remainingLessons"
              value={formData.remainingLessons}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button
              className="action-btn save"
              onClick={handleSave}>
              Save Changes
            </button>
            <button
              className="action-btn cancel"
              onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      );
    };

    setModalContent(<EditStudentForm />);
    setShowModal(true);
  };

  // Handler for respond to contact
  const handleRespondToContact = (contact) => {
    setModalTitle(`Respond to: ${contact.name}`);
    setModalContent(
      <div className="contact-response">
        <div className="contact-details">
          <p><strong>From:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Original Message:</strong> {contact.message}</p>
        </div>
        <div className="response-form">
          <div className="form-group">
            <label>Response:</label>
            <textarea rows="5" placeholder="Type your response here..."></textarea>
          </div>
        </div>
        <div className="form-actions">
          <button
            className="action-btn send"
            onClick={() => {
              alert(`Response to ${contact.name} sent successfully!`);
              setShowModal(false);
            }}>
            Send Response
          </button>
          <button
            className="action-btn cancel"
            onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  // Handler for archive contact
  const handleArchiveContact = (contact) => {
    const updatedContacts = contactsData.map(c =>
      c.id === contact.id ? { ...c, archived: true } : c
    );
    setContactsData(updatedContacts);
    alert(`Contact from ${contact.name} has been archived.`);
  };

  // Handler for logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      alert("You have been logged out successfully.");
    }
  };

  const handleNotifications = () => {
    setModalTitle("Notifications");
    setModalContent(
      <div className="notifications-panel">

        {/* Display here upcoming notifications */}
        <div className="notification-item">
          <p>Notifications will be shown here</p>
        </div>

        <div className="form-actions">
          <button
            className="action-btn"
            onClick={() => setShowModal(false)}>
            Close
          </button>
          <button
            className="action-btn clear"
            onClick={() => {
              alert("All notifications have been cleared.");
              setShowModal(false);
            }}>
            Clear All
          </button>
        </div>
      </div>
    );
    setShowModal(true);
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <section className="cards-section">
            {cardsData.map((card, index) => (
              <div className="card" key={index}>
                {card.icon}
                <div>
                  <p className="card-label">{card.label}</p>
                  <h2 className="card-value">{card.value}</h2>
                </div>
              </div>
            ))}
          </section>
        );
      case "bookings":
        return (
          <div className="content-section">
            <h2 className="section-title">Class Bookings</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Lesson Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsData.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.student}</td>
                      <td>{booking.type}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="action-btn edit"
                          onClick={() => handleEditBooking(booking)}>
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleCancelBooking(booking)}>
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "schedule":
        return (
          <div className="content-section">
            <h2 className="section-title">Schedule Manager</h2>
            <div className="schedule-container">
              {scheduleData.map((day, index) => (
                <div className="schedule-card" key={index}>
                  <h3 className="day-title">{day.day}</h3>
                  <p className="instructor-name">Instructor: {day.instructor}</p>
                  <div className="time-slots">
                    <h4>Available Time Slots:</h4>
                    <ul>
                      {day.slots.map((slot, slotIndex) => (
                        <li key={slotIndex}>{slot}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="schedule-btn"
                    onClick={() => handleManageSlots(day)}>
                    Manage Slots
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "students":
        return (
          <div className="content-section">
            <h2 className="section-title">Student Records</h2>
            <div className="student-filters">
              <input type="text" placeholder="Search students..." className="search-input" />
              <select className="filter-select">
                <option value="">Filter by Progress</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Progress</th>
                    <th>Completed Lessons</th>
                    <th>Remaining Lessons</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsData.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>
                        <span className={`progress-badge ${student.progress.toLowerCase()}`}>
                          {student.progress}
                        </span>
                      </td>
                      <td>{student.completedLessons}</td>
                      <td>{student.remainingLessons}</td>
                      <td>
                        <button
                          className="action-btn view"
                          onClick={() => handleViewStudent(student)}>
                          View
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => handleEditStudent(student)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "contacts":
        return (
          <div className="content-section">
            <h2 className="section-title">Contact Requests</h2>
            <div className="contacts-container">
              {contactsData.filter(contact => !contact.archived).map((contact) => (
                <div className="contact-card" key={contact.id}>
                  <div className="contact-header">
                    <h3>{contact.name}</h3>
                    <span className="contact-date">{contact.date}</span>
                  </div>
                  <div className="contact-info">
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                  </div>
                  <div className="contact-message">
                    <p><strong>Message:</strong></p>
                    <p>{contact.message}</p>
                  </div>
                  <div className="contact-actions">
                    <button
                      className="action-btn respond"
                      onClick={() => handleRespondToContact(contact)}>
                      Respond
                    </button>
                    <button
                      className="action-btn archive"
                      onClick={() => handleArchiveContact(contact)}>
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="content-section">
            <h2 className="section-title">Reports</h2>
            <div className="reports-container">
              <div className="report-card">
                <h3>Revenue Summary</h3>
                <div className="revenue-details">
                  <div className="revenue-item">
                    <span className="revenue-label">Monthly</span>
                    <span className="revenue-value">{reportsData.revenue.monthly}</span>
                  </div>
                  <div className="revenue-item">
                    <span className="revenue-label">Quarterly</span>
                    <span className="revenue-value">{reportsData.revenue.quarterly}</span>
                  </div>
                  <div className="revenue-item">
                    <span className="revenue-label">Yearly</span>
                    <span className="revenue-value">{reportsData.revenue.yearly}</span>
                  </div>
                </div>
              </div>

              <div className="report-card">
                <h3>Instructor Performance</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Instructor</th>
                      <th>Rating</th>
                      <th>Completed Lessons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.instructorPerformance.map((instructor, index) => (
                      <tr key={index}>
                        <td>{instructor.name}</td>
                        <td>{instructor.rating}</td>
                        <td>{instructor.completedLessons}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="report-card">
                <h3>Student Completion Stats</h3>
                <div className="completion-stats">
                  <div className="stat-item passed">
                    <span className="stat-value">{reportsData.studentCompletion.passed}</span>
                    <span className="stat-label">Passed</span>
                  </div>
                  <div className="stat-item failed">
                    <span className="stat-value">{reportsData.studentCompletion.failed}</span>
                    <span className="stat-label">Failed</span>
                  </div>
                  <div className="stat-item in-progress">
                    <span className="stat-value">{reportsData.studentCompletion.inProgress}</span>
                    <span className="stat-label">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? "" : "collapsed"}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu />
          </button>
          <span>Driving School</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li
              className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
              onClick={() => setActivePage("dashboard")}
            >
              <DashboardIcon className="nav-icon" /> <span>Dashboard</span>
            </li>
            <li
              className={`nav-item ${activePage === "bookings" ? "active" : ""}`}
              onClick={() => setActivePage("bookings")}
            >
              <FiBookOpen className="nav-icon" /> <span>Class Bookings</span>
            </li>
            <li
              className={`nav-item ${activePage === "schedule" ? "active" : ""}`}
              onClick={() => setActivePage("schedule")}
            >
              <FiClock className="nav-icon" /> <span>Schedule Manager</span>
            </li>
            <li
              className={`nav-item ${activePage === "students" ? "active" : ""}`}
              onClick={() => setActivePage("students")}
            >
              <FiUsers className="nav-icon" /> <span>Student Records</span>
            </li>
            <li
              className={`nav-item ${activePage === "contacts" ? "active" : ""}`}
              onClick={() => setActivePage("contacts")}
            >
              <FiMail className="nav-icon" /> <span>Contact Requests</span>
            </li>
            <li
              className={`nav-item ${activePage === "reports" ? "active" : ""}`}
              onClick={() => setActivePage("reports")}
            >
              <FiBarChart2 className="nav-icon" /> <span>Reports</span>
            </li>
            <li
              className="logout-item"
              onClick={handleLogout}
            >
              <RiLogoutCircleRLine className="nav-icon" /> <span>Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="main-header">
          <h1 className="page-title">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
          <div className="header-right">
            <FiBell
              className="icon notification-bell"
              onClick={handleNotifications}
            />
            <div className="user-badge">👤 Admin</div>
          </div>
        </div>

        {renderContent()}
      </main>

      {/* Modal Component */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{modalTitle}</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivingSchoolDashboard;