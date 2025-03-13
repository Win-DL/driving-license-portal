import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoClose } from "react-icons/io5"; 
import { RiLogoutCircleRLine } from "react-icons/ri";
import "../styles/Navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ logoSrc = logo, logoAlt = "Driving License Portal" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <img
          alt={logoAlt}
          src={logoSrc}
          className="navbar-image1"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />

        <nav className="navbar-desktop-menu">
          <div className="profile-container">
            <button
              ref={buttonRef}
              className="profile-btn"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <MdAccountCircle className="profile-icon" />
            </button>

            <div
              ref={menuRef}
              className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}
            >
              <div className="dropdown-header">
                <h3>Menu</h3>
                <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
                  <IoClose size={24} />
                </button>
              </div>
              <ul>
                <li>
                  <Link to="/llapply" onClick={() => setIsMenuOpen(false)}>Apply for Learner License</Link>
                </li>
                <li>
                  <Link to="/bookingsessions" onClick={() => setIsMenuOpen(false)}>Book your Session</Link>
                </li>
                <li>
                  <Link to="/checkstatus" onClick={() => setIsMenuOpen(false)}>Check Application Status</Link>
                </li>
                <li>
                  <Link to="/dlapply" onClick={() => setIsMenuOpen(false)}>Apply for Driving License</Link>
                </li>
                <li className="logout-btn">
                  <Link to="/logout" onClick={() => setIsMenuOpen(false)}>Logout <RiLogoutCircleRLine /> </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
