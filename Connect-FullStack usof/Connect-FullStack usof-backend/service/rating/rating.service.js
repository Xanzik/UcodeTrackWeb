import models from '../../models/index.js';
import ApiError from '../../exceptions/api.error.js';

const UserModel = models.User;

class RatingService {
	static async increase(userId, value = 1) {
		const user = await UserModel.findByPk(userId);
		if (!user) {
			throw new ApiError('User not found');
		}
		user.rating += value;
		await user.save();
		return user.rating;
	}

	static async decrease(userId, value = 1) {
		const user = await UserModel.findByPk(userId);
		if (!user) {
			throw new ApiError('User not found');
		}
		user.rating -= value;
		await user.save();
		return user.rating;
	}
}

export default RatingService;
