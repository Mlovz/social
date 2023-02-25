import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./card-footer.scss";

import { Icon, LikeBtn, ShareDrop } from "components";
import { like, savePost, unlike, unSavePost } from "redux/actions/postAction";
import { Link } from "react-router-dom";
import { clickDropDown } from "helpers/clickDropDown";
import { BASE_URL } from "utils/config";

const CardFooter = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }

    return () => setIsLike(false);
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(like({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unlike({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleSave = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSave = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((item) => item === post._id)) {
      setSaved(true);
    }

    return () => setSaved(false);
  }, [auth.user.saved, post._id]);

  const toogleShareRef = useRef();
  const contentShareRef = useRef();

  useEffect(() => {
    clickDropDown(toogleShareRef, contentShareRef);
  }, [toogleShareRef, contentShareRef]);

  return (
    <div className="card-footer">
      <div className="card-footer_icons">
        <div className="card-footer_icons_icon">
          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`}>
            <Icon type="Comment" />
          </Link>
          <div ref={toogleShareRef} style={{ position: "relative" }}>
            <Icon type="Messanger" />

            <ShareDrop
              ref={contentShareRef}
              url={`${BASE_URL}/post/${post._id}`}
            />
          </div>
        </div>

        {saved ? (
          <Icon
            type="SaveFill"
            className={`${saved ? "anim" : ""}`}
            onClick={handleUnSave}
          />
        ) : (
          <Icon type="Save" onClick={handleSave} />
        )}
      </div>

      <div className="card-footer_info">
        <div>{post.likes.length} likes </div>
        <div>{post.comments.length} comments </div>
      </div>

      <div className="card-footer_content">
        <p className="card-footer_content_text">
          <span className="username">{post.user.username}: &nbsp;</span>
          {post.content.length < 20
            ? post.content
            : readMore
            ? post.content + " "
            : post.content.slice(0, 20) + "..."}
          {post.content.length > 20 && (
            <span onClick={() => setReadMore(!readMore)} className="readMore">
              {readMore ? "hide content" : "read more"}
            </span>
          )}
        </p>
        &nbsp;
      </div>
    </div>
  );
};

export default CardFooter;
