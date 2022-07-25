import "../css/cardGame.css";
import React from "react";
import { Link } from "react-router-dom";

export const CardGame = ({ name, img, genres, rating, id }) => {
  return (
    <div className="container">
      <p>{rating}</p>
      <Link to={`/videogame/${id}`}>
        <img src={img} alt={name} className="img" />
        <h1>{name}</h1>
      </Link>
      <p>{genres}</p>
    </div>
  );
};
