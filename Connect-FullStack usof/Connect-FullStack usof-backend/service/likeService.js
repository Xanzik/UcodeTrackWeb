import models from '../admin/models/index.js';
import ApiError from '../exceptions/api-error.js';
import RatingService from './ratingService.js';

const LikeModel = models.Like;
const PostModel = models.Post;
const CommentModel = models.Comment;

class LikeService {
	static ALLOWED_TARGETS = { post: 'postId', comment: 'commentId' };
	static ALLOWED_TYPES = ['like', 'dislike'];

	static validateInput(type, targetType) {
		if (!this.ALLOWED_TARGETS[targetType]) {
			throw new ApiError('Invalid target type');
		}
		if (!this.ALLOWED_TYPES.includes(type)) {
			throw new ApiError('Invalid type key');
		}
	}

	async getLikes(id, type) {
		return await LikeModel.getLikesByComment(id, type);
	}

	async getLikesForPost(id, type) {
		return await LikeModel.getLikesByPost(id, type);
	}

	async createLike(user, type, targetType, targetId) {
		LikeService.validateInput(type, targetType);
		const column = LikeService.ALLOWED_TARGETS[targetType];
		const [like, created] = await LikeModel.findOrCreate({
			where: { [column]: targetId, authorId: user.id },
			defaults: { type: type },
		});
		const entity =
			targetType === 'post'
				? await PostModel.findByPk(targetId)
				: await CommentModel.findByPk(targetId);
		if (created) {
			await RatingService.increase(
				entity.authorId,
				type === 'like' ? 1 : -1,
			);
		} else if (like.type !== type) {
			await RatingService.increase(
				entity.authorId,
				type === 'like' ? 1 : -1,
			);
			like.type = type;
			await like.save();
		}
		return like;
	}

	async deleteLike(id, user, type, entityType) {
		return await LikeModel.deleteLike(id, user, type, entityType);
	}
}

export default new LikeService();
