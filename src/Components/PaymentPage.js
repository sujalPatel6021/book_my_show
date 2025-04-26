import React, { useState } from "react";
import styles from "./PaymentPage.module.css";
import { useLocation } from "react-router-dom";
const MOVIE = {
  hall: "Cinema 4 - Dolby",
};

export default function CheckoutPage() {
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
    bookedSeats,
    convenienceFee,
    perticket,
    totalprice,
  } = location.state || {};
  const bookingDetails = {
    img: images,
    movie: movieName,
    date: date,
    day: day,
    month: month,
    time: time,
    theater: theatre,
    address: address,
    seats: bookedSeats,
    pricePerTicket: perticket,
    convenienceFee: convenienceFee,
    taxRate: totalprice,
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const subtotal = bookingDetails.seats.length * bookingDetails.pricePerTicket;
  const tax = 0.18 * bookingDetails.taxRate;
  const total = subtotal + bookingDetails.convenienceFee + tax;
  function handleSubmit(e) {
    e.preventDefault();

    const options = {
      key: "rzp_test_mkGMMBKOGGS9rZ",
      amount: Math.round(total * 100),
      currency: "INR",
      name: bookingDetails.movie,
      description: `Booking for ${bookingDetails.seats.join(", ")}`,
      image: bookingDetails.img,
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: "#6e59a5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className={styles.checkoutBackground}>
      <div className={styles.checkoutCard}>
        <h1 className={styles.header}>Movie Ticket Checkout</h1>

        <div className={styles.flexRow}>
          <div className={styles.posterSection}>
            <img
              src={bookingDetails.img}
              alt={bookingDetails.movie}
              className={styles.poster}
            />
            <div className={styles.movieTitle}>{bookingDetails.movie}</div>
            <div
              className={styles.movieInfo}
              style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
            >
              {bookingDetails.theater}{" "}
            </div>
            <div className={styles.movieInfo} style={{ color: "black" }}>
              {bookingDetails.address}{" "}
            </div>
            <div className={styles.movieInfo}>
              <span>Date:</span> {bookingDetails.date}
            </div>
            <div className={styles.movieInfo}>
              <span>Time:</span> {bookingDetails.time}
            </div>
            <div className={styles.movieInfo}>
              <span>Hall:</span> {MOVIE.hall}
            </div>
            <div className={styles.seatBox}>
              Seats: {bookingDetails.seats.join(", ")}
            </div>
          </div>
          <div className={styles.summarySection}>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>
                  Seat(s): <b>{bookingDetails.seats.join(", ")}</b>
                </span>
                <span>
                  ₹{bookingDetails.pricePerTicket}{" "}
                  <span className={styles.smallText}>/ ticket</span>
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Subtotal ({bookingDetails.seats.length} tickets)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Convenience Fee</span>
                <span>₹{bookingDetails.convenienceFee}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className={styles.summaryRowTotal}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  className={styles.input}
                  type="text"
                  required
                  value={name}
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  className={styles.input}
                  type="email"
                  required
                  value={email}
                  placeholder="email@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button type="submit" className={styles.payBtn}>
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
