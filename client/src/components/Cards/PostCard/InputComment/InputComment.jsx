import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "redux/actions/postAction";
import "./input-comment.scss";

const InputComment = ({ post, onReply, setOnReply, children }) => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { auth, socket } = useSelector((state) => state);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    console.log(newComment);

    dispatch(createComment({ post, newComment, auth, socket }));
    setContent("");
    if (setOnReply) return setOnReply(false);
  };

  return (
    <form className="input-comment" onSubmit={onSubmit}>
      {children}

      <input
        placeholder="Add your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button>Post</button>
    </form>
  );
};

export default InputComment;
