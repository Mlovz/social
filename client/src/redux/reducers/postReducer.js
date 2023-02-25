const { POST_TYPES } = require("redux/types/postTypes");

const initialState = {
  posts: [],
  loading: false,
  result: 0,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case POST_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };

    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default postReducer;
