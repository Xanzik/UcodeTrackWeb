// postService.js
import PostModel from '../models/Post.js';
import tokenService from './token-service.js';
import commentService from './commentService.js';

class PostService {
  async getAllPosts(filters) {
    const posts = await PostModel.getAllPosts(filters);
    return posts;
  }

  async getPostByID(id) {
    const post = await PostModel.getPostByID(id);
    return post;
  }

  async getSortedPost(sortBy) {
    const posts = await PostModel.getSortedPost(sortBy);
    return posts;
  }

  async getFilteredPosts(filters) {
    const posts = await PostModel.getFilteredPost(filters);
    return posts;
  }

  async getCommentsForPost(id) {
    const comments = await PostModel.getCommentsForPost(id);
    return comments;
  }

  async getCategoriesForPost(id) {
    const categories = await PostModel.getCategoriesForPost(id);
    return categories;
  }

  async createPost(title, content, categories, token) {
    const user_id = await tokenService.getIDByToken(token);
    const post = await PostModel.createPost(title, content, categories, user_id);
    return post;
  }

  async createComment(content, token, postId) {
    const user_id = await tokenService.getIDByToken(token);
    const post = await commentService.createComment(content, user_id, postId);
    return post;
  }

  async updatePost(postId, newData, categories) {
    const post = await PostModel.updatePost(postId, newData);
    await PostModel.updatePostCategories(postId, categories);
    return post;
  }

  async deletePost(id) {
    const post = await PostModel.deletePost(id);
    return post;
  }

  async getLikesForPost(id) {
    const likes = await PostModel.getLikesForPost(id);
    return likes;
  }

  async blockPost(id) {
    const post = await PostModel.blockPost(id);
    return post;
  }

  async createLike(post_id, token) {
    const user_id = await tokenService.getIDByToken(token);
    const like = await PostModel.createLike(post_id, user_id);
    return like;
  }

  async deleteLike(post_id, token) {
    const user_id = await tokenService.getIDByToken(token);
    const like = await PostModel.deleteLike(post_id, user_id);
    return like;
  }
}

export default new PostService();
