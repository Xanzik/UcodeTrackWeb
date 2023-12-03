import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import MenuBar from "./MenuBar";
import { connect, useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/actions/posts.js";
import { sendResetLink } from "../store/actions/auth.js";
import {
  updateUserProfile,
  changeAvatar,
  getUsers,
} from "../store/actions/user.js";
import { toast } from "react-toastify";

import ProfileCSS from "../styles/Profile.module.css";

const defaultAvatar = "/basic_avatar.jpg";
const URL = `http://localhost:5000`;

const selectUsers = (state) => (state.users ? state.users.users : []);

const Profile = ({ allPosts, message }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const fileInputRef = React.createRef();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector(selectUsers);
  const currentUser = useSelector((state) => state.auth.user);
  const [profileUser, setProfileUser] = useState(null);
  const [formData, setFormData] = useState({
    login: profileUser?.login || "",
    full_name: profileUser?.full_name || "",
  });

  useEffect(() => {
    const foundUser = users.find((user) => {
      const numericUserId = Number(userId);
      return user.id === numericUserId;
    });

    if (foundUser) {
      setProfileUser(foundUser);
      setFormData({
        login: foundUser.login,
        full_name: foundUser.full_name,
      });
    }
  }, [users, userId]);

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

  const userPosts = profileUser
    ? allPosts.filter((post) => post.author_id === profileUser.id)
    : [];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    await dispatch(updateUserProfile(formData, profileUser.id));
    setEditing(false);
    await dispatch(getUsers());
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleAvatarClick = () => {
    if (!isOverlayVisible) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formAvatarData = new FormData();
      formAvatarData.append("file", selectedFile);
      await dispatch(changeAvatar(formAvatarData, profileUser.id));
      await dispatch(updateUserProfile(formData, profileUser.id));
      await dispatch(getUsers());
      event.target.value = null;
    }
  };

  const handleResetPassword = async () => {
    const confirmReset = window.confirm("Do you want to change your password?");
    if (confirmReset) {
      await dispatch(sendResetLink());
    }
  };

  return (
    <div>
      <Header />
      <MenuBar />
      <div className={ProfileCSS["profile-page"]}>
        <div className={ProfileCSS["profile-container"]}>
          {profileUser && (
            <div className={ProfileCSS["profile-info"]}>
              <div className={ProfileCSS["avatar-container"]}>
                <img
                  className={ProfileCSS["avatar-image"]}
                  src={
                    profileUser.profile_picture
                      ? `${URL}/static/${profileUser.profile_picture}`
                      : defaultAvatar
                  }
                  alt="User Avatar"
                />
                {currentUser.id === profileUser.id && (
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
                )}
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
                      <strong> {profileUser.login}</strong>
                    </p>
                    <p>
                      <strong> {profileUser.role}</strong>
                    </p>
                    <p>
                      <strong>
                        Full Name: {profileUser.full_name || "Not specified"}
                      </strong>
                    </p>
                    <p>
                      <strong>
                        Rating: {profileUser.rating ? profileUser.rating : 0}
                      </strong>
                    </p>
                    {currentUser.id === profileUser.id && (
                      <button
                        className={`${ProfileCSS["button"]} ${ProfileCSS["edit-button"]}`}
                        type="button"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {userPosts.length > 0 && (
            <div className={ProfileCSS["user-posts"]}>
              <h2>User Questions </h2>
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
    allPosts: state.posts.posts,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps)(Profile);
