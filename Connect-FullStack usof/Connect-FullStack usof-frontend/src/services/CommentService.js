import $api from "../http";

export default class CommentService {
  static async getRepliesForComment(id) {
    return $api.get(`comments/${id}/replies`);
  }

  static async updateComment(id) {
    return $api.patch(`comments/${id}`);
  }

  static async deleteComment(id) {
    return $api.delete(`comments/${id}`);
  }

  static async createLikeComment(id) {
    return $api.post(`comments/${id}/like`);
  }

  static async createDislikeComment(id) {
    return $api.post(`comments/${id}/dislike`);
  }

  static async deleteLikeComment(id) {
    return $api.delete(`comments/${id}/like`);
  }

  static async deleteDislikeComment(id) {
    return $api.delete(`comments/${id}/dislike`);
  }

  static async getDisLikes(id) {
    return $api.get(`comments/${id}/dislike`);
  }

  static async getLikes(id) {
    return $api.get(`comments/${id}/like`);
  }
}
