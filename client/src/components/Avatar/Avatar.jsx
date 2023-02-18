import React from "react";
import "./avatar.scss";

const Avatar = ({ src, size, ...rest }) => {
  return (
    <div className={`avatar ${size || ""}`}>
      <img
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
