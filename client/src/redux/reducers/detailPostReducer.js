import { POST_TYPES } from "redux/types/postTypes";

const detailPostReducer = (state = [], action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload];

    case POST_TYPES.UPDATE_POST:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return state;
  }
};

export default detailPostReducer;
