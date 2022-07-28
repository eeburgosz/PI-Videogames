import React from "react";

export const Paginado = ({ videogamesPerPage, allVideogames, paginado }) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allVideogames / videogamesPerPage) + 1; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};
