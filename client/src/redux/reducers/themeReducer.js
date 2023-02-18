import { GLOBAL_TYPES } from "redux/types/globalTypes";

const themeReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.THEME:
      return action.payload;

    default:
      return state;
  }
};

export default themeReducer;
