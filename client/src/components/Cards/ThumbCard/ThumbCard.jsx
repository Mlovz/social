import React from "react";
import "./thumb.scss";

import { Icon } from "components";
import { Link } from "react-router-dom";

const ThumbCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} className="thumb-card">
      <div className="thumb-card_box">
        <img src={post.images[0].url} alt="" />

        <div className="thumb-card_menu">
          <div>
            <Icon type="Favorite" />
            <span>{post.likes.length}</span>
          </div>
          <div>
            <Icon type="Comment" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ThumbCard;
