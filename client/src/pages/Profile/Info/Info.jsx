import { useEffect, useState } from "react";
import "./info.scss";

import {
  Avatar,
  Button,
  EditProfile,
  FollowBtn,
  Followed,
  Modal,
} from "components";

const Info = ({ auth, dispatch, profile, id }) => {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [followers, setFollowers] = useState("");

  useEffect(() => {
    if (id === auth.user?._id) {
      setUser([auth.user]);
    } else {
      const newUser = profile.users?.filter((user) => user._id === id);
      setUser(newUser);
    }
  }, [id, auth, profile.users]);

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
        <div className="info" key={item._id}>
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
              <a href={item.website} target="_blank" rel="noreferrer">
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
