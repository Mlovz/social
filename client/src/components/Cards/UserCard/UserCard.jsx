import { Avatar } from "components";
import React from "react";
import { Link } from "react-router-dom";
import "./user-card.scss";

const UserCard = ({ user, children }) => {
  return (
    <div className="user-card">
      {user && (
        <>
          <Avatar src={user?.avatar} />

          <div className="user-card_text">
            <Link to={`/profile/${user._id}`}>
              <h6>{user.fullname}</h6>
            </Link>
            <span>@{user.username}</span>
          </div>

          <div className="user-card_child">{children}</div>
        </>
      )}
    </div>
  );
};

export default UserCard;
