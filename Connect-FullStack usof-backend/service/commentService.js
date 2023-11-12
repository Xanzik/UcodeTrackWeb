import CommentModel from '../models/Comment.js';

import tokenService from './token-service.js';

class commentService {
    async createComment(content, user_id, postId) {
        const Comment = await CommentModel.createComment(content, user_id, postId);
        return Comment;
    }

    async getComment(id) {
        const Comment = await CommentModel.getComment(id);
        return Comment;
    }

    async getLikesByComment(id) {
        const likes = await CommentModel.getLikesByComment(id);
        return likes;
    }

    async createLike(id, token) {
        const user_id = await tokenService.getIDByToken(token);
        const like = await CommentModel.createLike(id, user_id);
        return like;
    }

    async updateComment(id, content) {
        const Comment = await CommentModel.updateComment(id, content);
        return Comment;
    }

    async blockComment(id) {
        const Comment = await CommentModel.blockComment(id);
        return Comment;
    }

    async deleteComment(id) {
        const Comment = await CommentModel.deleteComment(id);
        return Comment;
    }

    async deleteLike(id, token) {
        const user_id = await tokenService.getIDByToken(token);
        const like = await CommentModel.deleteLike(id, user_id);
        return like;
    }
}

export default new commentService();