import React from "react";
import { Link } from "react-router-dom";
import "../css/landingPage.css";

export const LandingPage = () => {
  return (
    <>
      <div className="containerLanding">
        <h2 className="texto"> Welcome to</h2>
        <h1 className="texto2">EB Games</h1>
        <Link to="/home">
          <button className="boton">Entrar</button>
        </Link>
      </div>
    </>
  );
};
