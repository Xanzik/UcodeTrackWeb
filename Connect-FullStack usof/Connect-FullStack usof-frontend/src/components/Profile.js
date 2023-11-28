// Profile.js
import React, { useEffect } from "react";
import Header from "./Header";
import MenuBar from "./MenuBar";
import { connect, useDispatch } from "react-redux";
import { getPosts } from "../store/actions/posts.js";
import "../styles/Profile.css";

const defaultAvatar = "basic_avatar.jpg";

const Profile = ({ currentUser, allPosts }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const userPosts = currentUser
    ? allPosts.filter((post) => post.author_id === currentUser.id)
    : [];
  return (
    <div className="profile-page">
      <Header />
      <MenuBar />
      <div className="profile-container">
        <h1>Welcome, {currentUser ? currentUser.login : "Guest"}</h1>
        {currentUser && (
          <div className="profile-info">
            <div>
              <img
                src={
                  currentUser.profile_picture
                    ? currentUser.profile_picture
                    : defaultAvatar
                }
                alt="User Avatar"
              />
            </div>
            <div>
              <p>
                <strong>Login:</strong> {currentUser.login}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>ID:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Full Name:</strong>{" "}
                {currentUser.full_name || "Not specified"}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {currentUser.rating !== undefined ? currentUser.rating : 0}
              </p>
              <p>
                <strong>Role:</strong> {currentUser.role}
              </p>
            </div>
          </div>
        )}
        {userPosts.length > 0 && (
          <div className="user-posts">
            <h2>Posts:</h2>
            <ul>
              {userPosts.map((post) => (
                <li key={post.id}>{post.Title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    allPosts: state.posts.posts,
  };
};

export default connect(mapStateToProps)(Profile);
