// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "./store/actions/auth.js";

import LoginForm from "./components/AuthComponents/LoginForm.js";
import Page from "./components/Page.js";
import Profile from "./components/Profile.js";
import CreatePost from "./components/PostComponents/CreatePost.js";
import PasswordResetPage from "./components/AuthComponents/PasswordResetPage.js";
import PostPage from "./components/PostComponents/PostPage.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) {
    return <div>loading</div>;
  }
  if (!isAuth) {
    return <LoginForm />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/api/auth/password-reset/:token"
          element={<PasswordResetPage />}
        />
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
