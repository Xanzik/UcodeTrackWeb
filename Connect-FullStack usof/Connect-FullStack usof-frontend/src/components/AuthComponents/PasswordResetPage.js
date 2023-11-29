import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "../../store/actions/auth.js";

import "react-toastify/dist/ReactToastify.css";

const PasswordResetPage = ({ message }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState(null);
  const { token } = useParams();

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(token, newPassword));
  };

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

  useEffect(() => {
    if (message.toLowerCase() === "success") {
      navigate("/");
    }
  }, [navigate, message]);

  return (
    <div>
      <h2>Password Reset Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Change Password</button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
  };
};

export default connect(mapStateToProps)(PasswordResetPage);
