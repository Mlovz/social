import { Avatar } from "components";
import React from "react";
import "./user-card.scss";

const UserCard = ({ user, children }) => {
  return (
    <div className="user-card">
      <Avatar src={user.avatar} />

      <div className="user-card_text">
        <h6>{user.fullname}</h6>
        <span>@{user.username}</span>
      </div>

      <div className="user-card_child">{children}</div>
    </div>
  );
};

export default UserCard;
