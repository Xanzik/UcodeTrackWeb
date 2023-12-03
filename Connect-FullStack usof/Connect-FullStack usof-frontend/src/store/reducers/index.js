// store/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth.js";
import postsReducer from "./posts.js";
import categoryReducer from "./category.js";
import usersReducer from "./users.js";
import commentsReducer from "./comments.js";
import postLikesReducer from "./postLikes.js";
import commentLikesReducer from "./commentLikes.js";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  categories: categoryReducer,
  users: usersReducer,
  comments: commentsReducer,
  postLikes: postLikesReducer,
  commentLikes: commentLikesReducer,
});

export default rootReducer;
