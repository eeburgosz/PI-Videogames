import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllVideogames } from "../redux/actions/actions";
import { CardGame } from "./CardGame";
import { NavBar } from "./NavBar";
import { Order } from "./Order";

import "../css/home.css";
import { Footer } from "./Footer";

export const Home = () => {
  const allVideogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);
  console.log(allVideogames);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(getAllVideogames());
  };

  return (
    <div>
      <aside>
        <Order />
      </aside>
      <NavBar />
      <div className="home">
        <button onClick={handleClick}>Refresh</button>
        {allVideogames.map((game) => {
          return (
            <CardGame
              key={game.id}
              id={game.id}
              name={game.name}
              img={game.background_image}
              genres={game.genres}
              rating={game.rating}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};
