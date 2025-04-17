import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header1 from "./Header1";
import styles from "./MoviePage.module.css";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import MoviesCard from "./MoviesCard";
import Footer from "../Components/Footer";

const movies = [
  {
    title: "Umbarro",
    rating: "9.1",
    votes: "5.6",
    time: " 2hr 50m",
    type: "Comedy , Drama , Family",
    date: "24 Jan , 2025",
    language: "Gujarati",
    dimension: "2D",
    image:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/umbarro-et00420660-1734089497.jpg",
    backgoundimage:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/umbarro-et00420660-1734089497.jpg",
    about:
      " A lovelorn Delhi realtor, Ankur, finally finds new love after a bitter divorce. But when his amnesiac ex-wife, stuck in a blissful memory of their past, stumbles back into his life, Ankur is caught in a hilarious and heart-warming tug-of-war between past and present love, forcing him to navigate wedding plans and rekindled memories in a desperate bid to choose his future.",
  },
  {
    title: "Chhaava",
    rating: "8.1",
    votes: "8.6",
    time: " 2hr 20m",
    type: "Comedy , Drama , Family",
    date: "20 Feb , 2025",
    language: "Hindi",
    dimension: "2D",
    image:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/chhaava-et00408691-1737623374.jpg",
    backgoundimage:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/chhaava-et00408691-1737623374.jpg",
    about:
      " A lovelorn Delhi realtor, Ankur, finally finds new love after a bitter divorce. But when his amnesiac ex-wife, stuck in a blissful memory of their past, stumbles back into his life, Ankur is caught in a hilarious and heart-warming tug-of-war between past and present love, forcing him to navigate wedding plans and rekindled memories in a desperate bid to choose his future.",
  },
  {
    title: "Faati Ne",
    rating: "9.2",
    votes: "1.9",
    time: " 2hr 20m",
    type: "Comedy , Drama , Family",
    date: "20 Feb , 2025",
    language: "Gujarati",
    dimension: "2D",
    image:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/faati-ne-et00428340-1739770188.jpg",
    backgoundimage:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/faati-ne-et00428340-1739770188.jpg",
    about:
      " A lovelorn Delhi realtor, Ankur, finally finds new love after a bitter divorce. But when his amnesiac ex-wife, stuck in a blissful memory of their past, stumbles back into his life, Ankur is caught in a hilarious and heart-warming tug-of-war between past and present love, forcing him to navigate wedding plans and rekindled memories in a desperate bid to choose his future.",
  },
  {
    title: "Crazxy",
    rating: "8.8",
    votes: "5.3",
    time: " 2hr 20m",
    type: "Comedy , Drama , Family",
    date: "20 Feb , 2025",
    language: "Gujarati",
    dimension: "2D",
    image:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/crazxy-et00432204-1740134908.jpg",
    backgoundimage:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/crazxy-et00432204-1740134908.jpg",
    about:
      "A lovelorn Delhi realtor, Ankur, finally finds new love after a bitter divorce. But when his amnesiac ex-wife, stuck in a blissful memory of their past, stumbles back into his life, Ankur is caught in a hilarious and heart-warming tug-of-war between past and present love, forcing him to navigate wedding plans and rekindled memories in a desperate bid to choose his future.",
  },
  {
    title: "Mere Husband Ki Biwi",
    rating: "8.1",
    votes: "8.6",
    time: " 2hr 20m",
    type: "Comedy , Drama , Family",
    date: "20 Feb , 2025",
    language: "Hindi",
    dimension: "2D",
    image:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mere-husband-ki-biwi-et00430518-1738572406.jpg",
    backgoundimage:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/mere-husband-ki-biwi-et00430518-1738572406.jpg",
    about:
      " A lovelorn Delhi realtor, Ankur, finally finds new love after a bitter divorce. But when his amnesiac ex-wife, stuck in a blissful memory of their past, stumbles back into his life, Ankur is caught in a hilarious and heart-warming tug-of-war between past and present love, forcing him to navigate wedding plans and rekindled memories in a desperate bid to choose his future.",
  },
];

export default function MoviePage() {
  const navigate = useNavigate();

  const handleBookTicket = () => {
    navigate("/bookticketpage", {
      state: {
        movieName: movie.title,
        language: movie.language,
        dimension: movie.dimension,
        image: movie.image,
      },
    });
  };

  const { title } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.title === title);
    setMovie(selectedMovie);
  }, [title]);

  useEffect(() => {
    if (movie) {
      document.title = movie.title + " Movie Ticket";
    }
  }, [movie]);

  const handleShare = async () => {
    const pageUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this movie!",
          url: pageUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(pageUrl);
      alert("Page URL copied to clipboard!");
    }
  };

  if (!movie) {
    return <div>Error From Our Side</div>;
  }

  return (
    <div className={styles.headdiv}>
      <Navbar />
      <Header1 />
      <div className={styles.maindiv}>
        <div
          className={styles.photodiv}
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movie.backgoundimage})`,
          }}
        >
          <div className={styles.posterContainer}>
            <img
              src={movie.image}
              alt="Movie Poster"
              className={styles.poster}
            />
            <span className={styles.inCinemas}>In Cinemas</span>
          </div>
          <div className={styles.contentdiv}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.ratingContainer}>
              <StarIcon className={styles.starIcon} />
              <p className={styles.rating}>
                {movie.rating}/10 ( {movie.votes}K votes)
              </p>
              <button className={styles.rateButton}>Rate Now</button>
            </div>
            <div className={styles.tags}>
              <span className={styles.tag}>{movie.dimension}</span>
              <span className={styles.tag}>{movie.language}</span>
            </div>
            <div className={styles.details}>
              <p>{movie.time}</p>
              <p> . </p>
              <p>{movie.type}</p>
              <p>.</p>
              <p>UA13+</p>
              <p>{movie.date}</p>
            </div>

            <button className={styles.bookButton} onClick={handleBookTicket}>
              Book Tickets
            </button>
          </div>
          <button className={styles.shareButton} onClick={handleShare}>
            <ShareIcon className={styles.shareIcon} /> Share
          </button>
        </div>
      </div>
      <div className={styles.about}>
        <p className={styles.abouttitle}>About the movie</p>
        <p className={styles.aboutcontent}>{movie.about}</p>
      </div>
      <hr className={styles.horizontalLine} />
      <div className={styles.umightlike}>
        <MoviesCard />
      </div>
      <Footer />
    </div>
  );
}
