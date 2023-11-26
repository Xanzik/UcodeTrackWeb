import AuthService from "../../services/AuthService.js";
import { API_URL } from "../../http";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    console.log("Login function called"); // Добавь эту строку
    const response = await AuthService.login(email, password);
    localStorage.setItem("token", response.data.accessToken);
    dispatch({ type: "SET_USER", payload: response.data.user });
    dispatch({ type: "SET_AUTH_STATUS", payload: true });
    console.log("Login successful", response.data);
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const registration =
  (email, password, passwordConfirmation, login) => async (dispatch) => {
    try {
      const response = await AuthService.registration(
        email,
        password,
        passwordConfirmation,
        login
      );
      localStorage.setItem("token", response.data.accessToken);
      dispatch({ type: "SET_USER", payload: response.data.user });
      dispatch({ type: "SET_AUTH_STATUS", payload: true });
      console.log("Register successful", response.data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_AUTH_STATUS", payload: false });
  } catch (error) {
    console.error("Logout error", error);
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING_STATUS", payload: true });
  try {
    const response = await axios.get(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    dispatch({ type: "SET_USER", payload: response.data.user });
    dispatch({ type: "SET_AUTH_STATUS", payload: true });
  } catch (error) {
    console.error("Auth check error", error);
  } finally {
    dispatch({ type: "SET_LOADING_STATUS", payload: false });
  }
};
