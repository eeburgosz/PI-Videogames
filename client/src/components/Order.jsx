import React from "react";
import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../constantes/sort";
import { sort } from "../redux/actions/actions";

export const Order = () => {
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(sort(e.target.value));
  };

  return (
    <select name="select" onChange={handleSelectChange}>
      <option>Seleccionar</option>
      <option value={ASCENDENTE}>A to Z</option>
      <option value={DESCENDENTE}>Z to A</option>
    </select>
  );
};
