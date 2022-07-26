import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../constantes/sort";
import { filteredGenres, getGenres, sort } from "../redux/actions/actions";

export const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  const genres = useSelector((state) => state.genres);
  console.log(genres);

  const handleSelectChange = (e) => {
    e.preventDefault();
    dispatch(sort(e.target.value));
  };

  const handleGetFilteredGenres = (e) => {
    e.preventDefault();
    dispatch(filteredGenres(e.target.value));
  };

  return (
    <>
      <select name="select" onChange={handleSelectChange}>
        <option>Seleccionar</option>
        <option value={ASCENDENTE}>A to Z</option>
        <option value={DESCENDENTE}>Z to A</option>
      </select>
      <select name="getgenres" onChange={handleGetFilteredGenres}>
        <option value="allGames">Todos</option>
        {genres.map((e, index) => (
          <option key={index} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};
