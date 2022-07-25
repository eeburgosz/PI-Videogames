import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { Search } from "./Search";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/createVideogame">
          <p>Crear juego</p>
        </Link>
      </div>
      <div>
        <Link to="/home">
          <p>Inicio</p>
        </Link>
      </div>
      <Search />
    </div>
  );
};
