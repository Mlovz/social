import { combineReducers } from "redux";
import auth from "./authReducer";
import authModal from "./authModalReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";

export default combineReducers({
  auth,
  authModal,
  alert,
  theme,
  profile,
});
