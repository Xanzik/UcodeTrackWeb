import userService from "../service/user-service.js";
import ApiError from "../exceptions/api-error.js";

class UserController {
  getUsers = async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  };

  getUsersByID = async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const user = await userService.getUserByID(userId);
      if (!user) {
        throw ApiError.BadRequest(`User with this id does not exist`);
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  };

  createNewUser = async (req, res, next) => {
    try {
      const { login, password, passwordConfirmation, email, role } = req.body;
      const result = await userService.createNewUser({
        login,
        password,
        passwordConfirmation,
        email,
        role,
      });
      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  updateUserAvatar = async (req, res, next) => {
    try {
      const file = req.files.file;
      const user = req.user;
      const result = await userService.updateUserAvatar(file, user);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const userDataToUpdate = req.body;
      const result = await userService.updateUser(userId, userDataToUpdate);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const result = await userService.deleteUser(userId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
