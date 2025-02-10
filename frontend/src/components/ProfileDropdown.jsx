import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/ProfileDropdown.module.css";
import { useSignOut } from './SignOut'; 

const ProfileDropdown = ({ currentUser, isDarkMode, isTransparent }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { handleSignOut, isLoggingOut } = useSignOut(); // Destructure the handleSignOut function

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  // Fallback values for profile data
  const username = currentUser?.user?.username || "Dear User";
  // Generate dropdown items based on currentUser existence
  const renderDropdownItems = () => {
    if (currentUser) {
      return (
        <>
          <NavLink to="/profile" className={styles.dropdownItem}>
            <i className="fas fa-user"></i>
            <span>My profile</span>
          </NavLink>
          <NavLink to="/settings" className={styles.dropdownItem}>
            <i className="fas fa-cog"></i>
            <span>Account settings</span>
          </NavLink>
          <NavLink to="/notifications" className={styles.dropdownItem}>
            <i className="fas fa-mobile-alt"></i>
            <span>Notifications</span>
          </NavLink>
          <NavLink to="/about" className={styles.dropdownItem}>
            <i className="fas fa-question-circle"></i>
            <span>Help</span>
          </NavLink>

          {/* Sign Out Button */}
          <div
            className={styles.dropdownItem}
            onClick={handleSignOut} // Call the handleSignOut function here
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {isLoggingOut ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <>
                <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }} />
                <span>Sign Out</span>
              </>
            )}
          </div>
        </>
      );
    } else {
      return (
        <NavLink to="/signin" className={styles.dropdownItem}>
          <i className="fas fa-sign-in-alt"></i>
          <span>Login</span>
        </NavLink>
      );
    }
  };

  return (
    <div
      className={`${styles.dropdown} 
        ${isDarkMode ? styles.dark : styles.light} 
        ${isTransparent ? styles.transparent : ""}`}
    >
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <img src={currentUser?.user?.profilePicture || "https://i.pinimg.com/564x/3b/27/a8/3b27a87fcf7d90ae564be23d7a37f778.jpg"} alt="Profile" />
        <span>{username}</span>
      </div>

      {isDropdownVisible && (
        <div className={styles.dropdownContent}>
          {renderDropdownItems()}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
