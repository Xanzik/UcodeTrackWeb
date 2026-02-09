import models from '../models/index.js';
import ApiError from '../exceptions/api-error.js';

const CommentModel = models.Comment;
const PostModel = models.Post;

class commentService {
	async createComment(content, user, postId, replyCommentId = null) {
		const post = await PostModel.findByPk(postId);
		if (!post) {
			throw ApiError.BadRequest('Post with provided ID does not exist');
		}
		if (post.toJSON().status !== 'active' && user.role === 'user') {
			throw ApiError.BadRequest('Post is inactive');
		}
		if (replyCommentId) {
			const parentComment = await CommentModel.findByPk(replyCommentId);
			if (!parentComment) {
				throw ApiError.BadRequest(
					'Parent comment with provided ID does not exist',
				);
			}
			if (parentComment.postId !== postId) {
				throw ApiError.BadRequest(
					'The comment does not belong to the current post.',
				);
			}
		}
		return await CommentModel.create({
			content,
			authorId: user.id,
			postId,
			parentCommentId: replyCommentId,
		});
	}

	async getComment(id) {
		return CommentModel.findByPk(id);
	}

	async getRepliesForComment(id) {
		const comment = await CommentModel.findByPk(id);
		if (!comment) {
			throw ApiError.BadRequest(
				'Comment with provided ID does not exist',
			);
		}
		return CommentModel.findAll({
			where: { parentCommentId: id },
		});
	}

	async getCommentsForPost(id) {
		const post = await PostModel.findByPk(id);
		if (!post) {
			throw ApiError.BadRequest('Post with provided ID does not exist');
		}
		return post.getComments();
	}

	async updateComment(id, status, user) {
		const comment = await CommentModel.findByPk(id);
		if (!comment) {
			throw ApiError.BadRequest('Post with provided ID does not exist');
		}
		if (comment.authorId === user.id || user.role === 'admin') {
			return comment.update({
				status,
			});
		}
		throw ApiError.BadRequest('Access denied');
	}

	async blockComment(id) {
		const comment = await CommentModel.findByPk(id);
		if (!comment) {
			throw ApiError.BadRequest('Post with provided ID does not exist');
		}
		return comment.update({
			isBlocked: true,
		});
	}

	async deleteComment(id, user) {
		const comment = await CommentModel.findByPk(id);
		if (!comment) {
			throw ApiError.BadRequest('Post with provided ID does not exist');
		}
		if (comment.authorId === user.id || user.role === 'admin') {
			return comment.destroy();
		}
		throw ApiError.BadRequest('Access denied');
	}
}

export default new commentService();
