import React from "react";
import "./heading.scss";

const Heading = ({ component = "h1", type, children }) => {
  return (
    <>
      {component === "h1" && (
        <h1 className={`heading ${type || ""}`}>{children}</h1>
      )}

      {component === "p" && (
        <p className={`heading ${type || ""}`}>{children}</p>
      )}
    </>
  );
};

export default Heading;
