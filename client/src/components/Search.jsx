import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../redux/actions/actions";
import "../css/search.css";

export const Search = () => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInputChange}
          value={search}
          className="search"
          placeholder="Busca por nombre..."
        />
        <input type="submit" value="Buscar" className="searchBtn" />
      </form>
    </div>
  );
};
