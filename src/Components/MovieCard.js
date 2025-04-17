import React from "react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.image} alt={movie.title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.genre}>{movie.genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;
