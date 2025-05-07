import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HelpCenter.css';
import logo from "../images/logo.png";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // FAQ categories for driving school platform
  const faqCategories = {
    'getting-started': [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' on our homepage. You'll need your email address and to create a password. After verifying your email, you can access all platform features to find and book driving schools."
      },
      {
        question: "What documents do I need to upload?",
        answer: "You'll need to upload a valid ID proof (Aadhar Card, etc.), proof of address, and a recent passport-sized photo. All documents should be in PDF or image format (.jpg, .png) up to 2MB each."
      },
      {
        question: "How do I find driving schools near me?",
        answer: "After logging in, you can use our 'Find Schools' feature which uses your location to display nearby driving schools. You can filter by distance, ratings, and available time slots."
      }
    ],
    'booking-classes': [
      {
        question: "How do I book driving lessons?",
        answer: "Select your preferred driving school, fill the form and choose  dates and times of joining classes, and click 'Book Now'."
      },
      {
        question: "Can I reschedule my driving lesson?",
        answer: "No! You can only cancel your booking by requesting us. To reschedule, you need to create a new one."
      },
      {
        question: "What if I need to cancel my booking?",
        answer: "You cannot directly cancel your booking. Please contact our support team to assist you with the cancellation process. Cancellation policies may vary by school."
      }
    ],
    'progress-tracking': [
      {
        question: "How can I track my learning progress?",
        answer: "Your dashboard shows a progress tracker with completed lessons, remaining lessons."
      },
      {
        question: "Can my driving instructor add notes to my progress?",
        answer: "No!, Currently, instructors cannot add notes. However, you can communicate with them directly through the their contact number."
      },
      {
        question: "How do I know when I'm ready for the driving test?",
        answer: "When you book your slot you'll be given option to choose the test starting date. Your classes will be on daily basis. Once you complete the classes, your instructor will mark you as 'completed'. However, it's best to consult with your instructor for a personalized assessment."
      }
    ],
    'test-scheduling': [
      {
        question: "How do I schedule my driving test?",
        answer: "No!, You cannot schedule your driving test through our platform. You need to contact the driving school directly to schedule your test."
      },
      {
        question: "What should I bring to my driving test?",
        answer: "Bring your learner's permit/provisional license, proof of identity, confirmation of your test appointment, and the vehicle you practiced in (if using your own) otherwise school will provide you one. Arrive 15 minutes early."
      },
    ],
    'payments': [
      {
        question: "What payment methods do you accept?",
        answer: "We accept only UPI method. Your payments are processed securely through our platform."
      },
      {
        question: "How do I view my payment history?",
        answer: "Go to 'Dashboard' and select the 'Application' tab and click the 'Payment' to see your details."
      },
      {
        question: "Are there any additional fees?",
        answer: "The price shown during booking includes all standard fees."
      }
    ],
    'license-application': [
      {
        question: "How do I apply for my driving license after passing the test?",
        answer: "Once you pass your test, a 'Apply for License' button will appear on your dashboard. Click it, pay applicable  fees, and submit your application."
      },
      {
        question: "How long does the license application process take?",
        answer: "Processing times vary by location, but typically applications are processed within 5-7 working days. You can track your application status in real-time through your dashboard."
      }
    ],
    'license-download': [
      {
        question: "How do I download my digital license?",
        answer: "Once your license is approved, you'll receive an email notification. Log in to your account, go to 'My Documents', and download your digital license from there."
      },
    ],
    'troubleshooting': [
      {
        question: "Why won't my documents upload?",
        answer: "Check the file size (max 2MB) and format (PDF, JPG, PNG). Ensure your internet connection is stable. If problems persist, try using a different browser or contact support."
      },
      {
        question: "I forgot my password - what should I do?",
        answer: "Click 'Forgot Password' on the login page. You'll receive an email with reset instructions to the email address associated with your account."
      },
      {
        question: "How do I contact support?",
        answer: "Use the 'Contact Us' form at the bottom of this page, or email support@dleasy.com. Our team typically responds within 24 hours on business days."
      }
    ]
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const filteredFAQs = Object.entries(faqCategories).reduce((acc, [category, questions]) => {
    if (activeCategory === 'all' || activeCategory === category) {
      const categoryQuestions = questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (categoryQuestions.length > 0) {
        acc[category] = categoryQuestions;
      }
    }
    return acc;
  }, {});

  return (
    <div className="user-page-container">
      <nav className="user-navbar">
        <img alt="DL Easy Logo" src={logo} className="user-logo" onClick={() => navigate("/")} />
        <div className="user-navbar-links">
          <ul className="user-navbar-list">
            <li className="user-navbar-item" onClick={() => navigate("/about")}>About Us</li>
            <li className="user-navbar-item" onClick={() => navigate("/privacy")}>Privacy Policy</li>
            <li className="user-navbar-item active">Help Center</li>
          </ul>
        </div>
      </nav>

      <main className="user-help-center">
        <section className="user-help-hero">
          <h1>DL Easy Help Center</h1>
          <p>Find answers to all your questions about booking driving lessons, tracking progress, and getting your license</p>
          
          <div className="user-search-container">
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="user-search-input"
            />
            <button className="user-search-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </section>

        <div className="user-help-content">
          <aside className="user-category-sidebar">
            <h3>Categories</h3>
            <ul>
              <li 
                className={activeCategory === 'getting-started' ? 'active' : ''}
                onClick={() => setActiveCategory('getting-started')}
              >
                Getting Started
              </li>
              <li 
                className={activeCategory === 'booking-classes' ? 'active' : ''}
                onClick={() => setActiveCategory('booking-classes')}
              >
                Booking Classes
              </li>
              <li 
                className={activeCategory === 'progress-tracking' ? 'active' : ''}
                onClick={() => setActiveCategory('progress-tracking')}
              >
                Progress Tracking
              </li>
              <li 
                className={activeCategory === 'test-scheduling' ? 'active' : ''}
                onClick={() => setActiveCategory('test-scheduling')}
              >
                Test Scheduling
              </li>
              <li 
                className={activeCategory === 'payments' ? 'active' : ''}
                onClick={() => setActiveCategory('payments')}
              >
                Payments
              </li>
              <li 
                className={activeCategory === 'license-application' ? 'active' : ''}
                onClick={() => setActiveCategory('license-application')}
              >
                License Application
              </li>
              <li 
                className={activeCategory === 'license-download' ? 'active' : ''}
                onClick={() => setActiveCategory('license-download')}
              >
                License Download
              </li>
              <li 
                className={activeCategory === 'troubleshooting' ? 'active' : ''}
                onClick={() => setActiveCategory('troubleshooting')}
              >
                Troubleshooting
              </li>
            </ul>
          </aside>

          <section className="user-faq-section">
            {Object.entries(filteredFAQs).map(([category, questions]) => (
              <div key={category} className="user-faq-category">
                <h2>
                  {category === 'getting-started' && 'Getting Started'}
                  {category === 'booking-classes' && 'Booking Driving Classes'}
                  {category === 'progress-tracking' && 'Progress Tracking'}
                  {category === 'test-scheduling' && 'Test Scheduling'}
                  {category === 'payments' && 'Payments'}
                  {category === 'license-application' && 'License Application'}
                  {category === 'license-download' && 'License Download'}
                  {category === 'troubleshooting' && 'Troubleshooting'}
                </h2>
                
                <div className="user-faq-questions">
                  {questions.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`user-faq-item ${expandedQuestion === index ? 'expanded' : ''}`}
                      onClick={() => toggleQuestion(index)}
                    >
                      <div className="user-faq-question">
                        <h3>{faq.question}</h3>
                        <svg 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor"
                          className={expandedQuestion === index ? 'expanded' : ''}
                        >
                          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      {expandedQuestion === index && (
                        <div className="user-faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(filteredFAQs).length === 0 && (
              <div className="user-no-results">
                <p>No results found for "{searchQuery}"</p>
                <button onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}>
                  Show all questions
                </button>
              </div>
            )}
          </section>
        </div>

        <section className="user-contact-promo">
          <h2>Still need help?</h2>
          <p>Our support team is ready to assist you with any questions about driving lessons or license applications</p>
          <button 
            className="user-contact-button"
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </button>
        </section>
      </main>

      <footer className="user-lp-footer">
        <p>DL Easy</p>
        <p>&copy; 2025 DL Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HelpCenter;