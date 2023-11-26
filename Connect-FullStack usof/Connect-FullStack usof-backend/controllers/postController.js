import postService from "../service/postService.js";
import likeService from "../service/likeService.js";

import ApiError from "../exceptions/api-error.js";

class PostController {
  getAllPosts = async (req, res, next) => {
    try {
      const filters = {
        category: req.query.category,
        dateFrom: req.query.dateFrom,
        dateTo: req.query.dateTo,
        status: req.query.status,
        sortBy: req.query.sortBy,
      };
      const user = req.user;
      const posts = await postService.getAllPosts(filters, user);
      return res.json(posts);
    } catch (e) {
      next(e);
    }
  };

  getPostByID = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const post = await postService.getPostByID(postId);
      if (!post) {
        throw ApiError.BadRequest("Post with this id does not exist");
      }
      return res.json(post);
    } catch (e) {
      next(e);
    }
  };

  getCommentsForPost = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const comments = await postService.getCommentsForPost(postId);
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  };

  getCategoriesForPost = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const comments = await postService.getCategoriesForPost(postId);
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  };

  createComment = async (req, res, next) => {
    try {
      const user = req.user;
      const postId = req.params.post_id;
      const { content } = req.body;
      const post = await postService.createComment(content, postId, user);
      return res.json(post);
    } catch (e) {
      next(e);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { title, content, categories } = req.body;
      const user = req.user;
      const post = await postService.createPost(
        title,
        content,
        categories,
        user
      );
      return res.json(post);
    } catch (e) {
      next(e);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const user = req.user;
      const postId = req.params.post_id;
      if (user.role === "user") {
        const { content, categories } = req.body;
        const updatedPost = await postService.updatePost(
          postId,
          { content },
          categories,
          user
        );
        return res.json(updatedPost);
      } else {
        const { status, categories } = req.body;
        const updatedPost = await postService.updatePost(
          postId,
          { status },
          categories,
          user
        );
        return res.json(updatedPost);
      }
    } catch (e) {
      next(e);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const user = req.user;
      const postId = req.params.post_id;
      const post = await postService.deletePost(postId, user);
      return res.json(post);
    } catch (e) {
      next(e);
    }
  };

  blockPost = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const post = await postService.blockPost(postId);
      return res.json(post);
    } catch (e) {
      next(e);
    }
  };

  getLikesForPost = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const like = await likeService.getLikes(postId, "like", "post");
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  createLike = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const user = req.user;
      const like = await likeService.createLike(postId, user, "like", "post");
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  deleteLike = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const user = req.user;
      const like = await likeService.deleteLike(postId, user, "like", "post");
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  getDislikesForPost = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const like = await likeService.getLikes(postId, "dislike", "post");
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  createDislike = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const user = req.user;
      const like = await likeService.createLike(
        postId,
        user,
        "dislike",
        "post"
      );
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };

  deleteDislike = async (req, res, next) => {
    try {
      const postId = req.params.post_id;
      const user = req.user;
      const like = await likeService.deleteLike(
        postId,
        user,
        "dislike",
        "post"
      );
      return res.json(like);
    } catch (e) {
      next(e);
    }
  };
}

export default new PostController();
