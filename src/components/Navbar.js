import React from "react";
import "../styles/Navbar.css";
import logo from "../images/logo.png";

const Navbar = ({
  link1 = "Apply LL",
  link2 = "Apply DL",
  link3 = "Application Status",
  link4 = "Tutorial LL",
  logoSrc = logo,
  logoAlt = "Driving License Portal",
}) => {
  return (
    <div className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <img
          alt={logoAlt}
          src={logoSrc}
          className="navbar-image1"
          aria-label="Website Logo"
        />
        <nav className="navbar-desktop-menu">
          <div className="navbar-links1">
            <span className="thq-link thq-body-small">{link1}</span>
            <span className="thq-link thq-body-small">{link2}</span>
            <span className="thq-link thq-body-small">{link3}</span>
            <span className="thq-link thq-body-small">{link4}</span>
          </div>
          
          <form className="d-flex search-school" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for Driving School"
              aria-label="Search"
            ></input>
            <button className="navbar-action11 thq-button-animated thq-button-filled" type="submit">
              Search
            </button>
          </form>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
