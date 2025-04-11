import React from "react";
import "../styles/InstructionsLL.css";

const InstructionsLL = () => {
  return (
    <div className="instructions-container">
      <div className="instructions-header">Instructions for Application Submission</div>
      <div className="instructions-body">
        <p className="instructions-title">
          <strong>Following are the stages of application for applying learners licence</strong>
        </p>
        <ol className="instructions-list">
          <li>FILL APPLICATION DETAILS LL</li>
          <li>UPLOAD DOCUMENTS</li>
          <li>UPLOAD PHOTO AND SIGNATURE (In case of eKYC through Aadhaar, only Signature need to be uploaded)</li>
          <li>FEE PAYMENT</li>
          <li>VERIFY THE PAYMENT STATUS</li>
          <li>PRINT THE RECEIPT</li>
          <li>LL SLOT BOOK</li>
        </ol>
        <p className="instructions-note">
          <strong>NOTE :</strong> <span>Please go through the <span className="highlight">Road Safety tutorial</span> before proceeding for online Learners Licence test.</span>
        </p>
        <div className="buttons-container">
          <button className="continue-btn">Continue</button>
          <button className="home-btn">Home</button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsLL;
