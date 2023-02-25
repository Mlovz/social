import React, { useRef, useEffect } from "react";
import { Icon } from "components";
import { clickDropDown } from "helpers/clickDropDown";
import "./post-menu.scss";

const PostMenu = ({
  post,
  comment,
  handleEdit,
  handleDelete,
  handleCopy,
  auth,
}) => {
  const toogleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    clickDropDown(toogleRef, contentRef);
  }, [toogleRef, contentRef]);

  return (
    <>
      {post?.user?._id === auth.user?._id ||
      comment?.user?._id === auth.user?._id ||
      typeof post === "object" ? (
        <div className="post-menu" ref={toogleRef}>
          <Icon type="Dots" />
          <ul className="post-menu_list" ref={contentRef}>
            {(post?.user?._id === auth.user?._id ||
              comment?.user?._id === auth.user?._id) && (
              <li onClick={handleEdit}>
                <Icon type="Edit" />
                <span>{comment ? "Edit comment" : "Edit post"}</span>
              </li>
            )}

            {typeof post === "object" && (
              <li onClick={handleCopy}>
                <Icon type="Copy" />
                <span>Copy link</span>
              </li>
            )}

            {(post?.user._id === auth.user?._id ||
              comment?.user._id === auth.user?._id) && (
              <li onClick={handleDelete}>
                <Icon type="Trash" />
                <span>Delete</span>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PostMenu;
