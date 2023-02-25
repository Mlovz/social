const { SUGGESTIONS_TYPES } = require("redux/types/suggestionsTypes");

const initialState = {
  users: [],
  loading: false,
};

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTIONS_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGESTIONS_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default suggestionsReducer;
