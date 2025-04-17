import React, { useState } from "react";
import styles from "./EventPage.module.css";
import Header1 from "./Header1";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

const themes = [
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-V2VkLCAxOSBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00365252-alxkxwzwxr-portrait.jpg",
    title: "Sky Jumper Trampoline Park - Ahmedabad",
    type: "Sky Jumper Park",
    park: "Theme Parks",
    price: "Rs 490",
    part: "Amusment",
    heading: "Events in Ahmedabad",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VHVlLCAxIEFwciBvbndhcmRz,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00308166-ktudnxdent-portrait.jpg",
    title: "Shankus Waterpark and Resort",
    type: "Shankus Waterpark and Resort",
    park: "Water park",
    price: "Rs 550",
    part: "Amusment",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-V2VkLCAxOSBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end:l-image,i-discovery-catalog@@icons@@bundle-icon-shadow-4x.png,lx-15,ly-15,w-50,l-end/et00433649-mxepufstbs-portrait.jpg",
    title: "Sky Jumper Trampoline Park",
    type: "Multiple Venues",
    park: "Theme Parks",
    price: "Rs 490",
    part: "Amusment",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VHVlLCAxNSBBcHIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00437814-knfymrutdy-portrait.jpg",
    title: "15  DAYS INTENSIVE ACTING WORKSHOP",
    type: "Theatre & Media Center",
    park: "Acting",
    price: "Rs 6000",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00364802-sbtgkcnztw-portrait.jpg",
    title: "COUPLE ART WORKSHOP",
    type: "Monkey Cafe : Ahmedabad",
    park: "Arts and Crafts",
    price: "Rs 1299",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-V2VkLCAyNiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00131529-vljtghadtk-portrait.jpg",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00426484-qwkxdcqseu-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyMyBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00416136-lmrtsxpfwq-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00360316-hsvkbmrqjm-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyMyBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00437044-pycywjwsuh-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Panting",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00383554-qpguzytbek-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00392286-yetnhpqcnh-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Panting",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00411338-chwheeasln-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyMCBBcHI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00433157-rukvnstbaa-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "School",
    price: "Rs 650",
    part: "Comedy",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00426484-qwkxdcqseu-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Comedy",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VGh1LCAyNyBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00345173-wjwmquwuec-portrait.jpg",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Comedy",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VGh1LCAyNyBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00411941-uvjqplnljh-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Comedy",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyOSBNYXI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00434581-vtlzgmdqum-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Comedy",
    location: "Ahmedabad",
  },
  {
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCAyMiBNYXIgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00426484-qwkxdcqseu-portrait.jpg",
    title: "Magic Beans - RHYME AND RHYTHM",
    type: "Magic Beans - Kemps",
    park: "Education",
    price: "Rs 650",
    part: "Workshop",
    location: "Ahmedabad",
  },
];

export default function EventPage() {
  const [filter, setFilter] = useState("all");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const part = queryParams.get("part");

  const filteredThemes = themes.filter((theme) => {
    if (part) {
      return theme.part.toLowerCase() === part.toLowerCase();
    } else {
      return true;
    }
  });
  const uniqueParks = [
    ...new Set(
      themes
        .filter((theme) => theme.part.toLowerCase() === part?.toLowerCase())
        .map((theme) => theme.park)
    ),
  ];
  return (
    <div className={styles.main}>
      <Navbar />
      <Header1 />
      <div className={styles.header}>
        <p>
          {part === "Amusment"
            ? "Amusement Parks in Ahmedabad"
            : part === "Workshop"
            ? "Workshops in Ahmedabad"
            : part === "Comedy"
            ? "Comedy Shows in Ahmedabad"
            : part === "Music"
            ? "Music Events in Ahmedabad"
            : part === "Upskill"
            ? "Upskill Sessions in Ahmedabad"
            : part === "Arts"
            ? "Arts & Crafts in Ahmedabad"
            : part === "Theatre"
            ? "Theatre Shows in Ahmedabad"
            : "Events in Ahmedabad"}
        </p>
      </div>
      <hr />
      <div className={styles.filter}>
        <button className={styles.themepark} onClick={() => setFilter("all")}>
          All
        </button>
        {uniqueParks.map((park, index) => (
          <button
            key={index}
            className={styles.themepark}
            onClick={() => setFilter(park.toLowerCase())}
          >
            {park}
          </button>
        ))}
      </div>
      <hr />
      <div className={styles.maincontentdiv}>
        <div className={styles.maincontent}>
          {filteredThemes.length > 0 ? (
            filteredThemes
              .filter((theme) => {
                if (filter === "all") {
                  return true;
                } else {
                  return theme.park.toLowerCase() === filter;
                }
              })
              .map((theme, index) => (
                <Link
                  to="/bookpage"
                  state={{
                    theme: theme.title,
                    img: theme.img,
                    type: theme.type,
                    park: theme.park,
                    price: theme.price,
                    locations: theme.location,
                  }}
                  className={styles.cardLink}
                >
                  <div key={index} className={styles.card}>
                    <img
                      src={theme.img}
                      alt={theme.title}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{theme.title}</h3>
                      <p className={styles.cardType}>{theme.type}</p>
                      <p className={styles.cardPark}>{theme.park}</p>
                      <p className={styles.cardPrice}>{theme.price}</p>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p className={styles.noEvent}>No event at this moment</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
