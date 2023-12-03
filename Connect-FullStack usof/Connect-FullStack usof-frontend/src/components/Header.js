// Header.js
import React, { useState } from "react";
import { connect } from "react-redux";

import HeaderCSS from "../styles/Page.module.css";

const URL = `http://localhost:5000`;

const defaultAvatar = "/basic_avatar.jpg";

const Header = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className={HeaderCSS["header"]}>
      <div className={HeaderCSS["service-name"]}>TechVerse QA</div>
      <input
        type="text"
        placeholder="Search..."
        className={HeaderCSS["search-bar"]}
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
      {currentUser ? (
        <div className={HeaderCSS["user-info"]}>
          <span>{currentUser.role}</span>
          <span>{currentUser.login}</span>
          <img
            src={
              currentUser.profile_picture
                ? `${URL}/static/${currentUser.profile_picture}`
                : defaultAvatar
            }
            alt="User Avatar"
          />
        </div>
      ) : (
        <div className={HeaderCSS["user-info"]}>Not logged in</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(Header);
