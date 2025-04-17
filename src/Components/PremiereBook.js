import React, { useState } from "react";
import styles from "./PremiereBook.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function PremiereBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMovie = location.state?.movie || {};
  const [showPopup, setShowPopup] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  const handleBookNow = () => setShowPopup(true);

  const handleConfirm = () => {
    alert(
      `🎉 Success! Booked ${ticketCount} ticket(s) for ${selectedMovie.title}!`
    );
    setShowPopup(false);
    setTicketCount(1);
  };

  const incrementCount = () =>
    ticketCount < 10 && setTicketCount(ticketCount + 1);
  const decrementCount = () =>
    ticketCount > 1 && setTicketCount(ticketCount - 1);

  return (
    <>
      <div className={styles.main}>
        {selectedMovie.img ? (
          <div className={styles.movieContainer}>
            <div className={styles.posterContainer}>
              <img
                src={selectedMovie.img}
                alt={selectedMovie.title}
                className={styles.moviePoster}
              />
              <div className={styles.gradientOverlay}></div>
            </div>

            <div className={styles.movieDetails}>
              <div className={styles.movieHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => navigate(-1)}
                >
                  ← Back to Movies
                </button>
                <h1>{selectedMovie.title}</h1>
                <div className={styles.metaInfo}>
                  <span className={styles.language}>
                    {selectedMovie.language}
                  </span>
                  <span className={styles.premiereBadge}>
                    EXCLUSIVE PREMIERE
                  </span>
                </div>
              </div>

              <div className={styles.synopsis}>
                <h2>Storyline</h2>
                <p>
                  {selectedMovie.synopsis ||
                    "Immerse yourself in this captivating story that will keep you on the edge of your seat. A perfect blend of emotion and excitement, this premiere is an experience you won't want to miss."}
                </p>
              </div>

              <div className={styles.bookingInfo}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>📅</div>
                  <div>
                    <h3>Showtimes</h3>
                    <p>Every Friday at 8:00 PM</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>⏳</div>
                  <div>
                    <h3>Duration</h3>
                    <p>2h 15m</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>🎫</div>
                  <div>
                    <h3>Tickets</h3>
                    <p>Max 10 per booking</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>💰</div>
                  <div>
                    <h3>Price</h3>
                    <p>₹199 per ticket</p>
                  </div>
                </div>
              </div>

              <button className={styles.bookButton} onClick={handleBookNow}>
                <span className={styles.buttonText}>Book Tickets Now</span>
                <span className={styles.buttonIcon}>→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderContent}>
              <h2>No Movie Selected</h2>
              <p>Please select a movie from the premiere collection</p>
              <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
              >
                ← Browse Movies
              </button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setShowPopup(false);
                  setTicketCount(1);
                }}
              >
                ×
              </button>

              <div className={styles.popupHeader}>
                <h2>Book Tickets</h2>
                <p className={styles.popupSubtitle}>{selectedMovie.title}</p>
              </div>

              <div className={styles.counterContainer}>
                <button
                  className={styles.counterButton}
                  onClick={decrementCount}
                  disabled={ticketCount <= 1}
                >
                  −
                </button>
                <span className={styles.ticketCount}>{ticketCount}</span>
                <button
                  className={styles.counterButton}
                  onClick={incrementCount}
                  disabled={ticketCount >= 10}
                >
                  +
                </button>
              </div>

              <div className={styles.priceContainer}>
                <span>Tickets</span>
                <span style={{ paddingLeft: "5px" }}>₹{ticketCount * 199}</span>
              </div>

              <div className={styles.popupButtons}>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirm}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
