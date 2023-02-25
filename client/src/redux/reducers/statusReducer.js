import { GLOBAL_TYPES } from "redux/types/globalTypes";

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.STATUS:
      return action.payload;

    default:
      return state;
  }
};

export default statusReducer;
