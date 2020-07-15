/** @format */

import React from "react";
import "./LoadingIndicator.scss";

const LoadingIndicator = () => {
  return (
    <div className="spinner">
      <div className="spinner-grow text-primary" />
      <div className="spinner-grow text-primary" />
      <div className="spinner-grow text-primary" />
      <div className="spinner-grow text-primary" />
      <div className="spinner-grow text-primary" />
      <div className="spinner-grow text-primary" />
    </div>
  );
};

export default LoadingIndicator;
