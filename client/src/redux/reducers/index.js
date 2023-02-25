import { combineReducers } from "redux";
import auth from "./authReducer";
import authModal from "./authModalReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePosts from "./postReducer";
import detailPost from "./detailPostReducer";
import discover from "./discoverReducer";
import suggestion from "./suggestionsReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import message from "./messageReducer";

export default combineReducers({
  auth,
  authModal,
  alert,
  theme,
  profile,
  homePosts,
  status,
  detailPost,
  discover,
  suggestion,
  socket,
  notify,
  message,
});
