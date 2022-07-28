import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASCENDENTE, DESCENDENTE, MAX, MIN } from "../constantes/sort";
import {
  filteredGenres,
  filteredRating,
  getGenres,
  sort,
} from "../redux/actions/actions";

import "../css/order.css";

export const Order = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  const genres = useSelector((state) => state.genres);
  //console.log(genres);

  const handleSelectChange = (e) => {
    e.preventDefault();
    dispatch(sort(e.target.value));
  };

  const [orderByRating, setOrderByRating] = useState("");

  const handleFilteredRatings = (e) => {
    e.preventDefault();
    dispatch(filteredRating(e.target.value));
    setOrderByRating(`Ordenado: ${e.target.value}`);
    setCurrentPage(1);
  };

  const handleGetFilteredGenres = (e) => {
    e.preventDefault();
    dispatch(filteredGenres(e.target.value));
  };

  return (
    <>
      <div className="container">
        <select onChange={handleSelectChange}>
          <option>Orden</option>
          <option value={ASCENDENTE}>A to Z</option>
          <option value={DESCENDENTE}>Z to A</option>
        </select>
      </div>
      <div className="container">
        <select onChange={(e) => handleFilteredRatings(e)}>
          <option>Rating</option>
          <option value={MAX}>Max a min</option>
          <option value={MIN}>Min a max</option>
        </select>
      </div>
      <div className="container">
        <select onChange={handleGetFilteredGenres}>
          <option value="allGames">Todos</option>
          {genres &&
            genres.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};
