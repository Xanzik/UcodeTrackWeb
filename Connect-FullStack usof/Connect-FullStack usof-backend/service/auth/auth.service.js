import ApiError from '../../exceptions/api.error.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../../models/user.model.js';
import mailService from '../mail/mail.service.js';
import tokenService from './token.service.js';
import { UserDTO } from '../../dto/user.dto.js';
import { Op } from 'sequelize';

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

		const isUserExists = await UserModel.findOne({
			where: {
				[Op.or]: [{ login }, { email }],
			},
			attributes: ['login', 'email'],
		});
		if (isUserExists) {
			throw ApiError.BadRequest('User already exists');
		}
		const hashedPassword = await bcrypt.hash(password, 3);
		const activationLink = uuidv4();
		const user = await UserModel.create({
			login,
			email,
			password: hashedPassword,
			activationLink,
		});
		await mailService.sendActivationMail(
			email,
			`${process.env.CLIENT_URL}/activate/${activationLink}`,
		);
		const tokens = await tokenService.generateTokens({ email: email });
		await user.update({
			refreshToken: tokens.refreshToken,
		});
		return {
			...tokens,
			user: new UserDTO(user),
			status: 0,
			message: 'User registered successfully',
		};
	}

	async login(userData) {
		const { email, password } = userData;
		const user = await UserModel.findOne({ where: { email: email } });
		if (!user) {
			throw ApiError.BadRequest('User not found');
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw ApiError.BadRequest('Incorrect password');
		}
		if (!user.activate) {
			throw ApiError.BadRequest('User must activate his account');
		}
		const tokens = await tokenService.generateTokens({
			email: email,
			id: user.id,
			login: user.login,
			role: user.role,
		});
		const user_dto = new UserDTO(user);
		user.update({
			refreshToken: tokens.refreshToken,
		});
		// await tokenService.saveToken(email, tokens.refreshToken);
		return {
			...tokens,
			user: user_dto,
			status: 0,
			message: 'The user logged in successfully',
		};
	}

	async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const user = await tokenService.validateRefreshToken(refreshToken);
		if (!user) {
			throw ApiError.UnauthorizedError();
		}
		const tokenExists = await tokenService.findToken(refreshToken);
		if (!tokenExists) {
			throw ApiError.UnauthorizedError();
		}
		const refresh_user = await UserModel.findByPk(user.id);
		const tokens = await tokenService.generateTokens({
			email: user.email,
			id: user.id,
			login: user.login,
			role: user.role,
		});
		const userDto = new UserDTO(refresh_user);
		await refresh_user.update({
			refreshToken: tokens.refreshToken,
		});
		return {
			...tokens,
			user: userDto,
			status: 0,
			message: 'The token refreshed successfully',
		};
	}

	async passwordReset(id) {
		try {
			const user = await UserModel.findByPk(id);
			const resetLink = await tokenService.generateResetToken({
				email: user.email,
			});

			await mailService.sendResetPasswordMail(
				user.email,
				`${process.env.CLIENT_URL}/api/auth/password-reset/${resetLink}`,
			);
			await user.update({
				reset_link: resetLink,
			});
			return {
				status: 0,
				message: 'A password reset email has been sent',
			};
		} catch (error) {
			throw ApiError.BadRequest('Error sending reset:', error);
		}
	}

	async passwordResetConfirm(newPassword, token) {
		const user = await UserModel.findOne({ where: { reset_link: token } });
		const hashedPassword = await bcrypt.hash(newPassword, 3);
		await user.update({
			password: hashedPassword,
		});
		return { status: 0, message: 'Password was changed' };
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({
			where: { activation_link: activationLink },
		});
		if (!user) {
			throw ApiError.BadRequest('Link not found');
		}
		await user.update({
			activate: 1,
		});
		return {
			status: 0,
			message: 'The user activated the account successfully',
		};
	}
}

export default new AuthService();
