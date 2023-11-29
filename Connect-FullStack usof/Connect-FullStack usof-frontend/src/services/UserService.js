import $api from "../http";

export default class UserService {
  static async getUsers() {
    return $api.get(`users`);
  }

  static async getUser(id) {
    return $api.get(`users/${id}`);
  }

  static async updateUser(data, id) {
    return $api.patch(`users/${id}`, data);
  }

  static async updateAvatar(file) {
    return $api.patch("users/avatar", file);
  }
}
