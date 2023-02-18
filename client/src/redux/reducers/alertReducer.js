import { GLOBAL_TYPES } from "../types/globalTypes";

const initialState = {
  error: "",
  success: "",
  loading: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GLOBAL_TYPES.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GLOBAL_TYPES.SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case GLOBAL_TYPES.GLOBAL:
      return action.payload;

    default:
      return state;
  }
};

export default alertReducer;
