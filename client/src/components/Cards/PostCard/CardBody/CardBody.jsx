import { Carousel } from "components";
import React from "react";
import "./card-body.scss";

const CardBody = ({ post }) => {
  return (
    <div className="card-body">
      <Carousel className="post" photos={post.images} />
    </div>
  );
};

export default CardBody;
