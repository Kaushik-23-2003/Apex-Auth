import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom'; 
import { FaThumbtack, FaTimes, FaBox, FaHome, FaGift, FaMapMarkerAlt, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Sidebar.module.css";
import { useSignOut } from './SignOut'; 

const Sidebar = ({ isDarkMode, toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { handleSignOut, isLoggingOut } = useSignOut(); // Use the handleSignOut function here
  
  const handleToggle = () => {
    setIsOpen(prev => !prev);
    toggleSidebar(); 
  };

  return (
    <div 
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div 
        className={styles.toggleButton} 
        onClick={handleToggle} 
        aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
      >
        {isOpen ? <FaTimes className={styles.toggleIcon}/> : <FaThumbtack className={styles.toggleIcon}/> }
      </div>
      <ul className={styles.menu}>
        <SidebarItem icon={<FaHome />} label="Home" path="/" />
        <SidebarItem icon={<FaGift />} label="Rewards" path="/rewards" />
        <SidebarItem icon={<FaBox />} label="Orders" path="/orders" />
        <SidebarItem icon={<FaMapMarkerAlt />} label="Addresses" path="/addresses" />
        <SidebarItem icon={<FaCreditCard />} label="Payment Methods" path="/payment-methods" />
        
        {/* Sign Out button with same style as other sidebar items */}
        <li className={styles.sidebarItem} onClick={handleSignOut} style={{ cursor: 'pointer' }}>
          <div className={styles.sidebarLink} style={{ display: 'flex', alignItems: 'center' }}>
            <span className={styles.icon}><FaSignOutAlt/></span>
            <span className={styles.label}>Sign Out</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, label, path }) => (
  <li className={styles.sidebarItem}>
    <Link to={path} className={styles.sidebarLink} aria-label={label}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </Link>
  </li>
);

export default Sidebar;
