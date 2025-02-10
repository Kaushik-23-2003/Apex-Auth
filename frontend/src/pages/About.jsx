import React, { useState } from 'react';
import styles from '../styles/About.module.css';
import avatarImage from '../assets/male-avatar.png';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import LinkedIn and GitHub icons

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} />
      <div className={`${styles.aboutPage} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.themeToggleContainer}>
          <button className={styles.themeToggleButton} onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <header className={styles.aboutHeader}>
          <h1 className={styles.aboutTitle}>About Me</h1>
          <p className={styles.aboutSubtitle}>Get to know the developer behind this project.</p>
        </header>

        <main className={styles.aboutContent}>
          <section className={styles.aboutSection}>
            <div className={styles.developerInfo}>
              <img src={avatarImage} alt="Developer Avatar" className={styles.developerAvatar} />
              <div className={styles.developerText}>
                <h2 className={styles.developerName}>Kaushik</h2>
                <p className={styles.developerDescription}>
                  Hi! I'm Kaushik, a passionate software developer and AI enthusiast.
                  With a background in B.Tech CSE-AI, I love building projects that bring ideas to life.
                </p>
                <p className={styles.developerDescription}>
                  This project marks my first deep dive into the <span>MERN stack</span>,
                  where I’ve built a <span>fully functional full-stack application</span>.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.skillsSection}>
            <h2 className={styles.sectionTitle}>👨‍💻 Tech Stack</h2>
            <div className={styles.skillsGrid}>
              {['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'Git & GitHub'].map(skill => (
                <span key={skill} className={styles.skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>📩 Get in Touch</h2>
            <p className={styles.contactText}>Feel free to reach out for collaborations or tech chats!</p>
            <div className={styles.contactLinks}>
              <a href="https://www.linkedin.com/in/hariharan-kaushik-67188b1b5/" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                <FaLinkedin className={styles.contactIcon} /> {/* LinkedIn Icon */}
                LinkedIn
              </a>
              <a href="https://github.com/Kaushik-23-2003" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                <FaGithub className={styles.contactIcon} /> {/* GitHub Icon */}
                GitHub
              </a>
            </div>
          </section>
        </main>

        <footer className={styles.aboutFooter}>
          © 2025 Kaushik. All Rights Reserved.
        </footer>
      </div>
    </>
  );
};

export default AboutPage;