import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  filterApiDb,
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
import {
  ALL,
  API,
  ASCENDENTE,
  DB,
  DESCENDENTE,
  MAX,
  MIN,
  ORDEN,
} from "../helpers/constantes";
import { Loading } from "./Loading";

export const Home = () => {
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  //console.log(genres);
  //console.log(allVideogames);

  useEffect(() => {
    if (allVideogames.length === 0) {
      dispatch(getAllVideogames());
    }
    dispatch(getGenres());
  }, [dispatch, allVideogames.length]);
  //console.log(allVideogames);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(getAllVideogames());
  };
  //!   Paginado----------------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  //!---------------------------------------------------------------------
  //?----------------------------------------------------
  // eslint-disable-next-line
  const [orderBy, setOrderBy] = useState("");
  const handleFilteredRatings = (e) => {
    e.preventDefault();
    dispatch(filteredRating(e.target.value));
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };
  const handleGetFilteredGenres = (e) => {
    e.preventDefault();
    dispatch(filteredGenres(e.target.value));
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };
  const handleSelectChange = (e) => {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };
  const handleFilterCreate = (e) => {
    e.preventDefault();
    dispatch(filterApiDb(e.target.value));
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };
  //?----------------------------------------------------

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ppal">
      <NavBar />
      <Loading />
      <aside className="sidebar">
        <div className="container">
          <select onChange={handleSelectChange}>
            <option value={ORDEN} disabled selected>
              Orden
            </option>
            <option value={ASCENDENTE}>A to Z</option>
            <option value={DESCENDENTE}>Z to A</option>
          </select>
          <select onChange={handleFilteredRatings}>
            <option value={ORDEN} disabled selected>
              Rating
            </option>
            <option value={MAX}>Max a min</option>
            <option value={MIN}>Min a max</option>
          </select>
          <select onChange={handleFilterCreate}>
            <option value={ALL} selected>
              Todos
            </option>
            <option value={DB}>Nuevos</option>
            <option value={API}>Existentes</option>
          </select>
          <select onChange={handleGetFilteredGenres}>
            <option value={ALL} selected>
              Todos los géneros
            </option>
            {genres &&
              genres.map((e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              ))}
          </select>
        </div>
      </aside>

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
