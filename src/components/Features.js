import React, { useState } from 'react';
import '../styles/Features.css';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

const features = [
  {
    title: 'Modern & Accessible UI',
    description: 'Clean and professional design with a calm color combination, ensuring a great user experience.',
    imgSrc: image1,
    imgAlt: 'Image showing modern and accessible UI design',
  },
  {
    title: 'User-Friendly Navigation',
    description: 'Simple and clear layout with dedicated sections for each service.',
    imgSrc: image2,
    imgAlt: 'Image illustrating user-friendly navigation',
  },
  {
    title: 'Online Application Submission',
    description: 'Users can apply for Learner`s License and Driving License without visiting an office.',
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
                <h2 className="thq-heading-2">{feature.title}</h2>
                <span className="thq-body-small">{feature.description}</span>
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
