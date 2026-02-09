import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const UserModel = models.User;

class TokenService {
	async generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m',
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	async generateResetToken(payload) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '24h',
		});
	}

	async validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		} catch {
			return null;
		}
	}

	async validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		} catch {
			return null;
		}
	}

	async removeToken(refreshToken) {
		const user = await UserModel.findOne({
			where: { refresh_token: refreshToken },
		});
		return await user.update({ refresh_token: null });
	}

	async findToken(refreshToken) {
		const user = await UserModel.findOne({
			where: { refresh_token: refreshToken },
		});
		return !!user;
	}
}

export default new TokenService();
