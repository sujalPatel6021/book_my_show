import React, { useState, useEffect } from "react";
import styles from "./User.module.css";
import { FiEdit, FiTrash2, FiUser, FiSearch, FiPlus } from "react-icons/fi";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const User = () => {
  const initialUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "Editor",
      status: "Inactive",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "User",
      status: "Banned",
      joinDate: "2023-05-12",
    },
  ];

  // Load users from localStorage or use initialUsers
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    const resequencedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1,
    }));

    setUsers(resequencedUsers);
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role || "User",
      status: user.status || "Active",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, ...editFormData } : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleAddUser = () => {
    const maxId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
    const newUser = {
      id: maxId + 1,
      name: "New User",
      email: `newuser${maxId + 1}@example.com`,
      role: "User",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Safe function to get role class
  const getRoleClass = (role) => {
    return role ? role.toLowerCase() : "user";
  };

  // Safe function to get status class
  const getStatusClass = (status) => {
    return status ? status.toLowerCase() : "active";
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const getContainerClass = () => {
    if (!isSidebarOpen) return styles.sidebarClosed;
    if (isCollapsed) {
      return isHovered
        ? styles.sidebarCollapsedHovered
        : styles.sidebarCollapsed;
    }
    return ""; // Default open state
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
        className={`${styles.userAdminContainer} ${getContainerClass()} ${
          isDarkMode ? styles.darkMode : ""
        }`}
      >
        <div className={styles.header}>
          <h1>
            <FiUser className={styles.headerIcon} /> User Management
          </h1>
          <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>
            <button onClick={handleAddUser} className={styles.addButton}>
              <FiPlus /> Add User
            </button>
          </div>
        </div>

        <div className={styles.userTableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <React.Fragment key={user.id}>
                  {editingUserId === user.id ? (
                    <tr className={styles.editingRow}>
                      <td>{user.id}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <select
                          name="role"
                          value={editFormData.role}
                          onChange={handleEditFormChange}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="User">User</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name="status"
                          value={editFormData.status}
                          onChange={handleEditFormChange}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Banned">Banned</option>
                        </select>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button
                          onClick={handleEditFormSubmit}
                          className={styles.saveButton}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className={styles.cancelButton}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`${styles.roleBadge} ${
                            styles[getRoleClass(user.role)]
                          }`}
                        >
                          {user.role || "User"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            styles[getStatusClass(user.status)]
                          }`}
                        >
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button
                          onClick={() => handleEditClick(user)}
                          className={styles.editButton}
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className={styles.deleteButton}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className={styles.noResults}>
            No users found matching your search criteria.
          </div>
        )}
      </div>
    </>
  );
};

export default User;
