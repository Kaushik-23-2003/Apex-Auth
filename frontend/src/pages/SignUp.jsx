import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import OAuth from "../components/OAuth";
import styles from "../styles/SignUp.module.css";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const { showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasStartedTypingPassword, setHasStartedTypingPassword] = useState(false);
  const [hasStartedTypingConfirmPassword, setHasStartedTypingConfirmPassword] = useState(false);

  const baseUrl = "https://apex-auth.onrender.com";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password" && value) {
      setHasStartedTypingPassword(true);
    }
    if (id === "confirmPassword" && value) {
      setHasStartedTypingConfirmPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      hideToast();
      showToast("Passwords do not match. Please check and try again.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const { firstName, lastName, email, password, confirmPassword } = formData;
      const fullName = `${firstName} ${lastName}`;

      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: firstName, fullname: fullName, email, password, confirmPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        hideToast();
        showToast(errorData.message || "Failed to sign up", "error");
        setIsSubmitting(false);
        return;
      }
      
      const data = await res.json();
      hideToast();
      showToast("Registration successful! 🎉. Please login.", "success");
      console.log(data);
    } catch (err) {
      hideToast();
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { firstName, lastName, email, password, confirmPassword } = formData;

  return (
    <>
      <Navbar isTransparent={true} />
       <div className={`${styles.container} ${!loading ? styles.pageContainer : ""}${styles.signUpPage}`}>
        <div className={styles.leftSection}>
          <h3>CREATE NEW ACCOUNT</h3>
          <h1>
            Unlock Your <span>Potential</span>, <br />
            <span>Discover</span> New Horizons.
          </h1>
          <p>
            Get Started with Your Free Account. Experience the Best <br />
            of Our Platform Today!
          </p>
          <div className={styles.buttons}>
            <a href="#" className={styles.explore}>
              Explore more
            </a>
            <a href="#" className={styles.order}>
              Order now
            </a>
          </div>
        </div>

        <div className={styles.rightSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.nameGroup}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  id="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  id="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            </div>
            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={hasStartedTypingPassword ? (showPassword ? faEyeSlash : faEye) : faLock}
                onClick={togglePasswordVisibility}
                className={styles.icon}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={hasStartedTypingConfirmPassword ? (showConfirmPassword ? faEyeSlash : faEye) : faLock}
                onClick={toggleConfirmPasswordVisibility}
                className={styles.icon}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className={styles.loginLink}>
              Already a Member? <NavLink to="/signin">Log In</NavLink>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.createAccount}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create account"}
              </button>
              <OAuth className={styles.OAuthButton} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
