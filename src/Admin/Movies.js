import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Movies.module.css";
import {
  FiEdit,
  FiTrash2,
  FiFilm,
  FiSearch,
  FiPlus,
  FiStar,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";

const Movies = () => {
  const initialMovies = [
    {
      id: 1,
      title: "Pushpa 2",
      genre: "Action",
      rating: 4.8,
      releaseDate: "2023-08-15",
      ticketsSold: 1250,
      revenue: 18500000,
      status: "Showing",
    },
    {
      id: 2,
      title: "Chhava",
      genre: "Historical",
      rating: 4.5,
      releaseDate: "2023-09-20",
      ticketsSold: 980,
      revenue: 14200000,
      status: "Showing",
    },
    {
      id: 3,
      title: "Salaar",
      genre: "Action",
      rating: 4.7,
      releaseDate: "2023-07-10",
      ticketsSold: 2100,
      revenue: 25400000,
      status: "Showing",
    },
    {
      id: 4,
      title: "Dunki",
      genre: "Drama",
      rating: 4.2,
      releaseDate: "2023-12-05",
      ticketsSold: 850,
      revenue: 9800000,
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Animal",
      genre: "Thriller",
      rating: 4.1,
      releaseDate: "2023-11-12",
      ticketsSold: 1750,
      revenue: 21000000,
      status: "Completed",
    },
  ];

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : initialMovies;
  });

  const updateMovies = (newMovies) => {
    localStorage.setItem("movies", JSON.stringify(newMovies));
    setMovies(newMovies);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    genre: "Action",
    rating: "",
    releaseDate: "",
    status: "Showing",
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    const reindexedMovies = updatedMovies.map((movie, index) => ({
      ...movie,
      id: index + 1,
    }));
    updateMovies(reindexedMovies);
  };

  const handleEditClick = (movie) => {
    setEditingMovieId(movie.id);
    setEditFormData({
      title: movie.title,
      genre: movie.genre,
      rating: movie.rating,
      releaseDate: movie.releaseDate,
      status: movie.status,
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
    const updatedMovies = movies.map((movie) =>
      movie.id === editingMovieId ? { ...movie, ...editFormData } : movie
    );
    updateMovies(updatedMovies);
    setEditingMovieId(null);
  };

  const handleCancelEdit = () => {
    setEditingMovieId(null);
  };

  const handleAddMovie = () => {
    const newMovie = {
      id: movies.length + 1,
      title: "New Movie",
      genre: "Action",
      rating: 0,
      releaseDate: new Date().toISOString().split("T")[0],
      ticketsSold: 0,
      revenue: 0,
      status: "Upcoming",
    };
    updateMovies([...movies, newMovie]);
    setEditingMovieId(newMovie.id);
    setEditFormData({
      title: "New Movie",
      genre: "Action",
      rating: 0,
      releaseDate: new Date().toISOString().split("T")[0],
      status: "Upcoming",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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
        className={`${
          styles.moviesDashboardContainer
        } ${getContainerClass()}  ${isDarkMode ? styles.darkMode : ""}`}
      >
        <div className={styles.header}>
          <h1>
            <FiFilm className={styles.headerIcon} /> Movie Management
          </h1>
          <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>
            <button onClick={handleAddMovie} className={styles.addButton}>
              <FiPlus /> Add Movie
            </button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiFilm size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Total Movies</span>
              <span className={styles.statValue}>{movies.length}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaTicketAlt size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Total Tickets Sold</span>
              <span className={styles.statValue}>
                {movies
                  .reduce((sum, movie) => sum + movie.ticketsSold, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiDollarSign size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Total Revenue</span>
              <span className={styles.statValue}>
                {formatCurrency(
                  movies.reduce((sum, movie) => sum + movie.revenue, 0)
                )}
              </span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiStar size={24} />
            </div>
            <div className={styles.divflex}>
              <span className={styles.statLabel}>Average Rating</span>
              <span className={styles.statValue}>
                {(
                  movies.reduce((sum, movie) => sum + movie.rating, 0) /
                  movies.length
                ).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.movieTableContainer}>
          <table className={styles.movieTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Release Date</th>
                <th>Tickets Sold</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <React.Fragment key={movie.id}>
                  {editingMovieId === movie.id ? (
                    <tr className={styles.editingRow}>
                      <td>{movie.id}</td>
                      <td>
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <select
                          name="genre"
                          value={editFormData.genre}
                          onChange={handleEditFormChange}
                        >
                          <option value="Action">Action</option>
                          <option value="Drama">Drama</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Historical">Historical</option>
                          <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="rating"
                          min="0"
                          max="5"
                          step="0.1"
                          value={editFormData.rating}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="releaseDate"
                          value={editFormData.releaseDate}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>{movie.ticketsSold.toLocaleString()}</td>
                      <td>{formatCurrency(movie.revenue)}</td>
                      <td>
                        <select
                          name="status"
                          value={editFormData.status}
                          onChange={handleEditFormChange}
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Showing">Showing</option>
                          <option value="Completed">Completed</option>
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
                      <td>{movie.id}</td>
                      <td>{movie.title}</td>
                      <td>
                        <span
                          className={`${styles.genreBadge} ${
                            styles[movie.genre.toLowerCase().replace(" ", "")]
                          }`}
                        >
                          {movie.genre}
                        </span>
                      </td>
                      <td>
                        <div className={styles.ratingContainer}>
                          <FiStar className={styles.starIcon} />
                          {movie.rating}
                        </div>
                      </td>
                      <td>
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </td>
                      <td>{movie.ticketsSold.toLocaleString()}</td>
                      <td>{formatCurrency(movie.revenue)}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            styles[movie.status.toLowerCase()]
                          }`}
                        >
                          {movie.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEditClick(movie)}
                          className={styles.editButton}
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(movie.id)}
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

        {filteredMovies.length === 0 && (
          <div className={styles.noResults}>
            No movies found matching your search criteria.
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
