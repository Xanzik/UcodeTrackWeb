import mysql from 'mysql2/promise';
import ApiError from '../exceptions/api-error.js';
import config from '../utils/config.json' assert { type: "json" };

let connection = mysql.createPool(config);

class CommentModel {
    constructor(id, author, publishDate, content) {
        this.id = id;
        this.author = author;
        this.publishDate = publishDate;
        this.content = content;
    }

    async createComment(content, user_id, postId) {
        try {
            const [result] = await connection.execute(
                'INSERT INTO comments (AuthorID, Content, isBlocked, PostID) VALUES (?, ?, ?, ?)',
                [user_id, content, false, postId]
            );
            const commentId = result.insertId;
            return commentId;
        } catch (error) {
            throw ApiError.BadRequest('Error while creating a comment for post:', error);
        }
    }

    async getComment(id) {
        try {
            const query = 'SELECT * FROM comments WHERE id = ?';
            const [result] = await connection.execute(query, [id]);
    
            if (!result || !result[0]) {
                throw ApiError.BadRequest('Error by finding comment: invalid id');
            }
    
            return result[0];
        } catch (error) {
            throw ApiError.BadRequest('Error by finding comment:', error);
        }
    }

    async getLikesByComment(id) {
        try {
            const query = 'SELECT * FROM likes WHERE EntityID = ? AND EntityType = "comment"';
            const [likes] = await connection.execute(query, [id]);
            return likes;
        } catch (error) {
            throw ApiError.BadRequest('Error while getting likes for comment:', error);
        }
    }

    async createLike(id, userId) {
        try {    
            console.log(id);
            const query = `
                INSERT INTO likes (AuthorID, EntityID, EntityType, Type)
                VALUES (?, ?, ?, ?)
            `;
            await connection.execute(query, [userId, id, 'comment', 'like']);
        
            return { message: 'Like created successfully' };
        } catch (error) {
            throw ApiError.BadRequest('Error while creating like for comment:', error);
        }
    }
    
    async updateComment(id, content) {
        try {
            const query = 'UPDATE comments SET content = ? WHERE id = ?';
            await connection.execute(query, [content, id]);
            const updatedComment = await this.getComment(id);
            return updatedComment;
        } catch (error) {
            throw ApiError.BadRequest('Error by updating comment:', error);
        }
    }

    async blockComment(id) {
        try {
            const query = 'UPDATE comments SET isBlocked = true WHERE id = ?';
            await connection.execute(query, [id]);
            return { message: 'Comment blocked successfully' };
        } catch (error) {
            throw new Error('Failed to block comment');
        }
    }
    
    
    async deleteComment(id) {
        try {
            await this.getComment(id);
            await connection.execute('DELETE FROM comments WHERE id = ?', [id]);
            return { message: 'Comment deleted successfully' };
        } catch (error) {
            throw ApiError.BadRequest('Error while deleting comment:', error);
        }
    }

    async deleteLike(id, userId) {
        try {
            const comment = await this.getComment(id);
            if (comment.AuthorID !== userId) {
                throw ApiError.BadRequest('Only the author can delete the like for this comment.');
            }
            const query = 'DELETE FROM likes WHERE EntityID = ? AND EntityType = "comment"';
            await connection.execute(query, [id]);
   
            return { message: 'Like deleted successfully' };
        } catch (error) {
            throw ApiError.BadRequest('Error while deleting like for comment:', error);
        }
    }
    
}
  
export default new CommentModel;
  