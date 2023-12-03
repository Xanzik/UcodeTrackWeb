import LikeModel from "../models/Like.js";

class likeService {
  async getLikes(id, type) {
    const likes = await LikeModel.getLikesByComment(id, type);
    return likes;
  }

  async getLikesForPost(id, type) {
    const likes = await LikeModel.getLikesByPost(id, type);
    return likes;
  }

  async createLike(id, user, type, entityType) {
    const like = await LikeModel.createLike(id, user, type, entityType);
    return like;
  }

  async deleteLike(id, user, type, entityType) {
    const like = await LikeModel.deleteLike(id, user, type, entityType);
    return like;
  }
}

export default new likeService();
