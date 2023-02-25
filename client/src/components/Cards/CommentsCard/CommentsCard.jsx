import React, { useState, useEffect } from "react";
import { Avatar, LikeBtn, PostMenu } from "components";
import { Link } from "react-router-dom";
import "./comments-card.scss";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  likeComment,
  unlikeComment,
  updateComment,
} from "redux/actions/postAction";
import InputComment from "../PostCard/InputComment/InputComment";

const CommentsCard = ({ comment, post, commentId, children }) => {
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const dispatch = useDispatch();
  const { auth, socket } = useSelector((state) => state);

  // // Likes
  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unlikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUpdateComment = () => {
    if (comment.content === content) return setOnEdit(false);

    dispatch(updateComment(content, post, comment, auth));
    setOnEdit(false);
  };

  const handleOnReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const handleDelete = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, comment, auth, socket }));
    }
  };

  const style = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment-card" style={style}>
      <Link to={`/profile/${comment.user._id}`}>
        <Avatar src={comment.user.avatar} size="small" />
        <h6>{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        {onEdit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          <div>
            {comment.tag && comment.tag._id !== comment.user._id && (
              <Link
                to={`/profile/${comment.tag._id}`}
                className="comment_content_tagname"
              >
                @{comment.tag.username}
              </Link>
            )}
            <span>
              {content.length < 100
                ? content
                : readMore
                ? content + " "
                : content.slice(0, 100) + "..."}
            </span>
            {content.length > 100 && (
              <span className="readMore" onClick={() => setReadMore(!readMore)}>
                {readMore ? "hide content" : "read more"}
              </span>
            )}
          </div>
        )}

        <div className="comment_content_footer">
          <span className="likes">{comment.likes.length} likes</span>
          <span className="time">{moment(comment.createdAt).fromNow()}</span>

          {onEdit ? (
            <>
              <span className="reply cansel" onClick={() => setOnEdit(false)}>
                cansel
              </span>
              <span className="reply" onClick={handleUpdateComment}>
                update
              </span>
            </>
          ) : (
            <span className="reply" onClick={handleOnReply}>
              {onReply ? "cansel" : "reply"}
            </span>
          )}

          <div className="comment_like">
            <LikeBtn
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
          </div>

          <div className="comment_menu">
            <PostMenu
              auth={auth}
              comment={comment}
              handleEdit={() => setOnEdit(true)}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`}>
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentsCard;
