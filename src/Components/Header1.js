import React from "react";
import styles from "./Header1.module.css";

export default function Header1() {
  return (
    <div className={styles.maindiv}>
      <div className={styles.div1}>
        <ul className={styles.ul}>
          <li>Movies</li>
          <li>Stream</li>
          <li>Events</li>
          <li>Plays</li>
          <li>Sports</li>
          <li>Activities</li>
        </ul>
      </div>
      <div className={styles.div2}>
        <ul className={styles.ul}>
          <li>ListYourShow</li>
          <li>Corporates</li>
          <li>Offers</li>
          <li>Gift Cards</li>
        </ul>
      </div>
    </div>
  );
}
