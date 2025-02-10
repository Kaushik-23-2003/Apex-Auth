import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";
import ProfileDropdown from "./ProfileDropdown";
import NavLinkItem from "./NavLinkItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isDarkMode, isTransparent }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div
      className={`${styles.navbar} 
                  ${isDarkMode ? styles.dark : styles.light} 
                  ${isTransparent ? styles.transparent : ""}`}
    >
      <div className={styles.logo}>Apex Auth</div>
      <div className={styles.rightSection}>
        <NavLinkItem to="/" label="Home" />
        <NavLinkItem to="/about" label="About" />

        {/* Show Profile if user is logged in, else show Login & Signup */}
        {currentUser ? (
          <NavLinkItem to="/profile" label="Profile" />
        ) : (
          <>
            <NavLinkItem to="/signin" label="Login" />
            <NavLinkItem to="/signup" label="Signup" />
          </>
        )}

        <div className={styles.search}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
          <button type="submit" className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className={styles.userSection}>
          <ProfileDropdown
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            isTransparent={isTransparent}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
