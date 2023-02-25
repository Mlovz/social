import React from "react";
import "./message.scss";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import { Outlet } from "react-router-dom";

const Message = () => {
  return (
    <div className="message">
      <LeftSide />

      <Outlet />
    </div>
  );
};

export default Message;
