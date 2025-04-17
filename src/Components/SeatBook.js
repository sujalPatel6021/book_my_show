import Heading1 from "./Header1";
import React, { useState } from "react";
import Navbar from "./Navbar";
import styles from "./SeatBook.module.css";
import { Link, useLocation } from "react-router-dom";

export default function SeatBook() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const {
    movieName,
    date,
    month,
    day,
    time,
    images,
    theatre,
    address,
    language,
    seatCount,
  } = location.state || {};

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  const seatsPerRow = 14;

  const seatCategories = [
    { name: "Platinum", rows: ["A", "B"], price: 100 },
    { name: "Gold", rows: ["C", "D", "E", "F", "G", "H"], price: 200 },
    { name: "Standard", rows: ["I", "J", "K"], price: 300 },
  ];

  const handleSeatClick = (seat, category) => {
    if (bookedSeats.includes(seat)) return;

    if (!selectedCategory) {
      setSelectedCategory(category);
    }

    if (selectedCategory && category !== selectedCategory) {
      alert(`You can only select seats from the ${selectedCategory} category.`);
      return;
    }
    if (selectedSeats.length >= seatCount) {
      alert(`Your selected ticket cannot be more then ${seatCount} tickets.`);
      return;
    }

    if (selectedSeats.length >= 10 && !selectedSeats.includes(seat)) {
      alert("You cannot book more than 10 tickets.");
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      if (selectedSeats.length === 1) {
        setSelectedCategory(null);
      }
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  const calculateSubtotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const row = seat.charAt(0);
      const category = seatCategories.find((cat) => cat.rows.includes(row));
      return total + (category ? category.price : 0);
    }, 0);
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const convenienceFee = selectedSeats.length * 10;
    const gst = subtotal * 0.18;
    return subtotal + convenienceFee + gst;
  };

  const handleBookSeats = () => {
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);
    setSelectedCategory(null);
    alert(`Seats to Booked: ${selectedSeats.join(", ")}`);
  };

  return (
    <div className={styles.maindiv}>
      <Navbar />
      <Heading1 />
      <div className={styles.divcontent}>
        <div className={styles.content1}>
          <div className={styles.contentnavbar}>
            <div className={styles.date}>
              {date} {month}, {day}
            </div>
            <div className={styles.time}>
              <div className={styles.timediv}>
                <p className={styles.timep1}>{language}</p>
                <p className={styles.timep2}>{time}</p>
              </div>
            </div>
          </div>
          <div className={styles.seats}>
            <div className={styles.container}>
              <img
                src="https://www.pvrcinemas.com/static/media/Screen.d775def9269722b33fbbe8deb490f5a5.svg"
                alt="screen"
                className={styles.screenimg}
              />
              <div className={styles.screen}>Screen</div>
              {seatCategories.map((category) => (
                <div key={category.name}>
                  <div className={styles.categoryLabel}>
                    {category.name} - ₹{category.price}
                  </div>
                  {rows
                    .filter((row) => category.rows.includes(row))
                    .map((row) => (
                      <div key={row} className={styles.seatRow}>
                        <div className={styles.rowLabel}>{row}</div>
                        {Array.from({ length: seatsPerRow }, (_, index) => {
                          const seatNumber = `${row}${index + 1}`;
                          return (
                            <div
                              key={seatNumber}
                              className={`${styles.seat} ${
                                bookedSeats.includes(seatNumber)
                                  ? styles.booked
                                  : ""
                              } ${
                                selectedSeats.includes(seatNumber)
                                  ? styles.selected
                                  : ""
                              }`}
                              onClick={() =>
                                handleSeatClick(seatNumber, category.name)
                              }
                            >
                              {index + 1}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.content2}>
          <div className={styles.head}>
            <p className={styles.headp1}>Booking Summary</p>
            <img
              src="https://www.pvrcinemas.com/static/media/cancel-ticket.82227dbfe765d1745e6b9a02a7ed0606.svg"
              alt="cancel"
              className={styles.headimg}
            />
          </div>
          <div className={styles.moviedatamain}>
            <div className={styles.movieimgdiv}>
              <img src={images} alt="imageposter" className={styles.movieimg} />
            </div>
            <div className={styles.moviedata}>
              <p className={styles.title}>
                {movieName || "Movie name not available"}
              </p>
              <p className={styles.data1}>UA 13+ Drama Gujarati</p>
              <p className={styles.data1}>
                {day}, {date}-{month},{time}
              </p>
              <p className={styles.data1}>
                {theatre}-{address}
              </p>
            </div>
          </div>
          <div className={styles.seatinfomain}>
            <p className={styles.seatp1}>SEAT INFO</p>
            <p className={styles.seatp2}>
              {selectedSeats.length > 0
                ? seatCategories.find((cat) =>
                    cat.rows.includes(selectedSeats[0].charAt(0))
                  )?.name || "STANDARD"
                : "SELECT SEATS"}
            </p>
            <div className={styles.seatinfo}>
              {selectedSeats.map((seat) => (
                <div key={seat} className={styles.seat}>
                  {seat}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.tickets}>
            <p className={styles.ticketp1}>TICKETS</p>
            <div className={styles.calc}>
              <p className={styles.calcp1}>
                {" "}
                {selectedSeats.length} x{" "}
                {calculateSubtotal() / selectedSeats.length || 0}{" "}
              </p>
              <p className={styles.calcp1}>Rs {calculateSubtotal()}</p>
            </div>
          </div>
          <div className={styles.payment}>
            <p className={styles.paymentp1}>PAYMENT DETAILS</p>
            <div className={styles.pay}>
              <p className={styles.paymentp2}>SUB TOTAL</p>
              <p className={styles.paymentp2}>Rs {calculateSubtotal()}</p>
            </div>
            <div className={styles.pay}>
              <p className={styles.paymentp3}>CONV FEES</p>
              <p className={styles.paymentp3}>Rs {selectedSeats.length * 10}</p>
            </div>
            <div className={styles.pay}>
              <p className={styles.paymentp3}>GST</p>
              <p className={styles.paymentp3}>
                Rs {calculateSubtotal() * 0.18}
              </p>
            </div>
          </div>
          <div className={styles.processdiv}>
            <div className={styles.process}>
              <p className={styles.processp1}>GRAND TOTAL</p>
              <p className={styles.processp1}> ₹{calculateGrandTotal()}</p>
            </div>
            <div className={styles.buttondiv}>
              <Link
                to="/paymentpage"
                state={{
                  movieName: movieName,
                  day: day || "",
                  month: month || "",
                  date: date,
                  time: time,
                  images: images,
                  theatre: theatre,
                  address: address,
                  language: language,
                  bookedSeats: selectedSeats,
                  perticket: calculateSubtotal() / selectedSeats.length,
                  convenienceFee: selectedSeats.length * 10,
                  totalprice: calculateSubtotal(),
                }}
                className={styles.link}
              >
                <button
                  className={styles.processbutton}
                  onClick={handleBookSeats}
                  disabled={selectedSeats.length === 0}
                >
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
