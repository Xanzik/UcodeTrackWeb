import $api from "../http";

export default class PostService {
  static async createPost(title, content, categories) {
    return $api.post("posts", { title, content, categories });
  }

  static async updatePostScreenshot(id, screenshot) {
    return $api.patch(`posts/${id}/screenshot`, screenshot);
  }

  static async getPosts(filters) {
    return $api.get("posts", { params: filters });
  }

  static async getPost(id) {
    return $api.get(`posts/${id}`);
  }

  static async getComments(id) {
    return $api.get(`posts/${id}/comments`);
  }

  static async createComment(id, content, replyCommentID) {
    return $api.post(`posts/${id}/comments`, { content, replyCommentID });
  }

  static async deletePost(id) {
    return $api.delete(`posts/${id}`);
  }

  static async updatePost(id, content, categories) {
    return $api.patch(`posts/${id}`, { content, categories });
  }

  static async createLikePost(id) {
    return $api.post(`posts/${id}/like`);
  }

  static async createDislikePost(id) {
    return $api.post(`posts/${id}/dislike`);
  }

  static async deleteLike(id) {
    return $api.delete(`posts/${id}/like`);
  }

  static async deleteDisLike(id) {
    return $api.delete(`posts/${id}/dislike`);
  }

  static async getDisLikes(id) {
    return $api.get(`posts/${id}/dislike`);
  }

  static async getLikes(id) {
    return $api.get(`posts/${id}/like`);
  }
}
