import React, { useState } from "react";
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
            </nav>
        </header>
    </div>
  );
};

export default Navbar;
