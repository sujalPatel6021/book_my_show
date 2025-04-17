import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import Header1 from "./Header1";
import styles from "./BookTicketPage.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Footer from "../Components/Footer";

const theatre = [
  {
    name: "AB Miniplex",
    time: [
      "10:00 AM",
      "11:55 AM",
      "12:50 PM",
      "13:50 PM",
      "14:50 PM",
      "15:00 PM",
      "16:50 PM",
    ],
    cancel: false,
    address: "Shivranjini Cross Road",
  },
  {
    name: "Apple Multiplex",
    time: [
      "10:00 AM",
      "11:55 AM",
      "12:50 PM",
      "13:50 PM",
      "14:50 PM",
      "15:00 PM",
      "16:50 PM",
    ],
    cancel: true,
    address: "Gota, Ahmedabad",
  },
  {
    name: "Banana Smartplex",
    time: [
      "10:00 AM",
      "11:55 AM",
      "12:50 PM",
      "13:50 PM",
      "14:50 PM",
      "15:00 PM",
      "16:50 PM",
    ],
    cancel: true,
    address: "SBR, Thaltaj",
  },
  {
    name: "City Gold",
    time: [
      "10:00 AM",
      "11:55 AM",
      "12:50 PM",
      "13:50 PM",
      "14:50 PM",
      "15:00 PM",
      "16:50 PM",
    ],
    cancel: false,
    address: "Ashram Road",
  },
  {
    name: "Cinepolis",
    time: [
      "10:00 AM",
      "11:55 AM",
      "12:50 PM",
      "13:50 PM",
      "14:50 PM",
      "15:00 PM",
      "16:50 PM",
    ],
    cancel: true,
    address: "Vastral , Ahemdabad",
  },
];

export default function BookTicketPage() {
  const location = useLocation();
  const { movieName, language, dimension, image } = location.state || {};

  const getFormattedDate = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const day = days[date.getDay()];
    const dateNum = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];

    return { day, date: dateNum, month };
  };

  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();

    for (let i = 0; i < 8; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i);
      dates.push(getFormattedDate(newDate));
    }

    return dates;
  };

  const dates = generateDates();

  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [showSlider, setShowSlider] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 500]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };
  const [showSeatPopup, setShowSeatPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(1); // Default to 1 seat
  return (
    <div>
      <Navbar />
      <Header1 />
      <div className={styles.maindiv}>
        <div className={styles.div1}>
          <p className={styles.pname}>{movieName}</p>
          {console.log("movieName", movieName)}
          <p className={styles.pdata}>UA13+ . Comedy . Drama</p>
        </div>
      </div>
      <hr />
      <div className={styles.datediv}>
        <div className={styles.date}>
          {dates.map((item, index) => (
            <button
              key={index}
              className={`${styles.datebox} ${
                selectedDate === item.date ? styles.selected : ""
              }`}
              onClick={() => handleDateClick(item.date)}
            >
              <p className={styles.boxp1}>{item.day}</p>
              <p className={styles.boxp2}>{item.date}</p>
              <p className={styles.boxp3}>{item.month}</p>
            </button>
          ))}
        </div>
        <hr className={styles.hr1} />
        <div className={styles.language}>
          <p className={styles.languagep}>
            {language} - {dimension}{" "}
          </p>
        </div>
        <hr className={styles.hr1} />
        <div className={styles.pricerange} onClick={toggleSlider}>
          <p className={styles.range}>Price range</p>
          <span className={styles.arrow}>
            {showSlider ? (
              <KeyboardArrowUpIcon style={{ color: "red" }} />
            ) : (
              <KeyboardArrowDownIcon style={{ color: "red" }} />
            )}
          </span>
          {showSlider && (
            <div className={styles.sliderContainer}>
              <Slider
                range
                min={100}
                max={1500}
                defaultValue={[100, 500]}
                value={priceRange}
                onChange={handleSliderChange}
              />
              <div className={styles.sliderValues}>
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className={styles.hr1} />
      <div className={styles.info}>
        <p className={styles.infop}>
          <img
            src="https://in-cdn.bmscdn.com/moviesmaster/coachmark/subtitle.png"
            alt="lanimg"
            className={styles.subtitleimg}
          />
          indicates subtitle language, if subtitles are available
        </p>
        <div className={styles.ininfo}>
          <FiberManualRecordIcon className={styles.dot1} />
          <p className={styles.p1}>AVAILABLE</p>
          <FiberManualRecordIcon className={styles.dot2} />
          <p className={styles.p2}>FAST FILLING</p>
        </div>
      </div>
      <div className={styles.divmain}>
        {theatre.map((theatreItem, index) => (
          <div key={index} className={styles.theatre}>
            <div className={styles.div2}>
              <div className={styles.div2div1}>
                <p className={styles.div2p1}>{theatreItem.name}</p>
                <p className={styles.div2p2}>{theatreItem.address}</p>
              </div>
              <div>
                <img
                  src="https://in-cdn.bmscdn.com/moviesmaster/movies-showtimes/v4/common/mticket.png"
                  alt="Mticket"
                  className={styles.mticket}
                ></img>
                <img
                  src="https://in-cdn.bmscdn.com/moviesmaster/movies-showtimes/v4/common/fnb.png"
                  alt="food"
                  className={styles.mticket}
                />
              </div>
              {theatreItem.cancel ? (
                <p className={styles.div2p3}>Cancellation available</p>
              ) : (
                <p className={styles.div2p3}>Cancellation unavailable</p>
              )}
            </div>
            <hr />
            <div className={styles.buttoncontainer}>
              <div className={styles.label}>HINDI</div>
              <div className={styles.timebuttons}>
                {theatreItem.time.map((time, idx) => {
                  const selectedDateData =
                    dates.find((date) => date.date === selectedDate) || {};
                  const images = image;
                  return (
                    <button
                      className={styles.timebutton}
                      onClick={() => {
                        setSelectedTime(time);
                        setShowSeatPopup(true);
                      }}
                    >
                      <span className={styles.timetext}>{time}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showSeatPopup && (
        <div className={styles.seatPopupOverlay}>
          <div className={styles.seatPopup}>
            <h3>How Many Seats?</h3>
            <div className={styles.seatNumbers}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  className={`${styles.seatNumberButton} ${
                    selectedSeats === num ? styles.selectedSeat : ""
                  }`}
                  onClick={() => setSelectedSeats(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <hr className={styles.popupHr} />
            <div className={styles.seatTypes}>
              <table className={styles.seatTable}>
                <thead>
                  <tr>
                    <th>PLATINUM</th>
                    <th>GOLD</th>
                    <th>STANDARD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rs. 100</td>
                    <td>Rs. 200</td>
                    <td>Rs. 300</td>
                  </tr>
                  <tr>
                    <td>Available</td>
                    <td>Available</td>
                    <td>Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link
              to="/seatbook"
              state={{
                movieName: movieName,
                day:
                  dates.find((date) => date.date === selectedDate)?.day || "",
                month:
                  dates.find((date) => date.date === selectedDate)?.month || "",
                date: selectedDate,
                time: selectedTime,
                images: image,
                theatre:
                  theatre.find((t) => t.time.includes(selectedTime))?.name ||
                  "",
                address:
                  theatre.find((t) => t.time.includes(selectedTime))?.address ||
                  "",
                language: language,
                seatCount: selectedSeats,
              }}
            >
              <button className={styles.bookButton}>Select Seats</button>
            </Link>
            <button
              className={styles.closePopupButton}
              onClick={() => setShowSeatPopup(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
