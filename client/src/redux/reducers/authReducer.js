import { AUTH_TYPES } from "redux/types/authTypes";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.AUTH:
      return action.payload;

    default:
      return state;
  }
};

export default authReducer;
