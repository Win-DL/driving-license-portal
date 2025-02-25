import React from "react";
import PropTypes from "prop-types";
import "../styles/Hero.css";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import image10 from "../images/image10.jpg";
import image11 from "../images/image11.jpg";
import image12 from "../images/image12.jpg";

const Hero = ({
  heading1 = "Welcome to the Driving License Portal",
  content1 = "Apply for your Driving License with ease on our user-friendly platform. Streamlining the licensing process for a hassle-free experience.",
  action1 = "Get Started",
  action2 = "Know More",
  images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ],
  imageAlts = [
    "Driving License Portal Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
    "Hero Image",
  ],
}) => {
  return (
    <div className="hero-header78">
      <div className="hero-column thq-section-padding thq-section-max-width">
        <div className="hero-content1">
          <h1 className="hero-text1 thq-heading-1">{heading1}</h1>
          <p className="hero-text2 thq-body-large">{content1}</p>
        </div>
        <div className="hero-actions">
          <button className="thq-button-filled hero-button1">
            <span className="thq-body-small">{action1}</span>
          </button>
          <button className="thq-button-outline hero-button2">
            <span className="thq-body-small">{action2}</span>
          </button>
        </div>
      </div>
      <div className="hero-content2">
        <div className="hero-image-slider">
          <div className="hero-image-track">
            {images.concat(images).map((src, i) => (
              <img
                key={i}
                alt={imageAlts[i % images.length] || "Hero Image"}
                src={src}
                className="hero-placeholder-image thq-img-scale thq-img-ratio-4-3"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-container2"></div>
    </div>
  );
};

Hero.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
  action1: PropTypes.string,
  action2: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  imageAlts: PropTypes.arrayOf(PropTypes.string),
};

export default Hero;
