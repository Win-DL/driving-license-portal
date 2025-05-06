import React, { useState } from 'react';
import '../styles/Features.css';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

const features = [
  {
    title: 'Connect with Verified Driving Schools',
    description: 'Browse and enroll in certified driving schools near you using Google Maps integration. Get access to ratings, contact info, and course details — all in one place.',
    imgSrc: image1,
    // imgAlt: 'Image showing modern and accessible UI design',
  },
  {
    title: 'Manage Class Schedule & Progress',
    description: 'Track your driving lessons with an interactive calendar. See upcoming sessions, completed classes, and your learning milestones at a glance.',
    imgSrc: image2,
    // imgAlt: 'Image illustrating user-friendly navigation',
  },
  {
    title: 'Online Application Submission',
    description: 'Users can apply for Driving License without visiting an office. After completing your training, apply for a learner or permanent license directly through the portal. Upload required documents and track your application status in real time.',
    imgSrc: image3,
    imgAlt: 'Image depicting online application submission',
  },
];

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="thq-section-padding">
      <div className="features2-container2 thq-section-max-width">
        <div className="features2-tabs-menu">
          {features.map((feature, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab(index)}
              onKeyDown={(e) => e.key === "Enter" && setActiveTab(index)}
              className={`features2-tab-horizontal${index + 1}`}
              aria-pressed={activeTab === index} 
            >

              <div className={`features2-divider-container${index + 1}`}>
                {activeTab === index && <div className={`features2-container${index + 3}`}></div>}
              </div>
              <div className={`features2-content${index + 1}`}>
                <h2 className="thq-heading-3">{feature.title}</h2>
                <span className="thq-body-xsmall">{feature.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="features2-image-container">
          <img
            alt={features[activeTab].imgAlt}
            src={features[activeTab].imgSrc}
            className="features2-image thq-img-ratio-16-9"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
