import { FollowBtn, Heading } from "components";
import UserCard from "components/Cards/UserCard/UserCard";
import React from "react";
import { Link } from "react-router-dom";
import "./followed.scss";

const Followed = ({ users, id, text }) => {
  return (
    <div className="followed">
      <Heading component="h1">{text}</Heading>

      <div className="followed_box">
        {users.length === 0 ? (
          <Heading component="h1">Нет подписок</Heading>
        ) : (
          users?.map((user) => (
            <Link to={`/profile/${user._id}`}>
              <UserCard key={user._id} user={user}>
                {id !== user._id && <FollowBtn user={user} />}
              </UserCard>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Followed;
