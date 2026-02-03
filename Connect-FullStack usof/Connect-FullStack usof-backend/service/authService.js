import ApiError from '../exceptions/api-error.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../admin/models/User_s.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import { UserDTO } from '../dto/user_dto.js';

class AuthService {
	async register(userData) {
		const { login, password, passwordConfirmation, email } = userData;
		if (!login || !password || !passwordConfirmation || !email) {
			throw ApiError.BadRequest(`Please provide all required fields`);
		}

		if (password !== passwordConfirmation) {
			throw ApiError.BadRequest(
				'Password and password confirmation do not match',
			);
		}

		if (await User.checkExistingUser(login, email)) {
			throw ApiError.BadRequest('User already exists');
		}

		try {
			const hashedPassword = await bcrypt.hash(password, 3);
			const activationLink = uuidv4();
			const user = await UserModel.create({
				login,
				email,
				password: hashedPassword,
				activation_link: activationLink,
			});
			// await User.save(login, hashedPassword, email, activationLink);
			await mailService.sendActivationMail(
				email,
				`${process.env.API_URL}/api/auth/activate/${activationLink}`,
			);
			const tokens = await tokenService.generateTokens({ email: email });
			await tokenService.saveToken(email, tokens.refreshToken);
			// const user = await User.findUserByEmail(email);
			// const user_dto = new UserDTO(user);
			return {
				...tokens,
				user: new UserDTO(user),
				status: 0,
				message: 'User registered successfully',
			};
		} catch (error) {
			console.log(error.message);
			throw ApiError.BadRequest('Error registering user:', error);
		}
	}
}

export default new AuthService();
