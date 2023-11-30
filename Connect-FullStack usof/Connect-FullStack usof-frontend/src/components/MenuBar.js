import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/auth";

import MenuBarCSS from "../styles/MenuBar.module.css";

const MenuBar = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div className={MenuBarCSS["menu-bar"]}>
      <Link to="/">Main Page</Link>
      <Link to="/profile">My Profile</Link>
      <Link to="/create-post">Create Post</Link>
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
