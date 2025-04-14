import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CTA.css';
import { useNavigate } from 'react-router-dom';

const CTA = ({
  heading1 = 'Get Started Today!',
  content1 = "Get your driving license quickly and easily with our streamlined process.",
  action1 = 'Apply Now',
}) => {
  const navigate = useNavigate();

  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta-accent2-bg">
          <div className="cta-accent1-bg">
            <div className="cta-container2">
              <div className="cta-content">
                <span className="thq-heading-2">{heading1}</span>
                <p className="thq-body-large">{content1}</p>
              </div>
              <div className="cta-actions">
                <button type="button" className="thq-button-filled cta-button"
                  onClick={() => window.location.href = "/llapply"}
                 >
                  {action1}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CTA.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
  action1: PropTypes.string,
}

export default CTA
