import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileInfo from '../components/ProfileInfo';
import styles from '../styles/Profile.module.css';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [animationClass, setAnimationClass] = useState(''); // For page load animation

  // Toggle between light and dark mode
  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarVisible(prevState => !prevState);

  // Trigger animation class after initial load
  useEffect(() => {
    setAnimationClass(styles.pageLoaded);
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://apex-auth.onrender.com/api/user/update/${currentUser.user._id}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error fetching user details');

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (currentUser?.user?._id) {
      fetchUserDetails();
    }
  }, [currentUser]);


  return (
    <div className={`${styles.profileWrap} ${isDarkMode ? styles.dark : styles.light} ${animationClass}`}>
      <Sidebar 
        isDarkMode={isDarkMode} 
        isSidebarVisible={isSidebarVisible} 
        toggleSidebar={toggleSidebar}
      />
      <div className={`${styles.content} ${isSidebarVisible ? '' : styles.sidebarCollapsed}`}>
        <ProfileInfo 
          toggleDarkMode={toggleDarkMode} 
          isSidebarVisible={isSidebarVisible} 
          currentUser={userDetails}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Profile;
