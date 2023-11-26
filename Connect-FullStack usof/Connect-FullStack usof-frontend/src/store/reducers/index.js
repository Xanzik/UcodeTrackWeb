// store/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth.js";
import postsReducer from "./posts.js";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export default rootReducer;
