import { api } from "api";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { SUGGESTIONS_TYPES } from "redux/types/suggestionsTypes";

export const getSuggestions = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGESTIONS_TYPES.LOADING, payload: true });

    const res = await api.get("suggestionsUser", token);

    dispatch({ type: SUGGESTIONS_TYPES.GET_USERS, payload: res.data.users });

    dispatch({ type: SUGGESTIONS_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.data.msg });
  }
};
