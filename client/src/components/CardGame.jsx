import "../css/cardGame.css";
import React from "react";
import { Link } from "react-router-dom";

export const CardGame = ({ name, background_image, genres, rating, id }) => {
  return (
    <div className="containerCard">
      <p className="rating">⭐ {rating} </p>
      <Link to={`/videogame/${id}`} className="link">
        <div className="containerImg">
          <img src={background_image} alt={name} className="img" />
        </div>
        <h1>{name}</h1>
      </Link>
      <p>{genres.map((e) => e + " ")}</p>
    </div>
  );
};
