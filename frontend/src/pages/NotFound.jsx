import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css'; // Import CSS module

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className={styles.goHomeButton}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;