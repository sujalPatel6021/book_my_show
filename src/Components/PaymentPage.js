import React, { useState } from "react";
import styles from "./PaymentPage.module.css";
import { useLocation } from "react-router-dom";

const MoviePaymentBox = () => {
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

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const subtotal = bookingDetails.seats.length * bookingDetails.pricePerTicket;
  const tax = 0.18 * bookingDetails.taxRate;
  const total = subtotal + bookingDetails.convenienceFee + tax;

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // You might want to redirect after showing the success animation
      setTimeout(() => {
        // navigation to confirmation page could go here
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className={styles.paymentContainer}>
        <div className={styles.successAnimation}>
          <svg
            className={styles.checkmark}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className={styles.checkmarkCircle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={styles.checkmarkCheck}
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <h2 className={styles.successTitle}>Payment Successful!</h2>
          <p className={styles.successMessage}>
            Your tickets have been booked successfully.
          </p>
          <div className={styles.bookingSummary}>
            <p>
              <strong>Movie:</strong> {bookingDetails.movie}
            </p>
            <p>
              <strong>Theater:</strong> {bookingDetails.theater}
            </p>
            <p>
              <strong>Seats:</strong> {bookingDetails.seats.join(", ")}
            </p>
            <p>
              <strong>Show Time:</strong> {bookingDetails.time},{" "}
              {bookingDetails.day}, {bookingDetails.date} {bookingDetails.month}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹{total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentBox}>
        <div className={styles.movieSidebar}>
          <h3 className={styles.sidebarHeader}>Booking Summary</h3>
          <div className={styles.movieInfo}>
            <div className={styles.moviediv}>
              <img
                src={images}
                alt="movieimage"
                className={styles.movieimage}
              />
              <div className={styles.movieinfodiv}>
                <p className={styles.movieTitle}>{bookingDetails.movie}</p>
                <p className={styles.movieDetail}>
                  {bookingDetails.theater}-{bookingDetails.address}
                </p>
                <p className={styles.movieDetail}>
                  {bookingDetails.date}-{bookingDetails.month},{" "}
                  {bookingDetails.day} | {bookingDetails.time}
                </p>
              </div>
            </div>
            <div className={styles.seatsContainer}>
              Seats: {bookingDetails.seats.join(", ")}
            </div>
          </div>

          <div className={styles.priceSummary}>
            <div className={styles.priceRow}>
              <span>Subtotal ({bookingDetails.seats.length} tickets)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Convenience Fee</span>
              <span>₹{bookingDetails.convenienceFee}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.contentArea}>
          <h3 className={styles.paymentHeader}>Payment Method</h3>

          <div className={styles.paymentMethods}>
            <button
              className={`${styles.paymentMethodButton} ${
                paymentMethod === "card" ? styles.active : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              Credit/Debit Card
            </button>
            <button
              className={`${styles.paymentMethodButton} ${
                paymentMethod === "upi" ? styles.active : ""
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              UPI Payment
            </button>
          </div>

          <div className={styles.paymentForm}>
            {paymentMethod === "card" ? (
              <>
                <div className={styles.formGroup}>
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={handleCardInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={handleCardInputChange}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.formGroup}>
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={handleUpiChange}
                  />
                </div>
                <p className={styles.upiNote}>
                  You'll be redirected to your UPI app for payment
                </p>
              </>
            )}
          </div>

          <button
            className={styles.payButton}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className={styles.processingText}>Processing...</span>
            ) : (
              `Pay ₹${total.toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePaymentBox;
