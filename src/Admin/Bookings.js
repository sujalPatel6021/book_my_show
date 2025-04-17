import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Bookings.module.css";
import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiCalendar,
  FiUser,
  FiFilm,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const Bookings = () => {
  const initialBookings = [];

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : initialBookings;
  });

  const updateBookings = (newBookings) => {
    localStorage.setItem("bookings", JSON.stringify(newBookings));
    setBookings(newBookings);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    movieTitle: "",
    customerName: "",
    showDate: "",
    showTime: "",
    seats: "",
    totalAmount: "",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (bookingId) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );
    const reindexedBookings = updatedBookings.map((booking, index) => ({
      ...booking,
      id: index + 1,
    }));
    updateBookings(reindexedBookings);
  };

  const handleEditClick = (booking) => {
    setEditingBookingId(booking.id);
    setEditFormData({
      movieTitle: booking.movieTitle,
      customerName: booking.customerName,
      showDate: booking.showDate,
      showTime: booking.showTime,
      seats: booking.seats.join(", "),
      totalAmount: booking.totalAmount,
      paymentStatus: booking.paymentStatus,
      bookingStatus: booking.bookingStatus,
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
    const updatedBookings = bookings.map((booking) =>
      booking.id === editingBookingId
        ? {
            ...booking,
            ...editFormData,
            seats: editFormData.seats.split(",").map((s) => s.trim()),
          }
        : booking
    );
    updateBookings(updatedBookings);
    setEditingBookingId(null);
  };

  const handleCancelEdit = () => {
    setEditingBookingId(null);
  };

  const handleAddBooking = () => {
    const newBooking = {
      id: bookings.length + 1,
      movieTitle: "New Booking",
      customerName: "New Customer",
      bookingDate: new Date().toISOString().split("T")[0],
      showDate: new Date().toISOString().split("T")[0],
      showTime: "18:00",
      seats: ["A1"],
      totalAmount: 0,
      paymentStatus: "Pending",
      bookingStatus: "Pending",
    };
    updateBookings([...bookings, newBooking]);
    setEditingBookingId(newBooking.id);
    setEditFormData({
      movieTitle: "New Booking",
      customerName: "New Customer",
      showDate: new Date().toISOString().split("T")[0],
      showTime: "18:00",
      seats: "A1",
      totalAmount: 0,
      paymentStatus: "Pending",
      bookingStatus: "Pending",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (sum, booking) =>
      sum + (booking.paymentStatus === "Paid" ? booking.totalAmount : 0),
    0
  );
  const confirmedBookings = bookings.filter(
    (booking) => booking.bookingStatus === "Confirmed"
  ).length;
  const cancelledBookings = bookings.filter(
    (booking) => booking.bookingStatus === "Cancelled"
  ).length;
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
        className={`${
          styles.bookingsDashboardContainer
        } ${getContainerClass()} ${isDarkMode ? styles.darkMode : ""}`}
      >
        <div className={styles.header}>
          <h1>
            <FiCalendar className={styles.headerIcon} /> Booking Management
          </h1>
          <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>
            <button onClick={handleAddBooking} className={styles.addButton}>
              <FiPlus /> Add Booking
            </button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiCalendar size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Total Bookings</span>
              <span className={styles.statValue}>{totalBookings}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiDollarSign size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Total Revenue</span>
              <span className={styles.statValue}>
                {formatCurrency(totalRevenue)}
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiCheckCircle size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Confirmed</span>
              <span className={styles.statValue}>{confirmedBookings}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiXCircle size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Cancelled</span>
              <span className={styles.statValue}>{cancelledBookings}</span>
            </div>
          </div>
        </div>

        <div className={styles.bookingsTableContainer}>
          <table className={styles.bookingsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Movie</th>
                <th>Customer</th>
                <th>Booking Date</th>
                <th>Show Date/Time</th>
                <th>Seats</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  {editingBookingId === booking.id ? (
                    <tr className={styles.editingRow}>
                      <td>{booking.id}</td>
                      <td>
                        <input
                          type="text"
                          name="movieTitle"
                          value={editFormData.movieTitle}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="customerName"
                          value={editFormData.customerName}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>{formatDate(booking.bookingDate)}</td>
                      <td>
                        <input
                          type="date"
                          name="showDate"
                          value={editFormData.showDate}
                          onChange={handleEditFormChange}
                          style={{ marginBottom: "5px" }}
                        />
                        <input
                          type="time"
                          name="showTime"
                          value={editFormData.showTime}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="seats"
                          value={editFormData.seats}
                          onChange={handleEditFormChange}
                          placeholder="Comma separated seats"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="totalAmount"
                          value={editFormData.totalAmount}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <select
                          name="paymentStatus"
                          value={editFormData.paymentStatus}
                          onChange={handleEditFormChange}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name="bookingStatus"
                          value={editFormData.bookingStatus}
                          onChange={handleEditFormChange}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
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
                      <td>{booking.id}</td>
                      <td>
                        <div className={styles.movieInfo}>
                          <FiFilm className={styles.movieIcon} />
                          {booking.movieTitle}
                        </div>
                      </td>
                      <td>
                        <div className={styles.customerInfo}>
                          <FiUser className={styles.userIcon} />
                          {booking.customerName}
                        </div>
                      </td>
                      <td>{formatDate(booking.bookingDate)}</td>
                      <td>
                        {formatDate(booking.showDate)} <br />
                        {booking.showTime}
                      </td>
                      <td>
                        <div className={styles.seatsContainer}>
                          {booking.seats.join(", ")}
                        </div>
                      </td>
                      <td>{formatCurrency(booking.totalAmount)}</td>
                      <td>
                        <span
                          className={`${styles.paymentStatus} ${
                            styles[booking.paymentStatus.toLowerCase()]
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.bookingStatus} ${
                            styles[booking.bookingStatus.toLowerCase()]
                          }`}
                        >
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEditClick(booking)}
                          className={styles.editButton}
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
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

        {filteredBookings.length === 0 && (
          <div className={styles.noResults}>
            No bookings found matching your search criteria.
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
