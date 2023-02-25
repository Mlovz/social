import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "redux/actions/postAction";
import "./post.scss";

import { PostCard } from "components";
import Spinner from "components/Spinner/Spinner";

const Post = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { auth, detailPost } = useSelector((state) => state);

  useEffect(() => {
    if (id && auth.token) {
      dispatch(getPost({ detailPost, id, auth }));

      if (detailPost.length > 0) {
        const newPost = detailPost.filter((post) => post._id === id);
        setPost(newPost);
      }
    }
  }, [id, auth, dispatch, detailPost]);

  return (
    <div className="post">
      {post.length === 0 && <Spinner />}

      {post.map((item) => (
        <PostCard key={item._id} post={item} />
      ))}
    </div>
  );
};

export default Post;
