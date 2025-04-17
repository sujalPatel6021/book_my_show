import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Dashboard.module.css";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  FiUsers,
  FiDollarSign,
  FiFilm,
  FiActivity,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

const movieData = [
  { name: "Chhava", tickets: 420, revenue: 12500000, fill: "#7c3aed" },
  { name: "CrazyX", tickets: 380, revenue: 9800000, fill: "#10b981" },
  { name: "Umbaro", tickets: 290, revenue: 7500000, fill: "#f59e0b" },
  { name: "Faati ne?", tickets: 210, revenue: 5200000, fill: "#ef4444" },
  { name: "Surya", tickets: 350, revenue: 8900000, fill: "#8b5cf6" },
  { name: "Pushpa 2", tickets: 510, revenue: 15800000, fill: "#ec4899" },
];

const timeSeriesData = [
  { day: "Mon", tickets: 120, revenue: 3200000 },
  { day: "Tue", tickets: 180, revenue: 4800000 },
  { day: "Wed", tickets: 150, revenue: 4000000 },
  { day: "Thu", tickets: 210, revenue: 5600000 },
  { day: "Fri", tickets: 350, revenue: 9200000 },
  { day: "Sat", tickets: 420, revenue: 11000000 },
  { day: "Sun", tickets: 380, revenue: 9800000 },
];

