import React, { useState, useEffect } from "react";
import CommentsCard from "./CommentsCard";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment-display">
      <CommentsCard comment={comment} post={post} commentId={comment._id}>
        <div className="comment-display_reply">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentsCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
        </div>
        {replyCm.length - next > 0 ? (
          <div
            className="comments_show"
            onClick={() => setNext(next + replyCm.length - next)}
          >
            {`See more comments (${replyCm.length - next})`}
          </div>
        ) : (
          replyCm.length > 1 && (
            <div className="comments_show" onClick={() => setNext(1)}>
              Hide comments...
            </div>
          )
        )}
      </CommentsCard>
    </div>
  );
};

export default CommentDisplay;
