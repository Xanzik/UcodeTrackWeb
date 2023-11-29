// controllers/authController.js
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";
import userService from "../service/user-service.js";

class AuthController {
  register = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Error validation", errors.array()));
      }
      const { login, password, passwordConfirmation, email } = req.body;
      const result = await userService.register({
        login,
        password,
        passwordConfirmation,
        email,
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

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await userService.login({ email, password });
      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const result = await userService.refresh(refreshToken);
      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  passwordReset = async (req, res, next) => {
    try {
      const user = req.user;
      const result = await userService.passwordReset(user.email);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  passwordResetConfirm = async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      const resetLink = req.params.confirm_token;
      const result = await userService.passwordResetConfirm(
        newPassword,
        resetLink
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  };

  activate = async (req, res) => {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.API_URL);
    } catch (error) {
      console.error("Error activating in:", error);
      res.status(500).json({ message: "Failed to activate" });
    }
  };
}

export default new AuthController();
