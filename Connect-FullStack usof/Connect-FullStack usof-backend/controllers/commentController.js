import commentService from "../service/commentService.js";
import likeService from "../service/likeService.js";

class commentController {
  getComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const comment = await commentService.getComment(id);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };

  getRepliesForComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const comment = await commentService.getRepliesForComment(id);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };

  getLikesByComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const likes = await likeService.getLikes(id, "like");
      return res.json(likes);
    } catch (e) {
      next(e);
    }
  };

  getDislikesByComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const likes = await likeService.getLikes(id, "dislike");
      return res.json(likes);
    } catch (e) {
      next(e);
    }
  };

  createLike = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const user = req.user;
      const like = await likeService.createLike(id, user, "like", "comment");
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  deleteLike = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const user = req.user;
      const comment = await likeService.deleteLike(id, user, "like", "comment");
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };

  createDislike = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const user = req.user;
      const like = await likeService.createLike(id, user, "dislike", "comment");
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  deleteDislike = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const user = req.user;
      const comment = await likeService.deleteLike(
        id,
        user,
        "dislike",
        "comment"
      );
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const status = req.body.status;
      const user = req.user;
      const comment = await commentService.updateComment(id, status, user);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };

  blockComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const comment = await commentService.blockComment(id);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const id = req.params.comment_id;
      const user = req.user;
      const comment = await commentService.deleteComment(id, user);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  };
}

export default new commentController();
