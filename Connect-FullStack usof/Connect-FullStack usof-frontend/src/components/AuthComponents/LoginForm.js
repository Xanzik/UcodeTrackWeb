import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginCSS from "../../styles/LoginForm.module.css";
import { login, registration } from "../../store/actions/auth.js";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setUserEmail] = useState("");
  const [name, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoginFormOpen, setLoginFormOpen] = useState(true);
  const [error, setError] = useState(null);

  const message = useSelector((state) => state.auth.message);

  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e) =>
    setPasswordConfirmation(e.target.value);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    await dispatch(login(email, password));
  };

  const handleRegister = async () => {
    if (!email || !password || !passwordConfirmation || !name) {
      setError("Please fill in all fields.");
      return;
    }

    if (passwordConfirmation !== password) {
      setError("Password and PasswordConfirmation must be equal.");
      return;
    }

    if (password.length < 6) {
      setError("The password must contain more than 5 characters.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    await dispatch(registration(email, password, passwordConfirmation, name));
  };

  const handleFormToggle = () => {
    setLoginFormOpen(!isLoginFormOpen);
    setError(null);
  };

  useEffect(() => {
    if (message) {
      console.log(message);
      toast(
        message.toLowerCase() === "success"
          ? "Success registration! Please activate your account!"
          : "Error",
        {
          type:
            message.toLowerCase() === "success"
              ? toast.TYPE.SUCCESS
              : toast.TYPE.ERROR,
        }
      );
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [message, dispatch]);

  return (
    <div>
      <ToastContainer />
      <div className={LoginCSS["logo-container"]}>
        <h1 className={LoginCSS["logo-text"]}>TechVerse QA</h1>
      </div>
      <div className={LoginCSS["scifi-container"]}>
        {isLoginFormOpen ? (
          <form className={LoginCSS["scifi-form"]}>
            <label className={LoginCSS["scifi-label"]}>Email:</label>
            <input
              className={LoginCSS["scifi-input"]}
              type="text"
              value={email}
              onChange={handleUserEmailChange}
            />
            <br />
            <label className={LoginCSS["scifi-label"]}>Password:</label>
            <input
              className={LoginCSS["scifi-input"]}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <button
              onClick={handleLogin}
              className={LoginCSS["scifi-button"]}
              type="button"
            >
              Login
            </button>
            {error && <div className={LoginCSS["error-message"]}>{error}</div>}
          </form>
        ) : (
          <form className={LoginCSS["scifi-form"]}>
            <label className={LoginCSS["scifi-label"]}>Login:</label>
            <input
              className={LoginCSS["scifi-input"]}
              type="text"
              value={name}
              onChange={handleLoginChange}
            />
            <br />
            <label className={LoginCSS["scifi-label"]}>Email:</label>
            <input
              className={LoginCSS["scifi-input"]}
              type="text"
              value={email}
              onChange={handleUserEmailChange}
            />
            <br />
            <label className={LoginCSS["scifi-label"]}>Password:</label>
            <input
              className={LoginCSS["scifi-input"]}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <label className={LoginCSS["scifi-label"]}>
              PasswordConfirmation:
            </label>
            <input
              className={LoginCSS["scifi-input"]}
              type="password"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
            <br />
            <button
              onClick={handleRegister}
              className={LoginCSS["scifi-button"]}
              type="button"
            >
              Register
            </button>
            {error && <div className={LoginCSS["error-message"]}>{error}</div>}
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
