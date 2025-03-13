import React from "react";
import "../styles/LearnerLicenseForm.css";

const LearnerLicenseForm = () => {
  return (
    <div className="form-container">
      <h2 className="header">Learner's License Application Form</h2>
      <h3 className="header1">Personal Details</h3>

      <form className="form-section">
        <div className="form-row">
          <div className="details-section">
            <label className="required">
              Name of the Applicant: (As Per Aadhaar)
            </label>
            <div className="input-group">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Middle Name" />
              <input type="text" placeholder="Last Name" />
            </div>

            <div className="form-row">
              <label className="required">Father's Name:</label>
              <input type="text" placeholder="Father's Full Name" />
            </div>

            <div className="form-row">
              <label className="required">Mother's Name:</label>
              <input type="text" placeholder="Mother's Full Name" />
            </div>

            <div className="form-row">
              <label className="required">Gender:</label>
              <label>
                <input type="radio" name="gender" /> Male
              </label>
              <label>
                <input type="radio" name="gender" /> Female
              </label>
              <label>
                <input type="radio" name="gender" /> Other
              </label>
            </div>

            <div className="form-row">
              <label className="required">Date of Birth:</label>
              <input type="text" placeholder="DD-MM-YYYY" />
            </div>

            <div className="form-row">
              <label className="required">Country of Birth:</label>
              <select>
                <option>India</option>
              </select>
            </div>

            <div className="form-row">
              <label className="required">Blood Group:</label>
              <select>
                <option>Unknown</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="form-row">
              <label className="required">Applicant Mobile Number:</label>
              <input type="text" placeholder="Mobile Number" />
            </div>

            <div className="form-row">
              <label>Email Id:</label>
              <input type="email" placeholder="example@xyz.com" />
            </div>

            <div className="form-row">
              <label>Emergency Mobile Number:</label>
              <input type="text" placeholder="Alternate Mobile Number" />
            </div>

            <div className="form-row">
              <label className="required">Identification Mark 1:</label>
              <input
                type="text"
                placeholder="Scar on head, mole on right hand, etc."
              />
            </div>

            <div className="form-row">
              <label>Identification Mark 2:</label>
              <input
                type="text"
                placeholder="Scar on head, mole on right hand, etc."
              />
            </div>
          </div>
        </div>

        <h3 className="header1">Address</h3>
        <div className="address-container form-row">
          <div className="address-section">
            <h4>Present Address</h4>
            <div className="form-row">
              <label className="required">State:</label>
              <select>
                <option>Bihar</option>
              </select>
            </div>
            <div className="form-row">
              <label className="required">District:</label>
              <select>
                <option>Select</option>
              </select>
            </div>
            <div className="form-row">
              <label className="required">City/Town:</label>
              <input type="text" placeholder="Enter City/Town" />
            </div>
            <div className="form-row">
              <label>Pincode:</label>
              <input type="text" placeholder="ENTER PINCODE" />
            </div>
          </div>
          <div className="address-section">
            <h4>Permanent Address</h4>
            <label className="checkbox-container">
              <input type="checkbox" /> Same as Present Address
            </label>
            <div className="form-row">
              <label className="required">State:</label>
              <select>
                <option>Select</option>
              </select>
            </div>
            <div className="form-row">
              <label className="required">District:</label>
              <select>
                <option>Select</option>
              </select>
            </div>
            <div className="form-row">
              <label className="required">City/Town:</label>
              <input type="text" placeholder="Enter City/Town" />
            </div>
            <div className="form-row">
              <label>Pincode:</label>
              <input type="text" placeholder="ENTER PINCODE" />
            </div>
          </div>
        </div>

        <h3 className="header1">Upload Required Documents</h3>
        <div className="document-upload-section">
          <p className="note">
            (Upload scanned copies in PDF, PNG, or JPG format)
          </p>
          <div className="form-row">
            <label className="required">Aadhaar Card:</label>
            <input type="file" accept=".pdf, .png, .jpg, .jpeg" />
          </div>
          <div className="form-row">
            <label className="required">Proof of Address:</label>
            <input type="file" accept=".pdf, .png, .jpg, .jpeg" />
          </div>
          <div className="form-row">
            <label className="required">Proof of Age:</label>
            <input type="file" accept=".pdf, .png, .jpg, .jpeg" />
          </div>
        </div>

        <div className="terms-conditions">
          <p className="terms-text">
            By submitting this application, I confirm that:
          </p>
          <ul className="terms-list">
            <li>
              All information provided is true and correct to the best of my
              knowledge.
            </li>
            <li>
              I meet the eligibility criteria for obtaining a learner’s license
              as per government regulations.
            </li>
            <li>
              I agree to comply with the traffic laws and regulations of India.
            </li>
            <li>
              The uploaded documents are authentic, and any false declaration
              may lead to application rejection or legal action.
            </li>
            <li>
              I consent to the processing of my personal data for verification
              and record-keeping purposes.
            </li>
          </ul>
          <label className="checkbox-container">
            <input type="checkbox" required /> I have read and agree to the
            Terms and Conditions
          </label>
        </div>

        <div className="button-container">
          <button type="submit" className="thq-button-outline hero-button2">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default LearnerLicenseForm;
