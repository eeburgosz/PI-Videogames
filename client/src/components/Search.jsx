import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../redux/actions/actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getGameByName(search));
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  console.log(search);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={search} />
        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
};
