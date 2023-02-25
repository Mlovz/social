import React, { useRef, useEffect } from "react";
import "./card-header.scss";

import { Avatar, Icon, PostMenu } from "components";
import { clickDropDown, closeDropDown } from "helpers/clickDropDown";
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { deletePost } from "redux/actions/postAction";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "utils/config";
import UserCard from "components/Cards/UserCard/UserCard";

const CardHeader = ({ post }) => {
  const toogleRef = useRef();
  const contentRef = useRef();
  const dispatch = useDispatch();
  const { auth, socket } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    clickDropDown(toogleRef, contentRef);
  }, [toogleRef, contentRef]);

  const handleEditPost = () => {
    dispatch({ type: GLOBAL_TYPES.STATUS, payload: { ...post, onEdit: true } });
    closeDropDown(toogleRef, contentRef);
  };

  const handleDelete = () => {
    dispatch(deletePost({ post, auth, socket }));
    return navigate("/");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    return dispatch({
      type: GLOBAL_TYPES.SUCCESS,
      payload: "Скопировано в буфер обмена.",
    });
  };

  return (
    <div className="card-header">
      <div className="card-header_ava">
        <UserCard user={post.user} />
      </div>

      <div className="card-header_icon">
        <PostMenu
          handleEdit={handleEditPost}
          handleDelete={handleDelete}
          handleCopy={handleCopyLink}
          post={post}
          auth={auth}
        />
      </div>
    </div>
  );
};

export default CardHeader;
