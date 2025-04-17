import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const AdminProfile = () => {
  const adminData = {
    name: "Admin User",
    role: "Super Administrator",
    email: "admin@example.com",
    lastLogin: "Today, 10:45 AM",
    adminSince: "January 15, 2022",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s",
    stats: {
      projects: 24,
      tasks: 187,
      teams: 5,
    },
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const getContainerClass = () => {
    if (!isSidebarOpen) return styles.sidebarClosed;
    if (isCollapsed) {
      return isHovered
        ? styles.sidebarCollapsedHovered
        : styles.sidebarCollapsed;
    }
    return "";
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark-theme", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle(
        "dark-theme",
        savedTheme === "dark"
      );
    } else if (systemPrefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark-theme");
    }
  }, []);
  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isHovered={isHovered}
        onHoverChange={setIsHovered}
        isDarkMode={isDarkMode}
      />
      <Navbar
        toggleSidebar={toggleSidebar}
        className={getContainerClass()}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div
        className={`${styles.profileContainer} ${getContainerClass()} ${
          isDarkMode ? styles.darkMode : ""
        }`}
      >
        <div className={styles.profileHeader}>
          <div className={styles.profilePictureContainer}>
            <img
              src={adminData.photo}
              alt="Admin"
              className={styles.profilePicture}
            />
            <div className={styles.verifiedBadge}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <h1 className={styles.adminName}>{adminData.name}</h1>
          <p className={styles.adminRole}>{adminData.role}</p>
          <div className={styles.adminStatus}>
            <span className={styles.statusIndicator}></span>
            <span>Active</span>
          </div>
        </div>

        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{adminData.stats.projects}</div>
            <div className={styles.statLabel}>Projects</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{adminData.stats.tasks}</div>
            <div className={styles.statLabel}>Tasks</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{adminData.stats.teams}</div>
            <div className={styles.statLabel}>Teams</div>
          </div>
        </div>

        <div className={styles.adminInfo}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Personal Information
            </h3>
            <div className={styles.infoRow}>
              <span>Full Name:</span>
              <span>{adminData.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Email:</span>
              <span>{adminData.email}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Last Login:</span>
              <span>{adminData.lastLogin}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              System Information
            </h3>
            <div className={styles.infoRow}>
              <span>Admin Since:</span>
              <span>{adminData.adminSince}</span>
            </div>
            <div className={styles.infoRow}>
              <span>Permissions:</span>
              <span className={styles.permissionTag}>Full Access</span>
            </div>
            <div className={styles.infoRow}>
              <span>Security Level:</span>
              <span className={styles.securityLevel}>High</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
