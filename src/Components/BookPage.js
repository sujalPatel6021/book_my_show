import React, { useState } from "react";
import styles from "./BookPage.module.css";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";

export default function BookPage() {
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [upiId, setUpiId] = React.useState("");
  const location = useLocation();
  const { theme, img, type } = location.state || {};
  return (
    <>
      <div className={styles.main}>
        <Navbar />
        <div className={styles.contentWrapper}>
          <div className={styles.imgdiv}>
            <img src={img} alt="sankusimg" className={styles.img} />
            <img src={img} alt="sankusimg" className={styles.imgmobile} />
          </div>
          <div className={styles.contentdiv}>
            <div className={styles.data}>
              <p className={styles.name}>{theme}</p>
              <p className={styles.theme}>
                {type} | English, Hindi, Gujarati| All age groups | 7hrs
              </p>
            </div>
            <div className={styles.bookbuttondiv}>
              <button
                className={styles.buttonbook}
                onClick={() => setShowBookingPopup(true)}
              >
                Book
              </button>
              <p className={styles.fees}>No booking fees</p>
            </div>
          </div>
          <div className={styles.date}>
            Sat 29 Mar 2025 - Wed 30 Apr 2025
            <p className={styles.p1}>
              {" "}
              <FaLocationDot className={styles.locicon} />
              {theme} | Rs1000 onwards
            </p>
          </div>
          <div className={styles.description}>
            <div className={styles.interest}>
              Click on Interested to stay updated about this event
            </div>
            <button className={styles.interestbutton}>Interested?</button>
          </div>
          <div className={styles.aboutusdiv}>
            <p className={styles.abouttitle}>About </p>
            <p className={styles.aboutcontent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quis
              voluptate quaerat nulla veritatis quisquam placeat nam error minus
              iure! Neque repudiandae aperiam voluptas numquam facilis quibusdam
              obcaecati iusto molestiae. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Excepturi voluptatem perspiciatis repellendus
              architecto, accusantium quos quas, dolores facere vitae numquam
              quo soluta, vel ea omnis quis corrupti doloremque cumque deleniti!
            </p>
          </div>
        </div>

        {showBookingPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <h3>Select Number of Tickets</h3>
              <div className={styles.ticketSelector}>
                <button
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className={styles.quantityBtn}
                >
                  -
                </button>
                <span className={styles.ticketCount}>{ticketCount}</span>
                <button
                  onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                  className={styles.quantityBtn}
                >
                  +
                </button>
              </div>
              <div className={styles.popupButtons}>
                <button
                  onClick={() => {
                    setShowBookingPopup(false);
                    setShowPaymentPopup(true);
                  }}
                  className={styles.confirmBtn}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowBookingPopup(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showPaymentPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <h3>Enter UPI Details</h3>
              <p>
                Booking {ticketCount} ticket(s) for ₹{ticketCount * 1000}
              </p>
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className={styles.upiInput}
              />
              <div className={styles.popupButtons}>
                <button
                  onClick={() => {
                    alert(`Booking confirmed for ${ticketCount} tickets!`);
                    setShowPaymentPopup(false);
                    setUpiId("");
                    setTicketCount(1);
                  }}
                  className={styles.confirmBtn}
                  disabled={!upiId}
                >
                  Proceed to Pay
                </button>
                <button
                  onClick={() => {
                    setShowPaymentPopup(false);
                    setShowBookingPopup(true);
                  }}
                  className={styles.cancelBtn}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
