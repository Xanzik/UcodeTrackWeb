import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/auth";

import MenuBarCSS from "../styles/MenuBar.module.css";

const MenuBar = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
  };

  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className={MenuBarCSS["menu-bar"]}>
      <Link to="/">Main Page</Link>
      <Link to={`/profile/${currentUser.id}`}>My Profile</Link>
      <Link to="/create-post">Ask a Question</Link>
      <button
        onClick={handleLogout}
        className={MenuBarCSS["scifi-button"]}
        type="button"
      >
        Logout
      </button>
    </div>
  );
};

export default MenuBar;
