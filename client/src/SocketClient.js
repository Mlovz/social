import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TYPES } from "redux/types/authTypes";
import { NOTIFY_TYPES } from "redux/types/notifyTypes";
import { POST_TYPES } from "redux/types/postTypes";
import audioSrc from "./audio/zvuk.mp3";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
};

const SocketClient = () => {
  const dispatch = useDispatch();
  const { auth, socket, notify } = useSelector((state) => state);
  const audioRef = useRef();

  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket]);

  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
      if (!notify.isSound) audioRef?.current?.play();
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "Instagram"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch, notify.sound]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });

    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioSrc} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
