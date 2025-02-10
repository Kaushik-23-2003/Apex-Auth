// src/pages/Home.jsx
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import robotImage from '../assets/robot-heart-beer-unscreen.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode, default to false (light mode)
  const { currentUser } = useSelector((state) => state.user);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
    <Navbar isDarkMode={isDarkMode} /> 
    <div className={`${styles.home} ${isDarkMode ? styles.dark : styles.light}`}> {/* Apply styles.dark or styles.light */}
      {/* Navbar */}

      {/* Theme Toggle Button - Top Right Corner Below Navbar */}
      <div className={styles.themeToggleContainer}>
        <button
          className={`${styles.themeToggleButton} ${
            isDarkMode ? styles.darkThemeToggleButton : styles.lightThemeToggleButton
          }`}
          onClick={toggleDarkMode}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} /> {/* Sun for light, Moon for dark */}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Greeting Section */}
      <div className={styles.greetingContainer}>
        <h1
          className={`${styles.greetingText} ${
            isDarkMode ? styles.darkGreetingText : styles.lightGreetingText
          }`}
        >
          Hi, {currentUser?.user?.username || "User"} 👋
        </h1>
        <p
          className={`${styles.greetingSubText} ${
            isDarkMode ? styles.darkGreetingSubText : styles.lightGreetingSubText
          }`}
        >
          Welcome to your personalized space!
        </p>
      </div>

      {/* Robot Animation */}
      <div className={styles.robotContainer}>
        <img src={robotImage} alt="Robot says Hi" className={styles.robotImage} style={{ backgroundColor: 'transparent' }} /> {/* Removed background: none from style */}
      </div>

      {/* Footer */}
      <footer
        className={`${styles.homeFooter} ${
          isDarkMode ? styles.darkHomeFooter : styles.lightHomeFooter
        }`}
      >
        © 2025 YourApp. All Rights Reserved.
      </footer>
    </div>
    </>
  );
};

export default Home;