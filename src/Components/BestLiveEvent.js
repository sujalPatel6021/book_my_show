import React, { useState } from "react";
import styles from "./BestLiveEvent.module.css";
import { Link } from "react-router-dom";

const events = [
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MyBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/bmshp-desktop-amusement-park-collection-202404190106.png",
    part: "Amusment",
  },
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MjUrIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/workshop-and-more-web-collection-202211140440.png",
    part: "Workshop",
  },
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NDArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/comedy-shows-collection-202211140440.png",
    part: "Comedy",
  },
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTUrIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/music-shows-collection-202211140440.png",
    part: "Music",
  },
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NSBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/upskill-collection-202211140440.png",
    part: "Upskill",
  },
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTUrIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/arts-crafts-collection-202211140440.png",
    part: "Arts",
  },
  {
    link: "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/theatre-shows-collection-202211140440.png",
    part: "Theatre",
  },
];

export default function BestLiveEvent() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 5;

  const handleNext = () => {
    if (startIndex + visibleCards < events.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <p>The Best Of Live Event</p>
      <div className={styles.sliderContainer}>
        <button
          className={styles.prevButton}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          &#10094;
        </button>
        <div className={styles.cardWrapper}>
          {events
            .slice(startIndex, startIndex + visibleCards)
            .map((event, index) => (
              <Link key={index} to={`/eventpage?part=${event.part}`}>
                <img
                  src={event.link}
                  alt={`Event ${index}`}
                  className={styles.card}
                />
              </Link>
            ))}
        </div>
        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={startIndex + visibleCards >= events.length}
        >
          &#10095;
        </button>
      </div>
    </>
  );
}
