import React, { useState } from "react";
import styles from "./Signin.module.css";
import google from "../Images/google.png";
import email from "../Images/email.png";
import apple from "../Images/apple.png";

const SignInPopup = ({ isOpen, onClose }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  if (!isOpen) return null;

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleBackToOptions = () => {
    setShowEmailForm(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className={styles.signinhead}>Sign In</h2>

        {showEmailForm ? (
          <form className={styles.form}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBackToOptions}
            >
              ← Back
            </button>

            <div className={styles.emailForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.inputField}
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                className={styles.inputField}
                required
              />
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
            </div>

            <p className={styles.pmain}>
              I agree to <a href="/">Terms and Condition</a> and{" "}
              <a href="/">Privacy Policy</a>
            </p>
          </form>
        ) : (
          <form className={styles.form}>
            <div className={styles.socialButtons}>
              <button type="button" className={styles.socialButton}>
                <img src={google} alt="google" className={styles.socialIcon} />
                Continue with Google
              </button>
              <button
                type="button"
                className={styles.socialButton}
                onClick={handleEmailClick}
              >
                <img src={email} alt="email" className={styles.socialIcon} />
                Continue with Email
              </button>
              <button type="button" className={styles.socialButton}>
                <img src={apple} alt="apple" className={styles.socialIcon} />
                Continue with Apple
              </button>
            </div>

            <div className={styles.orSeparator}>
              <span>OR</span>
            </div>

            <div className={styles.phoneInputContainer}>
              <span className={styles.countryCode}>+91</span>
              <input
                type="tel"
                placeholder="Enter your number"
                className={styles.phoneInput}
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>

            <button className={styles.primaryButton} type="submit">
              Sign In
            </button>

            <p className={styles.pmain}>
              I agree to <a href="/">Terms and Condition</a> and{" "}
              <a href="/">Privacy Policy</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInPopup;
