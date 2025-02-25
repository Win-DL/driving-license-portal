import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({
  link1 = "Apply LL",
  link2 = "Apply DL",
  link3 = "Application Status",
  link4 = "Tutorial LL",
  logoSrc = logo,
  logoAlt = "Driving License Portal",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <img alt={logoAlt} src={logoSrc} className="navbar-image1" />
        <nav className="navbar-desktop-menu">
          <div className="navbar-links1">
            <a href="#" className="thq-link thq-body-small">
              {link1}
            </a>
            <a href="#" className="thq-link thq-body-small">
              {link2}
            </a>
            <a href="#" className="thq-link thq-body-small">
              {link3}
            </a>
            <a href="#" className="thq-link thq-body-small">
              {link4}
            </a>
          </div>
          <form className="d-flex search-school" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search for Driving School"
            />
            <button
              className="navbar-action11 thq-button-animated thq-button-filled"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>
        <button
          className="navbar-burger-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>
      <div className={`navbar-mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="navbar-top">
          <img src={logoSrc} alt={logoAlt} className="navbar-logo" />
          <button
            className="navbar-close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="navbar-nav">
          <a href="#" className="thq-link thq-body-small">
            {link1}
          </a>
          <a href="#" className="thq-link thq-body-small">
            {link2}
          </a>
          <a href="#" className="thq-link thq-body-small">
            {link3}
          </a>
          <a href="#" className="thq-link thq-body-small">
            {link4}
          </a>
        </nav>
        <form className="d-flex search-school mobile-search" role="search">
          <input
            className="form-control"
            type="search"
            placeholder="Search for Driving School"
          />
          <button
            className="navbar-action11 thq-button-animated thq-button-filled"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
