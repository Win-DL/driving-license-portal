import React from "react";
import PropTypes from "prop-types";
import "../styles/Steps.css";

const Steps = ({
  step1Title = "Home Page Navigation",
  step1Description = "Users arrive at the homepage and can choose options like Apply DL, Application Status, and Book Sessions. A navigation bar helps users move between different sections.",
  step2Title = "Applying for Driving License (DL)",
  step2Description = "Users can start their application by clicking on the respective button, filling in required details, uploading necessary documents, and submitting the application.",
  step3Title = "Checking Application Status",
  step3Description = "Users can track the status of their DL application by entering their application number.",
  step4Title = "Book Sessions",
  step4Description = "The platform offers users to book sessions based on availability of slots."
}) => {
  return (
    <section className="steps-container1 thq-section-padding">
      <div className="steps-max-width thq-section-max-width">
        <div className="steps-container2 thq-grid-2">
          {/* Section Header */}
          <div className="steps-section-header">
            <h2 className="thq-heading-2">Discover the Power of Our Portal</h2>
            <p className="thq-body-large">
              Our platform offers a seamless experience for users to apply for 
              Driving License (DL), track their application status, and prepare
              for the test. Hurry Up! Be the first one to get Driving License.
            </p>
            <div className="steps-actions">
              <button className="thq-button-animated thq-button-filled steps-button">
                <span className="thq-body-small">Get Started</span>
              </button>
            </div>
          </div>

          {/* Steps Container */}
          <div className="steps-container3">
            {[{ title: step1Title, desc: step1Description, num: "01" },
              { title: step2Title, desc: step2Description, num: "02" },
              { title: step3Title, desc: step3Description, num: "03" },
              { title: step4Title, desc: step4Description, num: "04" }
            ].map((step, index) => (
              <div key={index} className={`steps-container${index + 4} thq-card`}>
                <h2 className="thq-heading-3">{step.title}</h2>
                <span className="thq-body-small">{step.desc}</span>
                <label className="thq-heading-3">{step.num}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Steps.propTypes = {
  step1Title: PropTypes.string,
  step1Description: PropTypes.string,
  step2Title: PropTypes.string,
  step2Description: PropTypes.string,
  step3Title: PropTypes.string,
  step3Description: PropTypes.string,
  step4Title: PropTypes.string,
  step4Description: PropTypes.string
};

export default Steps;
