// user_dto.js

export class UserDTO {
	constructor(user) {
		this.id = user.id;
		this.login = user.login;
		this.full_name = user.full_name;
		this.email = user.email;
		this.profile_picture = user.profile_picture;
		this.rating = user.rating;
		this.role = user.role;
	}
}

export class UpdateUserDTO {
	constructor(user) {
		this.id = user.id;
		this.login = user.login;
		this.full_name = user.full_name;
		this.profile_picture = user.profile_picture;
		this.reset_link = user.reset_link;
	}
}
