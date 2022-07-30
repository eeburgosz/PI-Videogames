import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filteredGenres,
  filteredRating,
  getAllVideogames,
  getGenres,
  sort,
} from "../redux/actions/actions";
import { CardGame } from "./CardGame";
import { NavBar } from "./NavBar";

import "../css/home.css";
import { Footer } from "./Footer";
import { Paginado } from "./Paginado";
import { ASCENDENTE, DESCENDENTE, MAX, MIN, ORDEN } from "../constantes/sort";

export const Home = () => {
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  //console.log(genres);
  //console.log(allVideogames);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getGenres());
  }, [dispatch]);
  //console.log(allVideogames);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(getAllVideogames());
  };
  //!   Paginado----------------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  //!---------------------------------------------------------------------
  //?----------------------------------------------------
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
    setOrderByRating(`Ordenado: ${e.target.value}`);
    setCurrentPage(1);
  };
  const handleSelectChange = (e) => {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setOrderByRating(`Ordenado: ${e.target.value}`);
    setCurrentPage(1);
  };
  //?----------------------------------------------------

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <aside>
        <div className="container">
          <select onChange={handleSelectChange}>
            <option value={ORDEN} disabled selected>
              Orden
            </option>
            <option value={ASCENDENTE}>A to Z</option>
            <option value={DESCENDENTE}>Z to A</option>
          </select>
          <select onChange={(e) => handleFilteredRatings(e)}>
            <option value={ORDEN} disabled selected>
              Rating
            </option>
            <option value={MAX}>Max a min</option>
            <option value={MIN}>Min a max</option>
          </select>
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
      </aside>
      <NavBar />
      <div className="home">
        <button onClick={handleClick}>Refresh</button>
        {currentVideogame &&
          currentVideogame.map((game) => {
            return (
              <CardGame
                key={game.id}
                id={game.id}
                name={game.name}
                background_image={game.background_image}
                genres={game.genres}
                rating={game.rating}
              />
            );
          })}
      </div>
      <Paginado
        allVideogames={allVideogames.length}
        videogamesPerPage={videogamesPerPage}
        paginado={paginado}
      />
      <Footer />
    </div>
  );
};
