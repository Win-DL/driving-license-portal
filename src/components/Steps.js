import React from "react";
import PropTypes from "prop-types";
import "../styles/Steps.css";

const Steps = ({
  step1Title = "Search for Driving Schools",
  step1Description = "Users can find driving schools based on their location and can choose the one that suits them best.",
  step2Title = "Book Driving Classes",
  step2Description = "Users can book their preferred class slots with the selected driving school.",
  step3Title = "Track Your Progress",
  step3Description = "Users can track their progress throughout the course and get reminders for upcoming classes.",
  step4Title = "Apply for Driving License",
  step4Description = "Users can apply for a driving license directly through the portal once they complete their training.",
}) => {
  return (
    <section className="steps-container1 thq-section-padding">
      <div className="steps-max-width thq-section-max-width">
        <div className="steps-container2 thq-grid-2">
          {/* Section Header */}
          <div className="steps-section-header">
            <h2 className="thq-heading-2">Discover the Power of Our Portal</h2>
            <p className="thq-body-large">
              This Driving License Portal helps users find and connect with
              verified driving schools nearby. Users can easily search for
              schools, book their preferred class slots, and start their driving
              lessons. The platform allows users to track their progress
              throughout the course. Once the training is completed, users can
              apply for a driving license directly through the portal and
              download it once it’s issued — all from one convenient place.
            </p>
            <div className="steps-actions">
              {/* <button className="thq-button-animated thq-button-filled steps-button"
                onClick={() =>  window.location.href = "/llapply"}
              >
                <span className="thq-body-small">Get Started</span>
              </button> */}
            </div>
          </div>

          {/* Steps Container */}
          <div className="steps-container3">
            {[
              { title: step1Title, desc: step1Description, num: "01" },
              { title: step2Title, desc: step2Description, num: "02" },
              { title: step3Title, desc: step3Description, num: "03" },
              { title: step4Title, desc: step4Description, num: "04" },
            ].map((step, index) => (
              <div
                key={index}
                className={`steps-container${index + 4} thq-card`}
              >
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
  step4Description: PropTypes.string,
};

export default Steps;
