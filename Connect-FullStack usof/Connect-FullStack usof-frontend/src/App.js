// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "./store/actions/auth.js";

import LoginPage from "./components/AuthComponents/LoginPage.js";
import Page from "./components/Page.js";
import Profile from "./components/Profile.js";
import CreatePost from "./components/PostComponents/CreatePost.js";

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
    return <LoginPage />;
  }
  // <Route path="/:page" element={<PostsListWithPagination />} />
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
