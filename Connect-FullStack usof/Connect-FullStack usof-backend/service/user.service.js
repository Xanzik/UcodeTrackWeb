import UserModel from '../models/user.model.js';
import mailService from './mail.service.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import bcrypt from 'bcrypt';
import tokenService from './token.service.js';
import ApiError from '../exceptions/api.error.js';
import { UpdateUserDTO, UserDTO } from '../dto/user.dto.js';
import APIError from '../exceptions/api.error.js';

class UserService {
	async getUsers() {
		const users = await UserModel.scope('public').findAll();
		return users.map((user) => new UserDTO(user));
	}

	async getUserByID(id) {
		const user = await UserModel.findByPk(Number(id));
		if (!user) {
			throw new ApiError('User not found');
		}
		return new UserDTO(user);
	}

	async createNewUser(userData) {
		const { login, password, passwordConfirmation, email, role } = userData;

		if (!login || !password || !passwordConfirmation || !email || !role) {
			throw ApiError.BadRequest(`Please provide all required fields`);
		}

		if (password !== passwordConfirmation) {
			throw ApiError.BadRequest(
				'Password and password confirmation do not match',
			);
		}

		// if (await checkExistingUser(Login, email)) {
		//   throw ApiError.BadRequest("User already exists");
		// }

		try {
			const hashedPassword = await bcrypt.hash(password, 3);
			const activationLink = uuidv4();
			const user = await UserModel.create({
				login,
				email,
				password: hashedPassword,
				activation_link: activationLink,
			});
			await mailService.sendActivationMail(
				email,
				`${process.env.API_URL}/api/auth/activate/${activationLink}`,
			);
			const tokens = await tokenService.generateTokens({ email });
			await user.update({
				refreshToken: tokens.refreshToken,
			});
			return {
				...tokens,
				user: user.email,
				status: 0,
				message: 'User registered successfully',
			};
		} catch (error) {
			throw ApiError.BadRequest('Error registering user:', error);
		}
	}

	async updateUserAvatar(file, userId) {
		try {
			const path = './static';
			if (!fs.existsSync(path)) {
				fs.mkdirSync(path);
			}
			const avatarName = uuidv4() + '.jpg';
			file.mv(process.env.FILE_PATH + '\\' + avatarName);
			const user = await UserModel.findByPk(userId);
			await user.update({
				profile_picture: avatarName,
			});
			return new UserDTO(user);
		} catch (e) {
			console.error(e);
		}
	}

	async updateUser(id, userData) {
		const user = await UserModel.findByPk(Number(id));
		if (!user) {
			throw APIError.BadRequest('User does not exist');
		}
		const dto = new UpdateUserDTO(userData);
		await user.update(dto);
		return new UserDTO(user);
	}

	async deleteUser(id) {
		const deletedCount = await UserModel.destroy({
			where: {
				id: Number(id),
			},
		});
		if (deletedCount === 0) {
			throw ApiError.NotFound('User not found');
		}
		return true;
	}
}

export default new UserService();
