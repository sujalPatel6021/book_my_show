import React, { useState } from "react";
import styles from "./MusicStudio.module.css";
import { Link } from "react-router-dom";

const events = [
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00431579-zndbdxmqgm-portrait.jpg",
    title: "Aditya Gadhvi Live Concert - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-RnJpLCAxNCBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00418200-rlmsppkqkd-portrait.jpg",
    title: "Martin Garrix Live Concert - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyOSBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00421828-erwlwczbkm-portrait.jpg",
    title: "sonu Nigam Live Concert - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-RnJpLCAxNCBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00433637-cdmbsgkkys-portrait.jpg",
    title: "Shriji Utsav Live Concert - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAzMCBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00432548-dxvfnswceu-portrait.jpg",
    title: "The voice notes Concert by paresh pahuja - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00404151-szddrqgdcv-portrait.jpg",
    title: "chor chor Live Concert - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00401017-bhuexjawxg-portrait.jpg",
    title: "Tara Live Concert - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Event",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:l-image,i-discovery-catalog@@icons@@bms_premiere_v1.png,t-false,lfo-bottom_left,l-end/et00404965-nassmyykdq-portrait.jpg",
    title: "Idiyan Chandu Live  - Ahmedabad",
    location: "Savaana Party Lawn : Ahmedabad",
    type: "Concert",
  },
];
export default function MusicStudio() {
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
    <div className={styles.maindiv}>
      <p>Your Music Studio</p>
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
              <Link
                to="/musicstudiobook"
                style={{ textDecoration: "none" }}
                state={{
                  img: event.img,
                  title: event.title,
                  locations: event.location,
                  type: event.type,
                }}
              >
                <div className={styles.carddiv}>
                  <img
                    key={index}
                    src={event.img}
                    alt={`Event ${index}`}
                    className={styles.card}
                  />
                  <p className={styles.title}>{event.title}</p>
                  <p className={styles.location}>{event.location}</p>
                  <p className={styles.type}>{event.type}</p>
                </div>
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
    </div>
  );
}