const genreData = [
  { name: "Action", value: 35, fill: "#ef4444" },
  { name: "Drama", value: 25, fill: "#3b82f6" },
  { name: "Comedy", value: 20, fill: "#f59e0b" },
  { name: "Thriller", value: 15, fill: "#10b981" },
  { name: "Romance", value: 5, fill: "#ec4899" },
];

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [timeRange, setTimeRange] = useState("30d");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleMouseOver = (data, index) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const totalTickets = movieData.reduce((sum, movie) => sum + movie.tickets, 0);
  const totalRevenue = movieData.reduce((sum, movie) => sum + movie.revenue, 0);
  const topMovie = movieData.reduce((max, movie) =>
    max.tickets > movie.tickets ? max : movie
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <div className={styles.tooltipGrid}>
            <span>Tickets:</span>
            <span className={styles.tooltipValue}>
              {data.tickets.toLocaleString()}
            </span>
            <span>Revenue:</span>
            <span className={styles.tooltipValue}>
              ₹{data.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  const chartTextColor = isDarkMode ? "#e2e8f0" : "#1e293b";
  const chartGridColor = isDarkMode ? "#4a5568" : "#f1f5f9";
  const tickColor = isDarkMode ? "#a0aec0" : "#6b7280";
  const axisColor = isDarkMode ? "#e2e8f0" : "#1e293b";
  return (
    <div
      className={`${styles.pageContainer} ${isDarkMode ? styles.darkMode : ""}`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isDarkMode={isDarkMode}
      />
      <Navbar
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <div
        className={`${styles.dashboardWrapper} ${
          isSidebarOpen
            ? isCollapsed
              ? styles.sidebarCollapsed
              : ""
            : styles.sidebarClosed
        }`}
      >
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardHeader}>
            <div>
              <h1>Admin Dashboard</h1>
              <p className={styles.dashboardSubtitle}>
                Real-time insights and analytics for your cinema
              </p>
            </div>
            <div className={styles.timeRangeSelector}>
              <button
                className={`${styles.timeButton} ${
                  timeRange === "7d" ? styles.active : ""
                }`}
                onClick={() => setTimeRange("7d")}
              >
                7D
              </button>

              <button
                className={`${styles.timeButton} ${
                  timeRange === "30d" ? styles.active : ""
                }`}
                onClick={() => setTimeRange("30d")}
              >
                30D
              </button>
              <button
                className={`${styles.timeButton} ${
                  timeRange === "90d" ? styles.active : ""
                }`}
                onClick={() => setTimeRange("90d")}
              >
                90D
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.primary}`}>
              <div className={styles.statIcon}>
                <FiFilm size={24} />
              </div>
              <div>
                <span className={styles.statLabel}>Total Tickets</span>
                <span className={styles.statValue}>
                  {totalTickets.toLocaleString()}
                </span>
                <span className={styles.statTrend}>↑ 12% from last month</span>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.secondary}`}>
              <div className={styles.statIcon}>
                <FiDollarSign size={24} />
              </div>
              <div>
                <span className={styles.statLabel}>Total Revenue</span>
                <span className={styles.statValue}>
                  ₹{(totalRevenue / 1000000).toFixed(1)}M
                </span>
                <span className={styles.statTrend}>↑ 8% from last month</span>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.tertiary}`}>
              <div className={styles.statIcon}>
                <FiFilm size={24} />
              </div>
              <div>
                <span className={styles.statLabel}>Top Movie</span>
                <span className={styles.statValue}>{topMovie.name}</span>
                <span className={styles.statTrend}>
                  {topMovie.tickets.toLocaleString()} tickets
                </span>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.quaternary}`}>
              <div className={styles.statIcon}>
                <FiUsers size={24} />
              </div>
              <div>
                <span className={styles.statLabel}>Active Users</span>
                <span className={styles.statValue}>1,842</span>
                <span className={styles.statTrend}>↓ 2% from last month</span>
              </div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className={styles.chartsRow}>
            {/* Bar Chart */}
            <div className={`${styles.chartContainer} ${styles.barChart}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h2 className={styles.chartTitle}>🎬 Movie Performance</h2>
                  <p className={styles.chartSubtitle}>
                    Ticket sales overview for current period
                  </p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={movieData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    barSize={38}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: tickColor,
                        fontSize: 12,
                      }}
                      tickMargin={20}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: tickColor,
                        fontSize: 12,
                      }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(124, 58, 237, 0.1)" }}
                    />
                    <Bar
                      dataKey="tickets"
                      name="Tickets Sold"
                      radius={[6, 6, 0, 0]}
                      onMouseOver={handleMouseOver}
                      onMouseLeave={handleMouseLeave}
                    >
                      {movieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            activeIndex === index
                              ? `${entry.fill}90`
                              : entry.fill
                          }
                          strokeWidth={activeIndex === index ? 2 : 0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className={`${styles.chartContainer} ${styles.pieChart}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h2 className={styles.chartTitle}>🎭 Genre Distribution</h2>
                  <p className={styles.chartSubtitle}>
                    Popularity by movie genre
                  </p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={genreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value}%`,
                        props.payload.name,
                      ]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className={styles.chartsRow}>
            {/* Line Chart */}
            <div className={`${styles.chartContainer} ${styles.lineChart}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h2 className={styles.chartTitle}>📈 Weekly Trends</h2>
                  <p className={styles.chartSubtitle}>
                    Ticket sales by day of week
                  </p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={chartGridColor}
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: chartTextColor, fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tickets"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Tickets Sold"
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Revenue (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`${styles.chartContainer} ${styles.quickStats}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h2 className={styles.chartTitle}>⚡ Quick Stats</h2>
                  <p className={styles.chartSubtitle}>
                    Key metrics at a glance
                  </p>
                </div>
              </div>
              <div className={styles.quickStatsGrid}>
                <div className={styles.quickStat}>
                  <div className={styles.quickStatIcon}>
                    <FiCalendar size={18} />
                  </div>
                  <div>
                    <span className={styles.quickStatLabel}>
                      Avg. Tickets/Day
                    </span>
                    <span className={styles.quickStatValue}>142</span>
                  </div>
                </div>
                <div className={styles.quickStat}>
                  <div className={styles.quickStatIcon}>
                    <FiUsers size={18} />
                  </div>
                  <div>
                    <span className={styles.quickStatLabel}>
                      Occupancy Rate
                    </span>
                    <span className={styles.quickStatValue}>78%</span>
                  </div>
                </div>
                <div className={styles.quickStat}>
                  <div className={styles.quickStatIcon}>
                    <FiStar size={18} />
                  </div>
                  <div>
                    <span className={styles.quickStatLabel}>New Users</span>
                    <span className={styles.quickStatValue}>124</span>
                  </div>
                </div>
                <div className={styles.quickStat}>
                  <div className={styles.quickStatIcon}>
                    <FiDollarSign size={18} />
                  </div>
                  <div>
                    <span className={styles.quickStatLabel}>Refunds</span>
                    <span className={styles.quickStatValue}>12</span>
                  </div>
                </div>
              </div>
              <div className={styles.movieOfTheDay}>
                <div className={styles.moviePoster}>
                  <img
                    src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/umbarro-et00420660-1734089497.jpg"
                    alt="Movie Poster"
                  />
                </div>
                <div className={styles.movieInfo}>
                  <h3>Featured Movie</h3>
                  <p className={styles.movieTitle}>Umbaroo</p>
                  <div className={styles.movieDetails}>
                    <span>Action, Drama</span>
                    <span>⭐ 4.8/5 (1.2K reviews)</span>
                  </div>
                  <span className={styles.movieStats}>
                    512 tickets sold today | ₹12.8M revenue
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.chartContainer}>
            <div className={styles.sectionHeader}>
              <FiActivity size={20} className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
            </div>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <FiFilm size={18} />
                </div>
                <div>
                  <p className={styles.activityText}>
                    New movie "Kantara 2" added to catalog
                  </p>
                  <span className={styles.activityTime}>2 hours ago</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <FiUsers size={18} />
                </div>
                <div>
                  <p className={styles.activityText}>
                    User "movielover42" purchased 4 tickets
                  </p>
                  <span className={styles.activityTime}>5 hours ago</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <FiDollarSign size={18} />
                </div>
                <div>
                  <p className={styles.activityText}>
                    Revenue target achieved for this week
                  </p>
                  <span className={styles.activityTime}>1 day ago</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <FiFilm size={18} />
                </div>
                <div>
                  <p className={styles.activityText}>
                    Special screening for "Pushpa 2" scheduled
                  </p>
                  <span className={styles.activityTime}>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
