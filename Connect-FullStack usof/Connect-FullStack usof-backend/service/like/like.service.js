import models from '../../models/index.js';
import ApiError from '../../exceptions/api.error.js';
import RatingService from '../rating/rating.service.js';

const LikeModel = models.Like;
const PostModel = models.Post;
const CommentModel = models.Comment;

class LikeService {
	static ALLOWED_TARGETS = { post: 'postId', comment: 'commentId' };
	static ALLOWED_TYPES = ['like', 'dislike'];

	static validateInputType(type) {
		if (!this.ALLOWED_TYPES.includes(type)) {
			throw new ApiError('Invalid type key');
		}
	}

	static validateInputTargetType(targetType) {
		if (!this.ALLOWED_TARGETS[targetType]) {
			throw new ApiError('Invalid target type');
		}
	}

	static async getEntity(targetType, targetId) {
		return targetType === 'post'
			? await PostModel.findByPk(targetId)
			: await CommentModel.findByPk(targetId);
	}

	static async updateRating(entity, like, type, created) {
		if (created) {
			await RatingService.increase(
				entity.authorId,
				type === 'like' ? 1 : -1,
			);
		} else if (like.type !== type) {
			await RatingService.increase(
				entity.authorId,
				like.type === 'like' ? -1 : 1,
			);
			await RatingService.increase(
				entity.authorId,
				type === 'like' ? 1 : -1,
			);
			like.type = type;
			await like.save();
		}
	}

	async getLikes(type, targetType, targetId) {
		LikeService.validateInputType(type);
		LikeService.validateInputTargetType(targetType);
		const entity = await LikeService.getEntity(targetType, targetId);
		if (!entity) {
			throw new ApiError('Entity with id not found');
		}
		const column = LikeService.ALLOWED_TARGETS[targetType];
		return LikeModel.findAll({
			where: {
				[column]: targetId,
				type: type,
			},
		});
	}

	async createLike(user, type, targetType, targetId) {
		LikeService.validateInputType(type);
		LikeService.validateInputTargetType(targetType);
		const column = LikeService.ALLOWED_TARGETS[targetType];
		const [like, created] = await LikeModel.findOrCreate({
			where: { [column]: targetId, authorId: user.id },
			defaults: { type: type },
		});
		const entity = await LikeService.getEntity(targetType, targetId);
		await LikeService.updateRating(entity, like, type, created);
		return like;
	}

	async deleteLike(user, type, targetType, targetId) {
		LikeService.validateInputType(type);
		LikeService.validateInputTargetType(targetType);
		const like = await LikeModel.findByPk(targetId);
		if (!like) {
			throw new ApiError('Like with id not found');
		}
		const entity = await LikeService.getEntity(targetType, targetId);
		await like.destroy();
		await RatingService.increase(entity.authorId, type === 'like' ? -1 : 1);
		return like;
	}
}

export default new LikeService();
