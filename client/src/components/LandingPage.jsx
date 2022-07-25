import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="container">
      <h1>Bienvenidos a Videogames EB</h1>
      <Link to="/home">
        <button>Entrar</button>
      </Link>
    </div>
  );
};
