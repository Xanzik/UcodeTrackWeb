import LikeModel from '../models/Like.js';

class likeService {
    async getLikes(id, type, entityType) {
        const likes = await LikeModel.getLikesByComment(id, type, entityType);
        return likes;
    }

    async createLike(id, user, type, entityType) {
        console.log(type);
        console.log(entityType);
        console.log(id);
        console.log(user);
        const like = await LikeModel.createLike(id, user, type, entityType);
        return like;
    }

    async deleteLike(id, user, type, entityType) {
        const like = await LikeModel.deleteLike(id, user, type, entityType);
        return like;
    }
}

export default new likeService();