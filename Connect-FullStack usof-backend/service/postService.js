// postService.js
import PostModel from '../models/Post.js';
import commentService from './commentService.js';

class PostService {
  async getAllPosts(filters, user) {
    const posts = await PostModel.getAllPosts(filters, user);
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

  async createPost(title, content, categories, user) {
    const post = await PostModel.createPost(title, content, categories, user);
    return post;
  }

  async createComment(content, postId, user) {
    const post = await commentService.createComment(content, user, postId);
    return post;
  }

  async updatePost(postId, newData, categories, user) {
    const post = await PostModel.updatePost(postId, newData, user);
    await PostModel.updatePostCategories(postId, categories);
    return post;
  }

  async deletePost(id, user) {
    const post = await PostModel.deletePost(id, user);
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

  async createLike(post_id, user) {
    const like = await PostModel.createLike(post_id, user);
    return like;
  }

  async deleteLike(post_id, user) {
    const like = await PostModel.deleteLike(post_id, user);
    return like;
  }
}

export default new PostService();
