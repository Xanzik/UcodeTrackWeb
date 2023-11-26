// AuthService.js

import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return $api.post("auth/login", { email, password });
  }

  static async registration(email, password, passwordConfirmation, login) {
    return $api.post("auth/register", {
      email,
      password,
      passwordConfirmation,
      login,
    });
  }

  static async logout() {
    return $api.post("auth/logout");
  }
}
