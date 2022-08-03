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
      <div className="containerDetail">
        <div className="detailColumn">
          <div className="detailImg">
            <img
              src={videogame.background_image}
              alt={videogame.name}
              className="img"
            />
          </div>
          <div className="detailInfo">
            <h1>{videogame.name}</h1>
            <h2>
              <h3>Released: </h3>
              {videogame.released}
            </h2>
            <span>
              <h3>Genres: </h3> {videogame.genres?.join(" | ")}{" "}
            </span>
            <span>
              <h3>Platforms: </h3>
              {videogame.platforms?.join(" | ")}
            </span>
            <span>
              <h3>Rating: </h3>⭐ {videogame.rating}
            </span>
          </div>
        </div>
        <div className="detailDesc">
          <h4>Description: </h4>
          <p dangerouslySetInnerHTML={{ __html: videogame.description }} />
        </div>
      </div>
      <button onClick={handleBack} className="button">
        Go back
      </button>
      <Footer />
    </>
  );
};
