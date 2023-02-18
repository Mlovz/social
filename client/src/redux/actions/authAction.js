import { api } from "api";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { AUTH_TYPES } from "../types/authTypes";

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.LOADING, payload: true });

    const res = await api.post("login", userData);

    if (res.data) {
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          user: res.data.user,
          token: res.data.access_token,
          isAuth: true,
        },
      });

      localStorage.setItem("token", res.data.access_token);

      dispatch({
        type: AUTH_TYPES.MODAL,
        payload: { open: false, view: "login" },
      });
    }

    dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ERROR,
      payload: err.response.data.msg,
    });
    dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.LOADING, payload: true });

    const res = await api.post("register", userData);
    if (res.data) {
      dispatch({
        type: AUTH_TYPES.MODAL,
        payload: { open: true, view: "login" },
      });
    }
    dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ERROR,
      payload: err.response.data.msg,
    });
    dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
  }
};

export const refreshToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: true });

      const res = await api.post("refresh_token");

      if (res.data) {
        dispatch({
          type: AUTH_TYPES.AUTH,
          payload: {
            user: res.data.user,
            token: res.data.access_token,
            isAuth: true,
          },
        });

        localStorage.setItem("token", res.data.access_token);
      }

      dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBAL_TYPES.ERROR,
        payload: err.response.data.msg,
      });
      dispatch({ type: GLOBAL_TYPES.LOADING, payload: false });
    }
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await api.post("logout");

    if (res.data) {
      dispatch({ type: AUTH_TYPES.AUTH, payload: {} });
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ERROR,
      payload: err.response.data.msg,
    });
  }
};
