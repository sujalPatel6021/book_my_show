import React, { useRef } from "react";
import styles from "./Premiere.module.css";
import { Link } from "react-router-dom";

const events = [
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00435561-atvelkzvjv-portrait.jpg",
    title: "Dominique",
    language: "English",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00421058-dckzpwmcaz-portrait.jpg",
    title: "Grafted",
    language: "English",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00132276-erkkmefxav-portrait.jpg",
    title: "Barah X Barah",
    language: "Hindi",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00345687-bvnkvkjaed-portrait.jpg",
    title: "Je Tere Naal Pyar Na Hunda",
    language: "Punjabi",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00436818-hnjcbrtula-portrait.jpg",
    title: "Chida Vichara Ki Kare",
    language: "Punjabi",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00404151-szddrqgdcv-portrait.jpg",
    title: "Chor Chor",
    language: "Gujarati",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00401017-bhuexjawxg-portrait.jpg",
    title: "Tara - The Lost Star",
    language: "Nepali",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00404965-nassmyykdq-portrait.jpg",
    title: "Idiyan Chandhu",
    language: "Malayalam",
  },
];

export default function Premiere() {
  const scrollRef = useRef(null);
  const scrollAmount = 300;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.divmain}>
      <div className={styles.div1}>
        <img
          src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-banner-web-collection-202208191200.png"
          alt="premiere banner"
          className={styles.img}
          loading="lazy"
        />
      </div>
      <div className={styles.div2}>
        <h2 className={styles.p1}>Premieres</h2>
        <p className={styles.p2}>Brand new releases every Friday</p>
        <div className={styles.cardContainer}>
          <button
            className={`${styles.scrollButton} ${styles.left}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            ❮
          </button>
          <div className={styles.cardhead}>
            <div className={styles.cardmain} ref={scrollRef}>
              {events.map((event, index) => (
                <Link
                  to="/premierebook"
                  state={{ movie: event }}
                  key={index}
                  className={styles.card}
                  style={{ textDecoration: "none" }}
                >
                  <img src={event.img} alt={event.title} loading="lazy" />
                  <p className={styles.title}>{event.title}</p>
                  <p className={styles.language}>{event.language}</p>
                </Link>
              ))}
            </div>
          </div>
          <button
            className={`${styles.scrollButton} ${styles.right}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
