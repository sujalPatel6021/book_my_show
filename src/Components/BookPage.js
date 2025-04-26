import React, { useState } from "react";
import styles from "./BookPage.module.css";
import { FaTicketAlt, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";

export default function BookPage() {
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const location = useLocation();
  const { theme, img, type } = location.state || {};

  function handleSubmit(e) {
    e.preventDefault();

    const options = {
      key: "rzp_test_mkGMMBKOGGS9rZ",
      amount: ticketCount * 100000, // Amount in paise
      currency: "INR",
      name: theme,
      description: `Number of Tickets ${ticketCount}`,
      image: img,
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      theme: {
        color: "#6e59a5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <>
      <div className={styles.main}>
        <Navbar />
        <div className={styles.contentWrapper}>
          <div className={styles.heroSection}>
            <img src={img} alt={theme} className={styles.heroImage} />
            <div className={styles.heroOverlay}>
              <h1 className={styles.heroTitle}>{theme}</h1>
              <p className={styles.heroSubtitle}>{type}</p>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.detailsCard}>
              <div className={styles.detailItem}>
                <FaLocationDot className={styles.detailIcon} />
                <div>
                  <h3>Location</h3>
                  <p>{theme} Venue</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <FaTicketAlt className={styles.detailIcon} />
                <div>
                  <h3>Price</h3>
                  <p>₹1000 onwards</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <RiMoneyDollarCircleLine className={styles.detailIcon} />
                <div>
                  <h3>No Booking Fees</h3>
                  <p>Pay only ticket price</p>
                </div>
              </div>
            </div>

            <div className={styles.dateSection}>
              <h2 className={styles.sectionTitle}>Available Dates</h2>
              <div className={styles.dateCards}>
                <div className={styles.dateCard}>
                  <p className={styles.dateDay}>Sat</p>
                  <p className={styles.dateNum}>29</p>
                  <p className={styles.dateMonth}>Mar</p>
                </div>
                <div className={styles.dateCard}>
                  <p className={styles.dateDay}>Sun</p>
                  <p className={styles.dateNum}>30</p>
                  <p className={styles.dateMonth}>Mar</p>
                </div>
                <div className={styles.dateCard}>
                  <p className={styles.dateDay}>Wed</p>
                  <p className={styles.dateNum}>30</p>
                  <p className={styles.dateMonth}>Apr</p>
                </div>
              </div>
            </div>

            <div className={styles.aboutSection}>
              <h2 className={styles.sectionTitle}>
                <FaInfoCircle className={styles.sectionIcon} /> About the Event
              </h2>
              <p className={styles.aboutText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                quis voluptate quaerat nulla veritatis quisquam placeat nam
                error minus iure! Neque repudiandae aperiam voluptas numquam
                facilis quibusdam obcaecati iusto molestiae. Lorem ipsum dolor
                sit amet consectetur, adipisicing elit.
              </p>
            </div>

            <button
              className={styles.bookButton}
              onClick={() => setShowBookingPopup(true)}
            >
              Book Tickets Now
            </button>
          </div>
        </div>

        {showBookingPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <button
                className={styles.closePopup}
                onClick={() => setShowBookingPopup(false)}
              >
                <FaArrowLeft /> Back to event
              </button>
              <h2 className={styles.popupTitle}>Select Tickets</h2>

              <div className={styles.ticketSelector}>
                <div className={styles.ticketType}>
                  <h3>Standard Ticket</h3>
                  <p>₹1000 per ticket</p>
                </div>

                <div className={styles.quantityControl}>
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span className={styles.ticketCount}>{ticketCount}</span>
                  <button
                    onClick={() =>
                      setTicketCount(Math.min(10, ticketCount + 1))
                    }
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.priceSummary}>
                <div className={styles.priceRow}>
                  <span>Tickets ({ticketCount} × ₹1000)</span>
                  <span>₹{ticketCount * 1000}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Convenience Fee</span>
                  <span>₹0</span>
                </div>
                <div className={styles.priceRowTotal}>
                  <span>Total</span>
                  <span>₹{ticketCount * 1000}</span>
                </div>
              </div>

              <button onClick={handleSubmit} className={styles.continueButton}>
                Pay with Razorpay
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
