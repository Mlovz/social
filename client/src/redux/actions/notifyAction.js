import { api } from "api";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { NOTIFY_TYPES } from "redux/types/notifyTypes";

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await api.post("notify", msg, auth.token);
      socket.emit("createNotify", {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await api.delete(
        `notify/${msg.id}?url=${msg.url}`,
        auth.token
      );

      socket.emit("removeNotify", msg);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await api.get("notifies", token);

    dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
  }
};

export const isReadNotify =
  ({ msg, auth }) =>
  async (dispatch) => {
    dispatch({
      type: NOTIFY_TYPES.UPDATE_NOTIFY,
      payload: { ...msg, isRead: true },
    });

    try {
      await api.patch(`isReadNotify/${msg._id}`, null, auth.token);
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    }
  };

export const deleteAllNotifies = (token) => async (dispatch) => {
  dispatch({
    type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES,
    payload: [],
  });

  try {
    const res = await api.delete("deleteAllNotify", token);
    console.log(res);
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
  }
};
