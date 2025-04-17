import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Signin from "./Signin";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import a profile icon

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [isSignInOpen, setSignInOpen] = useState(false);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  return (
    <div className={styles.navbar}>
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
          <button className={styles.dropdownBtn}> {selectedCity} ▾</button>
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
        <button
          onClick={() => setSignInOpen(true)}
          className={styles.signinbutton}
        >
          Sign In
        </button>
        <FaUserCircle
          className={styles.profileIcon}
          onClick={() => setSignInOpen(true)}
        />
        <Signin isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />
      </div>
    </div>
  );
}
