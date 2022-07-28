import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getGameDetail, resetDetail } from "../redux/actions/actions";
import { NavBar } from "./NavBar";
import "../css/detail.css";
import { Footer } from "./Footer";

export const DetailsScreen = () => {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.gameDetail);
  console.log(videogame);
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getGameDetail(id));
    return () => dispatch(resetDetail());
  }, [dispatch, id]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <NavBar />
      <div>
        <img src={videogame.img} alt={videogame.name} className="img" />
        <h1>{videogame.name}</h1>
        <p>{videogame.released}</p>
        <div>
          <span>Géneros: {videogame.genres?.join(" | ")} </span>
        </div>
        <div>
          <span>Plataformas: {videogame.platforms?.join(" | ")}</span>
        </div>
        <div>
          <span>Rating: {videogame.rating}</span>
        </div>
        <h4>Descripción: </h4>
        <p dangerouslySetInnerHTML={{ __html: videogame.description }} />
      </div>
      <button onClick={handleBack}>Volver</button>
      <Footer />
    </>
  );
};
