import React, { useEffect, useState } from "react";
import Header from "./Header";
import MenuBar from "./MenuBar";
import { connect, useDispatch } from "react-redux";
import { getPosts } from "../store/actions/posts.js";
import { sendResetLink } from "../store/actions/auth.js";
import { updateUserProfile, changeAvatar } from "../store/actions/user.js";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import ProfileCSS from "../styles/Profile.module.css";

const defaultAvatar = "basic_avatar.jpg";
const URL = `http://localhost:5000`;

const Profile = ({ currentUser, allPosts, message }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.createRef();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    login: currentUser.login || "",
    full_name: currentUser.full_name || "",
  });

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast(message.toLowerCase() === "success" ? "Success!" : "Error", {
        type:
          message.toLowerCase() === "success"
            ? toast.TYPE.SUCCESS
            : toast.TYPE.ERROR,
      });
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [message, dispatch]);

  const userPosts = currentUser
    ? allPosts.filter((post) => post.author_id === currentUser.id)
    : [];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUserProfile(formData, currentUser.id));
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleAvatarClick = () => {
    if (!isOverlayVisible) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatch(changeAvatar(formData));
      event.target.value = null;
    }
  };

  const handleResetPassword = () => {
    const confirmReset = window.confirm("Do you want to change your password?");
    if (confirmReset) {
      dispatch(sendResetLink());
    }
  };

  return (
    <div>
      <Header />
      <MenuBar />
      <div className={ProfileCSS["profile-page"]}>
        <div className={ProfileCSS["profile-container"]}>
          <h1>Welcome, {currentUser ? currentUser.login : "Guest"}</h1>
          {currentUser && (
            <div className={ProfileCSS["profile-info"]}>
              <div className={ProfileCSS["avatar-container"]}>
                <img
                  className={ProfileCSS["avatar-image"]}
                  src={
                    currentUser.profile_picture
                      ? `${URL}/static/${currentUser.profile_picture}`
                      : defaultAvatar
                  }
                  alt="User Avatar"
                />
                <div
                  className={ProfileCSS["change-avatar-overlay"]}
                  onMouseOver={() => setOverlayVisible(true)}
                  onMouseOut={() => setOverlayVisible(false)}
                  onClick={handleAvatarClick}
                >
                  {isOverlayVisible ? "Change Avatar" : null}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                {editing ? (
                  <form className={ProfileCSS["form-container"]}>
                    <label>
                      Login:
                      <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Full Name:
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                      />
                    </label>
                    <button
                      className={`${ProfileCSS["button"]} ${ProfileCSS["reset-password-button"]}`}
                      type="button"
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </button>
                    <ToastContainer />
                    <button
                      className={`${ProfileCSS["button"]} ${ProfileCSS["save-button"]}`}
                      type="button"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className={`${ProfileCSS["button"]} ${ProfileCSS["cancel-button"]}`}
                      type="button"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <p>
                      <strong>Login:</strong> {currentUser.login}
                    </p>
                    <p>
                      <strong>Role:</strong> {currentUser.role}
                    </p>
                    <p>
                      <strong>Full Name:</strong>{" "}
                      {currentUser.full_name || "Not specified"}
                    </p>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {currentUser.rating ? currentUser.rating : 0}
                    </p>
                    <button
                      className={`${ProfileCSS["button"]} ${ProfileCSS["edit-button"]}`}
                      type="button"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {userPosts.length > 0 && (
            <div className={ProfileCSS["user-posts"]}>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    allPosts: state.posts.posts,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps)(Profile);
