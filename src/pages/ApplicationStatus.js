import React, { useState } from "react";
import "../styles/ApplicationStatus.css";

const ApplicationStatus = () => {
  const [appId, setAppId] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      // Simulate API call (Replace with actual API)
      setTimeout(() => {
        if (appId === "12345" && dob === "2000-01-01") {
          setStatus({
            status: "Approved",
            lastUpdated: "2025-04-10T14:32:00Z",
            remarks: "Application issued successfully.",
          });
        } else {
          setError("No application found with provided details.");
        }
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="status-container">
      <div className="status-icon-container">
        <div className="status-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>

      <h2 className="status-header">Check Application Status</h2>

      <form onSubmit={handleCheckStatus} className="status-form">
        <div className="form-group">
          <label className="form-label" htmlFor="appId">
            Application ID
          </label>
          <input
            id="appId"
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            required
            placeholder="Enter your application ID"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="dob">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? "submit-button-loading" : "submit-button-active"}`}
        >
          {loading ? (
            <>
              <svg
                className="spinner"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Checking...
            </>
          ) : (
            "Check Status"
          )}
        </button>
      </form>

      {error && (
        <div className="error-container">
          <div className="error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="error-message">{error}</div>
        </div>
      )}

      {status && (
        <div className="status-result">
          <div
            className={`status-card ${
              status.status === "Approved"
                ? "status-approved"
                : status.status === "Pending"
                  ? "status-pending"
                  : "status-other"
            }`}
          >
            <div className="status-header-container">
              {status.status === "Approved" && (
                <div className="status-badge">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              <h3 className="status-title">Status: {status.status}</h3>
            </div>

            <div className="status-details">
              <p className="status-detail-item">
                <svg
                  className="status-detail-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Last Updated: {new Date(status.lastUpdated).toLocaleString()}
              </p>
              <p className="status-detail-item">
                <svg
                  className="status-detail-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Remarks: {status.remarks}
              </p>
            </div>
          </div>
        </div>
      )}

      <button className="thq-button-outline hero-button2">
        <span className="thq-body-small">Back</span>
      </button>
    </div>
  );
};

export default ApplicationStatus;
