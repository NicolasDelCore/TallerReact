import React, { useState } from 'react';
import "../App.css";
import arrowImage from '../img/back-to-top.png'; // Import the arrow image

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to toggle visibility of the button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Event listener for scroll position change
  window.addEventListener('scroll', toggleVisibility);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} title="Go to top">
          <img src={arrowImage} alt="Scroll to top" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
