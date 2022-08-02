import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import Home from "../assets/Home.png";
import "../css/navbar.css";

import { useDispatch } from "react-redux";
import { getGameByName } from "../redux/actions/actions";
import "../css/search.css";

export const NavBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getGameByName(search));
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <nav className="navbar">
      <div>
        <Link to="/home">
          <img src={Home} alt="Home" className="homeImg" />
        </Link>
      </div>
      <div>
        <Link to="/createVideogame" className="create">
          <p>CREATE YOUR GAME</p>
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            onChange={handleInputChange}
            value={search}
            className="search"
            placeholder="Search by name..."
          />
          <input type="submit" value=">" className="searchBtn" />
        </form>
      </div>
    </nav>
  );
};
