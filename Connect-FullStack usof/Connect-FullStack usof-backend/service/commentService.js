import CommentModel from "../models/Comment.js";

class commentService {
  async createComment(content, user, postId, replyCommentID) {
    const Comment = await CommentModel.createComment(
      content,
      user,
      postId,
      replyCommentID
    );
    return Comment;
  }

  async getComment(id) {
    const Comment = await CommentModel.getComment(id);
    return Comment;
  }

  async getRepliesForComment(id) {
    const Comment = await CommentModel.getRepliesForComment(id);
    return Comment;
  }

  async updateComment(id, status, user) {
    const Comment = await CommentModel.updateComment(id, status, user);
    return Comment;
  }

  async blockComment(id) {
    const Comment = await CommentModel.blockComment(id);
    return Comment;
  }

  async deleteComment(id, user) {
    const Comment = await CommentModel.deleteComment(id, user);
    return Comment;
  }
}

export default new commentService();
