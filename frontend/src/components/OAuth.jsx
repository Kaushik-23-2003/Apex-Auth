import React from "react";
import { useToast } from "../contexts/ToastContext";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Auth.module.css";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Initiate Google OAuth
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;

      // Send user data to backend
      const res = await fetch("https://apex-auth.onrender.com/api/auth/gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName, email, photo: photoURL }),
        credentials: "include", // Ensure cookies are sent with the request
      });

      // Handle backend response
      if (!res.ok) throw new Error("Authentication with backend failed.");
      const data = await res.json();

      // Update Redux state
      dispatch(signInSuccess(data));
      showToast("Login successful.", "success");
      navigate("/");
    } catch (error) {
      console.error("OAuth login failed:", error);
      showToast(error.message || "Something went wrong.", "error");
    }
  };

  return (
    <div className={styles.oauthContainer}>
      <button
        type="button"
        onClick={handleOAuthClick}
        className={styles.oauthButton}
      >
        <FontAwesomeIcon icon={faGoogle} className={styles.oauthIcon} />
        Sign in with Google
      </button>
    </div>
  );
}
