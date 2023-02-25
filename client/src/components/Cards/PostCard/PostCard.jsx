import React from "react";
import "./post-card.scss";

import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import CardHeader from "./CardHeader/CardHeader";
import Comments from "./Comments/Comments";
import InputComment from "./InputComment/InputComment";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
