import React from "react";
import { Link } from "react-router-dom";
import lpImage from "../assets/LandingPageImage.jpg";
import "../css/landingPage.css";

export const LandingPage = () => {
  return (
    <>
      <div className="containerLanding">
        <h2 className="texto"> Bienvenidos a</h2>
        <h1 className="texto2">EB Games</h1>
        <Link to="/home">
          <button className="boton">Entrar</button>
        </Link>
      </div>
      {/* </img> */}
    </>
  );
};
