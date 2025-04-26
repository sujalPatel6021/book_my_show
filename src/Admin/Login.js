import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "sujal" && password === "sujal") {
      localStorage.setItem("isLoggedIn", "true");
      const from = location.state?.from?.pathname || "/adminpage/adminhome";
      navigate(from, { replace: true });
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className={styles.username}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={styles.text}
            placeholder="Enter your user Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className={styles.passwordlabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password here"
            className={styles.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.login}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
