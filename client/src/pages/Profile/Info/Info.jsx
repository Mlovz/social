import React, { useEffect, useState } from "react";
import "./info.scss";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  EditProfile,
  FollowBtn,
  Followed,
  Modal,
} from "components";
import { getProfileUser } from "redux/actions/profileAction";

const Info = () => {
  const dispatch = useDispatch();
  const { auth, profile } = useSelector((state) => state);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [followers, setFollowers] = useState("");

  useEffect(() => {
    if (auth?.token) {
      if (id === auth.user?._id) {
        setUser([auth.user]);
      } else {
        dispatch(getProfileUser({ users: profile.users, id, auth }));
        const newUser = profile.users?.filter((user) => user._id === id);
        setUser(newUser);
      }
    }
  }, [id, auth, dispatch, profile.users]);

  const onClose = () => {
    setOpen(false);
    setFollowers("");
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <div className="">
      {user?.map((item) => (
        <div className="info">
          <Avatar src={item?.avatar} size="big" />

          <div className="info_body">
            <div className="info_body_header">
              <div>
                <h2>65</h2>
                <span>Posts</span>
              </div>
              <div
                className="info_follow"
                onClick={() => setFollowers("followers")}
              >
                <h2>{item.followers.length}</h2>
                <span>Followers</span>
              </div>
              <div
                className="info_follow"
                onClick={() => setFollowers("following")}
              >
                <h2>{item.following.length}</h2>
                <span>Following</span>
              </div>
            </div>
            <div className="info_body_content">
              <h2 className="fs_24">{item.fullname}</h2>
              <span className="fs_14">@{item.username}</span>
              <a href={item.website} target="_blank">
                {item.website}
              </a>
              <a href={`tel:${item.mobile}`}>{item.mobile}</a>
              <h3>{item.address}</h3>
              <p className="fs_16">{item.story}</p>
            </div>
          </div>

          {auth.user?._id === item._id ? (
            <Button className="edit" onClick={onOpen}>
              Edit Profile
            </Button>
          ) : (
            <FollowBtn user={item} />
          )}

          <Modal open={open || !!followers} onClose={onClose} type="medium">
            {open && <EditProfile setOpen={setOpen} />}
            {followers === "followers" && (
              <Followed
                id={auth.user?._id}
                users={item.followers}
                text="Followers"
              />
            )}
            {followers === "following" && (
              <Followed
                id={auth.user?._id}
                users={item.following}
                text="Following"
              />
            )}
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default Info;
