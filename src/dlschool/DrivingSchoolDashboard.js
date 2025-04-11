import React from "react";
import "../styles/DrivingSchoolDashboard.css";
import {
  FiBell,
  FiLogOut,
  FiUsers,
  FiCalendar,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";

const Dashboard = ({
  todaysSessions = 0,
  pendingConfirmations = 0,
  newRegistrations = 0,
  contactRequests = 0,
  upcomingSessions = 0,
}) => {
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
      icon: <FiCalendar className="card-icon indigo" />,
      label: "Upcoming Sessions",
      value: upcomingSessions,
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">Driving School</div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">Dashboard</li>
            <li className="nav-item">Class Bookings</li>
            <li className="nav-item">Schedule Manager</li>
            <li className="nav-item">Student Records</li>
            <li className="nav-item">Contact Requests</li>
            <li className="nav-item">Reports</li>
            <li className="logout-item">
              <FiLogOut /> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="main-header">
          <h1 className="page-title">Dashboard</h1>
          <div className="header-right">
            <FiBell className="icon" />
            <div className="user-badge">Admin</div>
          </div>
        </div>

        {/* Cards Section */}
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
      </main>
    </div>
  );
};

export default Dashboard;
