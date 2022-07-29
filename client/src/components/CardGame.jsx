import "../css/cardGame.css";
import React from "react";
import { Link } from "react-router-dom";

export const CardGame = ({ name, background_image, genres, rating, id }) => {
  return (
    <div className="container">
      <p>{rating}</p>
      <Link to={`/videogame/${id}`}>
        <img src={background_image} alt={name} className="img" />
        <h1>{name}</h1>
      </Link>
      <p>{genres}</p>
    </div>
  );
};
