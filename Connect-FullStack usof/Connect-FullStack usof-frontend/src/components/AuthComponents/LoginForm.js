import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginCSS from "../../styles/LoginForm.module.css";
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

  const handleRegister = async () => {
    dispatch(registration(email, password, passwordConfirmation, name));
  };

  const handleFormToggle = () => {
    setLoginFormOpen(!isLoginFormOpen);
  };

  return (
    <div>
      <div className={LoginCSS["logo-container"]}>
        <h1 className={LoginCSS["logo-text"]}>TechVerse QA</h1>
      </div>
      <div className={LoginCSS["scifi-container"]}>
        {isLoginFormOpen ? (
          <form className={LoginCSS["scifi-form"]}>
            <label className={LoginCSS["scifi-label"]}>
              Email:
              <input
                className={LoginCSS["scifi-input"]}
                type="text"
                value={email}
                onChange={handleUserEmailChange}
              />
            </label>
            <br />
            <label className={LoginCSS["scifi-label"]}>
              Password:
              <input
                className={LoginCSS["scifi-input"]}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <button
              onClick={handleLogin}
              className={LoginCSS["scifi-button"]}
              type="button"
            >
              Login
            </button>
          </form>
        ) : (
          <form className={LoginCSS["scifi-form"]}>
            <label className={LoginCSS["scifi-label"]}>
              Login:
              <input
                className={LoginCSS["scifi-input"]}
                type="text"
                value={name}
                onChange={handleLoginChange}
              />
            </label>
            <br />
            <label className={LoginCSS["scifi-label"]}>
              Email:
              <input
                className={LoginCSS["scifi-input"]}
                type="text"
                value={email}
                onChange={handleUserEmailChange}
              />
            </label>
            <br />
            <label className={LoginCSS["scifi-label"]}>
              Password:
              <input
                className={LoginCSS["scifi-input"]}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <label className={LoginCSS["scifi-label"]}>
              PasswordConfirmation:
              <input
                className={LoginCSS["scifi-input"]}
                type="password"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
              />
            </label>
            <br />
            <button
              onClick={handleRegister}
              className={LoginCSS["scifi-button"]}
              type="button"
            >
              Register
            </button>
          </form>
        )}
        <br />
        <button
          className={LoginCSS["scifi-toggle-button"]}
          onClick={handleFormToggle}
        >
          {isLoginFormOpen ? "Still not registered?" : "Back to login"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
