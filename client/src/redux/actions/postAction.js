import { api } from "api";
import { AUTH_TYPES } from "redux/types/authTypes";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { POST_TYPES } from "redux/types/postTypes";
import { ImageUpload } from "utils/ImageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const createPost =
  ({ content, images, auth, socket }) =>
  async (dispatch) => {
    try {
      let media = await ImageUpload(images);

      const res = await api.post(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({
        type: GLOBAL_TYPES.STATUS,
        payload: false,
      });

      const msg = {
        id: res.data.newPost._id,
        text: "Ваш друг добавил новый пост!",
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        image: media[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));

      return res;
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const deletePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

    try {
      const res = await api.delete(`post/${post._id}`, auth.token);

      const msg = {
        id: post._id,
        text: "Ваш друг добавил новый пост!",
        recipients: res.data.newPost.user.followers,
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING, payload: true });
    const res = await api.get("posts", token);

    if (res.data) {
      dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });
    }

    dispatch({ type: POST_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    dispatch({ type: POST_TYPES.LOADING, payload: false });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];

    const newImages = images.filter((img) => !img.url);
    const oldImages = images.filter((img) => img.url);

    if (
      status.content === content &&
      newImages.length === 0 &&
      oldImages.length === status.images.length
    )
      return;

    // console.log("====================================");

    try {
      if (newImages.length > 0) media = await ImageUpload(newImages);

      const newData = {
        content,
        images: [...oldImages, ...media],
      };

      const { data } = await api.patch(
        `post/${status._id}`,
        newData,
        auth.token
      );

      if (data) {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: data.newPost });
        dispatch({ type: GLOBAL_TYPES.STATUS, payload: false });
        dispatch({
          type: GLOBAL_TYPES.SUCCESS,
          payload: "Пост обновлен!",
        });
        return data;
      }
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const like =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("likePost", newPost);

    try {
      const res = await api.patch(`post/${post._id}/like`, null, auth.token);

      const msg = {
        id: auth.user._id,
        text: "лайкнул ваш пост!",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const unlike =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((item) => item._id !== auth.user._id),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("unLikePost", newPost);

    try {
      const res = await api.patch(`post/${post._id}/unlike`, null, auth.token);

      const msg = {
        id: auth.user._id,
        text: "лайкнул ваш пост!",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const createComment =
  ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    const newItem = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newItem });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };

      const res = await api.post("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

      socket.emit("createComment", newPost);

      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? "Ответил на ваш комментарий"
          : "Оставил вам комментарий",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const updateComment =
  (content, post, comment, auth) => async (dispatch) => {
    const newComments = post.comments.map((item) =>
      item._id === comment._id ? { ...comment, content } : item
    );

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const res = await api.patch(
        `comment/${comment._id}`,
        { content },
        auth.token
      );

      console.log(res);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const likeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = post.comments.map((item) =>
      item._id === comment._id ? newComment : item
    );

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const res = await api.patch(
        `comment/${comment._id}/like`,
        null,
        auth.token
      );
      console.log(res);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const unlikeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: comment.likes.filter((like) => like._id !== auth.user._id),
    };

    const newComments = post.comments.map((item) =>
      item._id === comment._id ? newComment : item
    );

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const res = await api.patch(
        `comment/${comment._id}/unlike`,
        null,
        auth.token
      );
      console.log(res);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const deleteComment =
  ({ post, comment, auth, socket }) =>
  async (dispatch) => {
    const deleteAll = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteAll.find((item) => cm._id === item._id)
      ),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("deleteComment", newPost);

    try {
      deleteAll.forEach((item) => {
        api.delete(`comment/${item._id}`, auth.token);

        const msg = {
          id: item._id,
          text: comment.reply
            ? "Ответил на ваш комментарий"
            : "Оставил вам комментарий",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };

        dispatch(removeNotify({ msg, auth, socket }));
      });
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await api.get(`post/${id}`, auth.token);
        if (res.data) {
          dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
        }
      } catch (err) {
        dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
      }
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = { ...auth.user, saved: [...auth.user.saved, post._id] };

    dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: newPost } });

    try {
      await api.patch(`savePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const unSavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };

    dispatch({ type: AUTH_TYPES.AUTH, payload: { ...auth, user: newPost } });

    try {
      await api.patch(`unSavePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };
