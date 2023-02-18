import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "redux/actions/profileAction";
import "./follow-btn.scss";

const FollowBtn = ({ user, size }) => {
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  const { auth, profile } = useSelector((state) => state);

  useEffect(() => {
    if (auth.user?.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [auth.user?.following]);

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(follow({ users: profile.users, user, auth }));
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    dispatch(unfollow({ users: profile.users, user, auth }));
  };

  return (
    <>
      {followed ? (
        <button
          className={`follow ${size || ""} unfollowing`}
          onClick={handleUnFollow}
        >
          UnFollow
        </button>
      ) : (
        <button
          className={`follow ${size || ""} following`}
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
