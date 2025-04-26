import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Signin from "./Signin";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setProfileDropdownOpen(false);
  };

  return (
    <div className={`${styles.navbar} ${isLoggedIn ? styles.isLoggedIn : ""}`}>
      <div className={styles.div1}>
        <Link to="/">
          <img
            className={styles.img}
            src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png"
            alt="BookMyShow Logo"
          />
        </Link>

        <input
          type="text"
          className={styles.search}
          placeholder="Search for Movies, Events, Plays, Sports and Activities"
        />
      </div>

      <div className={styles.div2}>
        <div
          className={styles.dropdown}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button className={styles.dropdownBtn}>{selectedCity} ▾</button>
          {isOpen && (
            <ul className={styles.dropdownMenu}>
              {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad"].map(
                (city) => (
                  <li
                    key={city}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectCity(city)}
                  >
                    {city}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {isLoggedIn ? (
          <div
            className={styles.profileDropdown}
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <FaUserCircle className={styles.profileIcon} />
            {isProfileDropdownOpen && (
              <ul className={styles.profileDropdownMenu}>
                <li className={styles.dropdownItem}>Profile</li>
                <li className={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setSignInOpen(true)}
            className={styles.signinbutton}
          >
            Sign In
          </button>
        )}

        <Signin
          isOpen={isSignInOpen}
          onClose={() => setSignInOpen(false)}
          onSignInSuccess={() => {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            setSignInOpen(false);
          }}
        />
      </div>
    </div>
  );
}
