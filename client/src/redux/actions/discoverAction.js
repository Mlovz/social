import { api } from "api";
import { DISCOVER_TYPES } from "redux/types/discoverTypes";
import { GLOBAL_TYPES } from "redux/types/globalTypes";

export const getDiscoverPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: DISCOVER_TYPES.LOADING, payload: true });

    const res = await api.get("post_discover", token);
    if (res.data) {
      dispatch({ type: DISCOVER_TYPES.GET_POSTS, payload: res.data });
      dispatch({ type: DISCOVER_TYPES.LOADING, payload: false });
    }
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
    dispatch({ type: DISCOVER_TYPES.LOADING, payload: false });
  }
};
