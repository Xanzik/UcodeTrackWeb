import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "../../styles/LoginForm.css";

import { login, registration } from "../../store/actions/auth.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setUserEmail] = useState("");
  const [name, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoginFormOpen, setLoginFormOpen] = useState(true);

  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e) =>
    setPasswordConfirmation(e.target.value);

  const handleLogin = async () => {
    dispatch(login(email, password));
  };

  const handleFormToggle = () => {
    setLoginFormOpen(!isLoginFormOpen);
  };

  return (
    <div className="scifi-container">
      {isLoginFormOpen ? (
        <form className="scifi-form">
          {/* Добавляем класс к форме */}
          <label className="scifi-label">
            Email:
            <input
              className="scifi-input"
              type="text"
              value={email}
              onChange={handleUserEmailChange}
            />
          </label>
          <br />
          <label className="scifi-label">
            Password:
            <input
              className="scifi-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button onClick={handleLogin} className="scifi-button" type="button">
            Login
          </button>
        </form>
      ) : (
        <form className="scifi-form">
          <label className="scifi-label">
            Login:
            <input
              className="scifi-input"
              type="text"
              value={name}
              onChange={handleLoginChange}
            />
          </label>
          <br />
          <label className="scifi-label">
            Email:
            <input
              className="scifi-input"
              type="text"
              value={email}
              onChange={handleUserEmailChange}
            />
          </label>
          <br />
          <label className="scifi-label">
            Password:
            <input
              className="scifi-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <label className="scifi-label">
            PasswordConfirmation:
            <input
              className="scifi-input"
              type="password"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
          </label>
          <br />
          <button
            onClick={() =>
              registration(email, password, passwordConfirmation, login)
            }
            className="scifi-button"
            type="button"
          >
            Register
          </button>
        </form>
      )}
      <br />
      <button className="scifi-toggle-button" onClick={handleFormToggle}>
        {isLoginFormOpen ? "Still not registered?" : "Back to login"}
      </button>
    </div>
  );
};

export default LoginForm;
