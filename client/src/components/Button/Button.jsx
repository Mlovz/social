import React from "react";
import "./button.scss";

import { Link } from "react-router-dom";
import Spinner from "components/Spinner/Spinner";

const Button = ({
  to,
  type,
  fullWidth,
  loading,
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <>
      {to ? (
        <Link to={to} className={`btn ${className || ""}`}>
          {children}
        </Link>
      ) : (
        <button
          style={{ width: fullWidth ? "100%" : "" }}
          type={type || ""}
          className={`btn ${className || ""} `}
          onClick={onClick}
          disabled={disabled}
        >
          {loading ? <Spinner /> : children}
        </button>
      )}
    </>
  );
};

export default Button;
