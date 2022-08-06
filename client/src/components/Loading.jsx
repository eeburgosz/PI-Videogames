import React from "react";
import "../css/loading.css";
import loading from "../assets/loading.gif";

export const Loading = () => {
  return (
    <>
      <div className="containerLoading">
        <h1>Loading...</h1>
        <img src={loading} alt="Loading" />
      </div>
    </>
  );
};
