import React, { useState } from "react";
import styles from "./MusicStudioBook.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function PremiereBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const { img, title, locations, type } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  const handleBookNow = () => setShowPopup(true);

  const handleConfirm = () => {
    alert(`🎉 Success! Booked ${ticketCount} ticket(s) for ${title}!`);
    setShowPopup(false);
    setTicketCount(1);
  };

  const incrementCount = () =>
    ticketCount < 10 && setTicketCount(ticketCount + 1);
  const decrementCount = () =>
    ticketCount > 1 && setTicketCount(ticketCount - 1);

  return (
    <div className={styles.main}>
      {img ? (
        <div className={styles.movieContainer}>
          <div className={styles.posterContainer}>
            <img src={img} alt={title} className={styles.moviePoster} />
            <div className={styles.gradientOverlay}></div>
          </div>

          <div className={styles.movieDetails}>
            <div className={styles.movieHeader}>
              <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
              >
                ← Back to Concerts
              </button>
              <h1 className={styles.name}>{title}</h1>
              <div className={styles.metaInfo}>
                <span className={styles.language}>{locations}</span>
                <span className={styles.premiereBadge}>{type}</span>
              </div>
            </div>

            <div className={styles.synopsis}>
              <h2 className={styles.abouttitle}>Event Details</h2>
              <p className={styles.aboutcontent}>
                Experience an unforgettable evening with this live concert.
                {title} brings you a perfect blend of music and excitement that
                you won't want to miss at {locations}.
              </p>
            </div>

            <div className={styles.bookingInfo}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📅</div>
                <div>
                  <h3 className={styles.infoCardh3}>Date</h3>
                  <p className={styles.infoCardp}>Saturday, March 29, 2025</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>⏳</div>
                <div>
                  <h3 className={styles.infoCardh3}>Duration</h3>
                  <p className={styles.infoCardp}>3 hours</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🎫</div>
                <div>
                  <h3 className={styles.infoCardh3}>Tickets</h3>
                  <p className={styles.infoCardp}>Max 10 per booking</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>💰</div>
                <div>
                  <h3 className={styles.infoCardh3}>Price</h3>
                  <p className={styles.infoCardp}>₹1500 per ticket</p>
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
            <h2 className={styles.placeholderh2}>No Concert Selected</h2>
            <p className={styles.placeholderp}>
              Please select a concert from the music studio collection
            </p>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              ← Browse Concerts
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
              <h2 className={styles.popupHeaderh2}>Book Tickets</h2>
              <p className={styles.popupSubtitle}>{title}</p>
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
              <span className={styles.priceContainerSpan}>Tickets</span>
              <span className={styles.priceContainerSpan}>
                ₹{ticketCount * 1500}
              </span>
            </div>
            <div className={styles.popupButtons}>
              <button className={styles.confirmButton} onClick={handleConfirm}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
