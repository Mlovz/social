import React, { useEffect, useState } from "react";
import "./posts.scss";

import { Heading, ThumbCard } from "components";

const Posts = ({ id, auth, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    profile.posts.forEach((item) => {
      if (item._id === id) {
        setPosts(item.posts);
      }
    });
  }, [profile.posts, id]);

  return (
    <div className="posts">
      <div className="posts_box">
        {posts.length === 0 ? (
          <Heading type="center">No Posts</Heading>
        ) : (
          posts.map((post) => <ThumbCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Posts;
