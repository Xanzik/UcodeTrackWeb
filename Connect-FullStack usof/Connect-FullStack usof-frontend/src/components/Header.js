// Header.js
import React from "react";
import { connect } from "react-redux";

import "../styles/Page.css";

const defaultAvatar = "basic_avatar.jpg";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="service-name">TechVerse QA</div>
      <input type="text" placeholder="Search..." className="search-bar" />
      {currentUser ? (
        <div className="user-info">
          <span>{currentUser.role}</span>
          <span>{currentUser.login}</span>
          <img
            src={currentUser.avatar ? currentUser.avatar : defaultAvatar}
            alt="User Avatar"
          />
        </div>
      ) : (
        <div className="user-info">Not logged in</div>
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
