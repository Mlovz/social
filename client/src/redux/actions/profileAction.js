import { api } from "api";
import { AUTH_TYPES } from "redux/types/authTypes";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { PROFILE_TYPES } from "redux/types/profileTypes";
import { ImageUpload } from "utils/ImageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const getProfileUser =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id });
    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

      const res = await api.get(`user/${id}`, auth.token);
      const res1 = await api.get(`user_posts/${id}`, auth.token);

      if (res.data && res1.data) {
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({
          type: PROFILE_TYPES.GET_POSTS,
          payload: { ...res1.data, page: 2, _id: id },
        });
      }
      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBAL_TYPES.ERROR,
        payload: err.response.data.msg,
      });
      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    }
  };

export const updateUser = (userData, avatar, auth) => async (dispatch) => {
  try {
    let media;

    if (avatar) media = await ImageUpload([avatar]);

    const res = await api.patch(
      "user",
      {
        ...userData,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    );

    if (res.data) {
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: GLOBAL_TYPES.SUCCESS,
        payload: "Профиль обновлен!",
      });
    }

    return res;
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const follow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...user, followers: [...item.followers, auth.user] };
        }
      });
    }

    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      const res = await api.patch(`user/${user._id}/follow`, null, auth.token);
      socket.emit("follow", res.data.newUser);

      const msg = {
        id: auth.user._id,
        text: "Подписался на ваши обновления",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {}
  };

export const unfollow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: user.followers.filter((item) => item._id !== auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...user,
            followers: item.followers.filter(
              (item) => item._id !== auth.user._id
            ),
          };
        }
      });
    }
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: auth.user.following.filter(
            (item) => item._id !== newUser._id
          ),
        },
      },
    });

    try {
      const res = await api.patch(
        `user/${user._id}/unfollow`,
        null,
        auth.token
      );
      socket.emit("unFollow", res.data.newUser);

      const msg = {
        id: auth.user._id,
        text: "Подписался на ваши обновления",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {}
  };
