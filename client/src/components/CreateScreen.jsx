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
  const genresStore = useSelector((state) => state.genres);
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

  const { name, description, released, rating, genres, platforms } = create;
  const [flag, setFlag] = useState(false);

  const onSubmit = (e) => {
    if (name.trim() === "" || name.length < 2 || name.length > 15) {
      return alert("El nombre debe contener entre 2 y 15 caractéres");
    } else if (
      description.trim() === "" ||
      description.length < 5 ||
      description.length > 255
    ) {
      return alert("La descripción debe contener entre 5 y 255 caractéres");
    } else if (released.trim() === "") {
      return alert("Debe ingresar una fecha de lanzamiento");
    } else if (
      rating === "" ||
      rating > "5" ||
      rating > 5 ||
      rating < "1" ||
      rating < 1
    ) {
      return alert("El rating debe estar entre 1 y 5");
    } else if (genres.length === 0) {
      return alert("Debes seleccionar al menos un género");
    } else if (platforms.length === 0) {
      return alert("Debes seleccionar al menos una plataforma");
    } else {
      setFlag(!flag);
      dispatch(createGame(create));
      resetForm();
    }
  };

  const resetForm = () => {
    setCreate({
      name: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
      background_image: "",
    });
  };

  let platformsStore = [
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
            placeholder="Nombre del juego..."
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
            placeholder="1-5"
            value={create.rating}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Generos: </label>
          <div>
            {genresStore.map((e, index) => (
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
            {platformsStore.map((e, index) => (
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
            col="40"
            value={create.background_image}
            placeholder="Pega tu URL de imagen aquí..."
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Descripción: </label>
          <textarea
            name="description"
            id="description"
            cols="60"
            rows="10"
            className="textarea"
            placeholder="Breve descripción del juego..."
            value={create.description}
            onChange={onInputChange}
          />
          <button disabled={flag} type="submit">
            Crear
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};
