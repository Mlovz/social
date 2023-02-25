import React from "react";
import "./spinner.scss";

const Spinner = ({ color }) => {
  return <div className={`lds-dual-ring ${color || ""}`}></div>;
};

export default Spinner;
