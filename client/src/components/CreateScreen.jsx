import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "./Footer";
import "../css/createScreen.css";
import { createGame, getGenres } from "../redux/actions/actions";
import { NavBar } from "./NavBar";

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

  const onSubmit = (e) => {
    if (name.trim() === "" || name.length < 2 || name.length > 15) {
      e.preventDefault();
      return alert("The name must contain between 2 and 15 characters");
    } else if (
      description.trim() === "" ||
      description.length < 5 ||
      description.length > 255
    ) {
      e.preventDefault();
      return alert("The description must contain between 5 and 255 characters");
    } else if (released.trim() === "") {
      e.preventDefault();
      return alert("You must enter a release date");
    } else if (
      rating === "" ||
      /* rating > "5" || */
      rating.toString() > 5 ||
      /* rating < "1" || */
      rating.toString() < 1
    ) {
      e.preventDefault();
      return alert("The rating must be between 1 and 5");
    } else if (genres.length === 0) {
      e.preventDefault();
      return alert("You must select at least one gender");
    } else if (platforms.length === 0) {
      e.preventDefault();
      return alert("You must select at least one platform");
    } else {
      e.preventDefault();
      dispatch(createGame(create));
      alert("The game has been loaded successfully");
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

  let platformsStore = useSelector((state) => state.platforms);

  return (
    <>
      <NavBar />
      <form className="form" onSubmit={onSubmit}>
        <div className="containerInfo">
          <div className="containerInfo_1">
            <label>* Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Name of the game..."
              value={create.name}
              onChange={onInputChange}
            />
            <label>Release: </label>
            <input
              type="date"
              name="released"
              value={create.released}
              onChange={onInputChange}
            />
            <label>Rating: </label>
            <input
              type="number"
              name="rating"
              placeholder="1-5"
              value={create.rating}
              onChange={onInputChange}
            />
            <label>Image </label>
            <input
              type="text"
              name="background_image"
              col="40"
              value={create.background_image}
              placeholder="Paste your image URL here..."
              onChange={onInputChange}
            />
          </div>
          <div className="containerInfo_2">
            <div>
              <h4>* Genres: </h4>
              {genresStore.map((e, index) => (
                <li>
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="genres"
                      value={e}
                      onClick={handleGenres}
                    />
                    {e}
                  </label>
                </li>
              ))}
            </div>
            <div>
              <h4>* Platforms: </h4>
              {platformsStore.map((e, index) => (
                <li>
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="platforms"
                      value={e}
                      onClick={handlePlatforms}
                    />
                    {e}
                  </label>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="createDesc">
          <label>* Description: </label>
          <textarea
            name="description"
            id="description"
            cols="60"
            rows="10"
            className="textarea"
            placeholder="Brief description of the game..."
            value={create.description}
            onChange={onInputChange}
          />
        </div>
        <h2>(*) Required fields</h2>
        <button type="submit" className="button">
          Create
        </button>
      </form>
      <Footer />
    </>
  );
};
