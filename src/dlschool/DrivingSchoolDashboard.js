import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  FiBell,
  FiLogOut,
  FiUsers,
  FiCalendar,
  FiMail,
  FiCheckCircle,
  FiBookOpen,
  FiClock,
  FiBarChart2,
  FiMenu,
} from "react-icons/fi";
import "../styles/DrivingSchoolDashboard.css";

const DrivingSchoolDashboard = ({
  todaysSessions = 0,
  pendingConfirmations = 0,
  newRegistrations = 0,
  contactRequests = 0,
  upcomingSessions = 0,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  const cardsData = [
    {
      icon: <FiCalendar className="card-icon blue" />,
      label: "Today’s Sessions",
      value: todaysSessions,
    },
    {
      icon: <FiCheckCircle className="card-icon green" />,
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
      value: contactRequests,
    },
    {
      icon: <FiClock className="card-icon indigo" />,
      label: "Upcoming Sessions",
      value: upcomingSessions,
    },
  ];

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
        return <h2>Class Bookings Content</h2>;
      case "schedule":
        return <h2>Schedule Manager Content</h2>;
      case "students":
        return <h2>Student Records Content</h2>;
      case "contacts":
        return <h2>Contact Requests Content</h2>;
      case "reports":
        return <h2>Reports Content</h2>;
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
            <li className="logout-item">
              <FiLogOut className="nav-icon" /> <span>Logout</span>
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
            <FiBell className="icon" />
            <div className="user-badge">👤 Admin</div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default DrivingSchoolDashboard;
