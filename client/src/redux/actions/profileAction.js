import { api } from "api";
import { AUTH_TYPES } from "redux/types/authTypes";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { PROFILE_TYPES } from "redux/types/profileTypes";
import { ImageUpload } from "utils/ImageUpload";

export const getProfileUser =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

        const res = await api.get(`user/${id}`, auth.token);

        if (res.data) {
          dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        }
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBAL_TYPES.ERROR,
          payload: err.response.data.msg,
        });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      }
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
    console.log(res);
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
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const follow =
  ({ users, user, auth }) =>
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
      console.log(res);
    } catch (err) {}
  };

export const unfollow =
  ({ users, user, auth }) =>
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
      console.log(res);
    } catch (err) {}
  };
