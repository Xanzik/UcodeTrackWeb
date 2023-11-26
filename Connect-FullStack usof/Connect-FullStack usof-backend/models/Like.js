import mysql from 'mysql2/promise';
import ApiError from '../exceptions/api-error.js';
import config from '../utils/config.json' assert { type: "json" };

let connection = mysql.createPool(config);


class LikeModel {
    constructor(authorID, entityID, entityType, type) {
      this.authorID = authorID;
      this.entityID = entityID;
      this.entityType = entityType;
      this.type = type;
    }

    async getLikesByComment(id, type, entityType) {
        try {
            const query = 'SELECT * FROM likes WHERE EntityID = ? AND EntityType = ? AND Type = ?';
            const [likes] = await connection.execute(query, [id, entityType, type]);
            return likes;
        } catch (error) {
            throw ApiError.BadRequest('Error while getting likes for comment:', error);
        }
    }

    async createLike(id, user, type, entityType) {
        try {
            const entityIDColumn = entityType === 'post' ? 'PostID' : 'CommentID';
            const checkQuery = `SELECT * FROM likes WHERE AuthorID = ? AND ${entityIDColumn} = ? AND Type = ?`;
            const [existingLike] = await connection.execute(checkQuery, [user.id, id, type]);
            if (existingLike.length > 0) {
                return { message: 'Like already exists for this user and entity' };
            }
            const insertQuery = `INSERT INTO likes (AuthorID, ${entityIDColumn}, Type) VALUES (?, ?, ?)`;
            await connection.execute(insertQuery, [user.id, id, type]);
        
            return { message: 'Like or dislike created successfully' };
        } catch (error) {
            console.error('Error while creating like:', error);
            throw ApiError.BadRequest(`Error while creating like for ${entityType}:`, error);
        }        
    }

    async deleteLike(id, user, type, entityType) {
        try {
            const entityIDColumn = entityType === 'post' ? 'PostID' : 'CommentID';
            const query = `DELETE FROM likes WHERE ${entityIDColumn} = ? AND AuthorID = ? AND Type = ?`;
            await connection.execute(query, [id, user.id, type]);
            return { message: 'Like or dislike deleted successfully' };
        } catch (error) {
            throw ApiError.BadRequest('Error while deleting like for comment:', error);
        }
    }
}
  
export default new LikeModel;
