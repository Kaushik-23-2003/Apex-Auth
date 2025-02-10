import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const NavLinkItem = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {label}
    </NavLink>
  );
};

export default NavLinkItem;
