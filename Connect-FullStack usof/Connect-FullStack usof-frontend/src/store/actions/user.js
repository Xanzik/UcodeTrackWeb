import UserService from "../../services/UserService";

export const getUsers = () => async (dispatch) => {
  try {
    const response = await UserService.getUsers();
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Edit failed", error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const response = await UserService.getUser(id);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Edit failed", error);
  }
};

export const updateUserProfile = (data, id) => async (dispatch) => {
  try {
    const response = await UserService.updateUser(data, id);
    dispatch({ type: "SET_USER", payload: response.data.user });
  } catch (error) {
    console.error("Edit failed", error);
  }
};

export const changeAvatar = (file) => async (dispatch) => {
  try {
    await UserService.updateAvatar(file);
    dispatch({ type: "SET_MESSAGE", payload: "Success" });
  } catch (error) {
    dispatch({ type: "SET_MESSAGE", payload: "Error" });
  }
};
