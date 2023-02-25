import React, { useState, useEffect } from "react";

import CommentDisplay from "components/Cards/CommentsCard/CommentDisplay";
import "./comments.scss";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);

  const [next, setNext] = useState(2);

  useEffect(() => {
    const newComments = post.comments.filter((comment) => !comment.reply);
    setComments(newComments);
    setShowComments(newComments.slice(newComments.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const replyC = post.comments.filter((item) => item.reply);
    setReplyComments(replyC);
  }, [post.comments]);

  return (
    <div className="comments">
      {showComments?.map((comment) => (
        <CommentDisplay
          key={comment._id}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}

      {comments.length - next > 0 ? (
        <div
          className="comments_show"
          onClick={() => setNext(next + comments.length - next)}
        >
          {`See more comments (${comments.length - next})`}
        </div>
      ) : (
        comments.length > 2 && (
          <div className="comments_show" onClick={() => setNext(2)}>
            Hide comments...
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
