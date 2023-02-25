import { api } from "api";
import { Heading, ThumbCard } from "components";
import Spinner from "components/Spinner/Spinner";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import "./saved-posts.scss";

const SavedPosts = ({ auth }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);

    api
      .get("getSavePosts", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
      });
  }, [auth.token]);

  console.log(savePosts);

  return (
    <div className="saved">
      {load ? (
        <Spinner />
      ) : savePosts.length === 0 ? (
        <Heading type="center">No Posts</Heading>
      ) : (
        <div className="saved_posts">
          {savePosts?.map((post) => (
            <ThumbCard post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
