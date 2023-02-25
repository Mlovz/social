import React from "react";
import "./right-side.scss";

import MessengerIcon from "assets/Messenger.png";

const RightSide = () => {
  return (
    <div className="right-side">
      <div className="right-side_icon">
        <img src={MessengerIcon} alt="" />
      </div>
    </div>
  );
};

export default RightSide;
