import { AUTH_TYPES } from "redux/types/authTypes";

const initialState = {
  open: false,
  view: "login",
};

const authModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default authModalReducer;
