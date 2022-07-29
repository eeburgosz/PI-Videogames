import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "./Footer";
import "../css/createScreen.css";
import { createGame, getGenres } from "../redux/actions/actions";

export const CreateScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  const genres = useSelector((state) => state.genres);
  const [create, setCreate] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  });

  const onInputChange = (e) => {
    e.preventDefault();
    setCreate({
      ...create,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlatforms = (e) => {
    if (e.target.checked) {
      setCreate({
        ...create,
        platforms: [...create.platforms, e.target.value],
      });
    } else if (!e.target.checked) {
      setCreate({
        ...create,
        platforms: create.platforms.filter((el) => el !== e.target.value),
      });
    }
  };
  const handleGenres = (e) => {
    if (e.target.checked) {
      setCreate({
        ...create,
        genres: [...create.genres, e.target.value],
      });
    } else if (!e.target.checked) {
      setCreate({
        ...create,
        genres: create.genres.filter((el) => el.name !== e.target.value),
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(create));
  };

  let platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    " SEGA",
    "Dreamcast",
    "3DS",
    "Game Gear",
    "Neo Geo",
  ];
  //console.log(genres);

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            value={create.name}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Fecha de lanzamiento: </label>
          <input
            type="date"
            name="released"
            value={create.released}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="number"
            name="rating"
            value={create.rating}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Generos: </label>
          <div>
            {genres.map((e, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="genres"
                  value={e}
                  onClick={handleGenres}
                />
                {e}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Plataformas: </label>
          <div>
            {platforms.map((e, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="platforms"
                  value={e}
                  onClick={handlePlatforms}
                />
                {e}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Imagen </label>
          <input
            type="text"
            name="background_image"
            value={create.background_image}
            placeholder="URL DE IMAGEN ...."
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Descripción: </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            className="textarea"
            value={create.description}
            onChange={onInputChange}
          />
          <button type="submit">Crear</button>
        </div>
      </form>
      <Footer />
    </>
  );
};
