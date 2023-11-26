// user_dto.js

export default class UserDTO {
  constructor(id, login, full_name, email, profile_picture, rating, role) {
    this.id = id;
    this.login = login;
    this.full_name = full_name;
    this.email = email;
    this.profile_picture = profile_picture;
    this.rating = rating;
    this.role = role;
  }
}
