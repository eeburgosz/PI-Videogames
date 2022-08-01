import React from "react";
import "../css/paginado.css";

export const Paginado = ({ videogamesPerPage, allVideogames, paginado }) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allVideogames / videogamesPerPage) + 1; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginado">
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="botones">
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};
