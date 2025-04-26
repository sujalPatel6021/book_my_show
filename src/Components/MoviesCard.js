import React from "react";
import MovieCard from "./MovieCard";
import styles from "./MoviesCard.module.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const movies = [
  {
    title: "Chhaava",
    genre: "Action/Drama/Historical",
    rating: 9.3,
    votes: "282K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4zLzEwICAyODIuNksgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00408691-wqmumfxjtk-portrait.jpg",
  },
  {
    title: "Umbarro",
    genre: "Comedy/Drama/Family",
    rating: 9.1,
    votes: "5.3K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICA1LjNLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00420660-yemjtgvzze-portrait.jpg",
  },
  {
    title: "Faati Ne",
    genre: "Comedy/Horror",
    rating: 9.2,
    votes: "1.7K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4yLzEwICAxLjdLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00428340-qubtwcwbeb-portrait.jpg",
  },
  {
    title: "Crazxy",
    genre: "Drama/Thriller",
    rating: 7.7,
    votes: "6.9K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny43LzEwICA2LjlLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00432204-euccgryvlj-portrait.jpg",
  },
  {
    title: "Mere Husband Ki Biwi",
    genre: "Comedy/Romantic",
    rating: 6.9,
    votes: "3.7K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ni45LzEwICAzLjdLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00430518-pbbpufjmrb-portrait.jpg",
  },
  {
    title: "Chhaava",
    genre: "Action/Drama/Historical",
    rating: 9.3,
    votes: "282K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4zLzEwICAyODIuNksgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00408691-wqmumfxjtk-portrait.jpg",
  },
  {
    title: "Umbarro",
    genre: "Comedy/Drama/Family",
    rating: 9.1,
    votes: "5.3K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICA1LjNLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00420660-yemjtgvzze-portrait.jpg",
  },
  {
    title: "Faati Ne?",
    genre: "Comedy/Horror",
    rating: 9.2,
    votes: "1.7K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4yLzEwICAxLjdLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00428340-qubtwcwbeb-portrait.jpg",
  },
  {
    title: "Crazxy",
    genre: "Drama/Thriller",
    rating: 7.7,
    votes: "6.9K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny43LzEwICA2LjlLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00432204-euccgryvlj-portrait.jpg",
  },
  {
    title: "Mere Husband Ki Biwi",
    genre: "Comedy/Romantic",
    rating: 6.9,
    votes: "3.7K",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ni45LzEwICAzLjdLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00430518-pbbpufjmrb-portrait.jpg",
  },
];

const MoviesCard = () => {
  const sliderRef = React.useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    cssEase: "ease-in-out",
    draggable: true,
    onSwipe: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.movieListContainer}>
      <h2 className={styles.title}>Recommended Movies</h2>
      <div className={styles.sliderContainer}>
        <button
          className={styles.prevButton}
          onClick={() => sliderRef.current.slickPrev()}
        >
          &#10094;
        </button>
        <Slider ref={sliderRef} {...settings} className={styles.movieSlider}>
          {movies.map((movie, index) => (
            <div key={index}>
              <Link
                to={`/movie/${movie.title}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </Slider>
        <button
          className={styles.nextButton}
          onClick={() => sliderRef.current.slickNext()}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default MoviesCard;
