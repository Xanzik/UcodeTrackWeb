// controllers/auth.controller.js
import authService from '../service/auth/auth.service.js';

class AuthController {
	register = async (req, res, next) => {
		try {
			const { login, password, passwordConfirmation, email } = req.body;
			const result = await authService.register({
				login,
				password,
				passwordConfirmation,
				email,
			});
			res.cookie('refreshToken', result.refreshToken, {
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
			const result = await authService.login({ email, password });
			res.cookie('refreshToken', result.refreshToken, {
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
			const token = await authService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	};

	refresh = async (req, res, next) => {
		try {
			const { refreshToken } = req.cookies;
			const result = await authService.refresh(refreshToken);
			res.cookie('refreshToken', result.refreshToken, {
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
			const result = await authService.passwordReset(user.id);
			return res.json(result);
		} catch (e) {
			next(e);
		}
	};

	passwordResetConfirm = async (req, res, next) => {
		try {
			const { newPassword } = req.body;
			const resetLink = req.params.confirm_token;
			const result = await authService.passwordResetConfirm(
				newPassword,
				resetLink,
			);
			return res.json(result);
		} catch (e) {
			next(e);
		}
	};

	activate = async (req, res) => {
		try {
			const activationLink = req.params.link;
			console.log('Activation link: ', activationLink);
			await authService.activate(activationLink);
			return res
				.status(200)
				.json({ message: 'Activation link activated' });
		} catch (error) {
			console.error('Error activating in:', error);
			res.status(500).json({ message: 'Failed to activate' });
		}
	};
}

export default new AuthController();
