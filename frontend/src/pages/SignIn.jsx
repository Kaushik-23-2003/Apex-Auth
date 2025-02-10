import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import OAuth from "../components/OAuth";
import { useToast } from "../contexts/ToastContext";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import styles from "../styles/SignIn.module.css";

const SignIn = () => {
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast, hideToast } = useToast();
  const baseUrl = "http://localhost:3000";

  // Simulate page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      dispatch(signInStart());

      const response = await fetch(`${baseUrl}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Send cookies with request
      });

      const data = await response.json();

      if (response.ok) {
        hideToast(); 
        showToast("Sign-in successful!", "success");
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        const errorMessage = data.message || "Invalid email or password.";
        hideToast();
        showToast(errorMessage, "error");
        dispatch(signInFailure(errorMessage));
      }
    } catch (error) {
      hideToast();
      showToast(data.message || "An error occurred. Please try again.", "error");
      dispatch(signInFailure(error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prevState) => !prevState);

  return (
    <>
      <Navbar isTransparent />
      <div className={`${styles.container} ${!loading ? styles.pageContainer : ""}${styles.signInPage}`}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <h3>LOGIN TO YOUR ACCOUNT</h3>
          <h1>
            Enjoy <span>Safety</span> and <span>Convenience</span>. Sign In Securely.
          </h1>
          <p>Discover the convenience of having everything you need right at your fingertips.</p>
          <div className={styles.buttons}>
            <NavLink to="/signup" className={styles.explore}>
              Explore more
            </NavLink>
            <NavLink to="/" className={styles.signIn}>
              Home
            </NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <form onSubmit={handleSubmit}>
            <h1>
              Welcome <span>back!</span>
            </h1>

            {/* Email Input */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.input}
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.input}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className={styles.icon}
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* Footer Links */}
            <div className={styles.footer}>
              <p>
                Don't have an account?{" "}
                <NavLink to="/signup" className={styles.link}>
                  Sign Up
                </NavLink>
              </p>
            </div>

            {/* Buttons */}
            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
              <OAuth
                className={styles.OAuthButton}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
