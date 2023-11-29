// store/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth.js";
import postsReducer from "./posts.js";
import categoryReducer from "./category.js";
import usersReducer from "./users.js";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  categories: categoryReducer,
  users: usersReducer,
});

export default rootReducer;
