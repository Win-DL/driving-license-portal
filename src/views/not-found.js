import React from "react";
import { Helmet } from "react-helmet";
import "./not-found.css";

const NotFound1 = ({ className = "" }) => {
  return (
    <main className={`not-found1-container1 ${className}`} role="alert">
      <Helmet>
        <title>404 - Page Not Found | WinDL</title>
        <meta name="description" content="Oops! The page you requested was not found." />
      </Helmet>

      <h3 aria-label="Page not found message">OOPS! PAGE NOT FOUND</h3>

      <div className="not-found1-container2">
        <h1 className="not-found1-text2" aria-label="Error code 404">404</h1>
      </div>

      <div className="not-found1-container3">
        <h2 className="not-found1-text3">
          WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
        </h2>
      </div>
    </main>
  );
};

export default NotFound1;
