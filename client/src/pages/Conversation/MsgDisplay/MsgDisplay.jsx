import { Avatar } from "components";
import React from "react";

const MsgDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small" />
        <span className="fs_12">{user.username}</span>
      </div>

      <div className="chat_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, odit.
      </div>

      <div className="chat_time">Mart 2024</div>
    </>
  );
};

export default MsgDisplay;
