import React from "react";
import { useSelector } from "react-redux";
import "./avatar.scss";

const Avatar = ({ src, size, ...rest }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className={`avatar ${size || ""}`}>
      <img
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        {...rest}
        src={
          src
            ? src
            : "https://res.cloudinary.com/daggokgzh/image/upload/v1618647877/ava_uzzrzw.png"
        }
        alt=""
      />
    </div>
  );
};

export default Avatar;
