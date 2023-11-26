import mysql from 'mysql2/promise';
import ApiError from '../exceptions/api-error.js';
import config from '../utils/config.json' assert { type: "json" };

import postService from '../service/postService.js';

let connection = mysql.createPool(config);

class CommentModel {
    constructor(id, author, publishDate, content) {
        this.id = id;
        this.author = author;
        this.publishDate = publishDate;
        this.content = content;
    }

    async createComment(content, user, postId) {
        try {
            const postExists = await postService.getPostByID(postId);
            if (!postExists[0].id) {
                throw ApiError.BadRequest('Post not found');
            }
            if((user.role === 'user' && postExists[0].status === 'active') || user.role === 'admin') {
                const [result] = await connection.execute(
                    'INSERT INTO comments (AuthorID, Content, PostID) VALUES (?, ?, ?)',
                    [user.id, content, postId]
                );
                const commentId = result.insertId;
                return commentId;
            }
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
    
    async updateComment(id, status, user) {
        try {
            const comment = await this.getComment(id);
            if(comment.AuthorID === user.id || user.role === admin) {
                const query = 'UPDATE comments SET status = ? WHERE id = ?';
                await connection.execute(query, [status, id]);
                const updatedComment = await this.getComment(id);
                return updatedComment;
            }
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
    
    async deleteComment(id, user) {
        try {
            const comment = await this.getComment(id);
            if(comment.AuthorID === user.id || user.role === admin) {
                await connection.execute('DELETE FROM comments WHERE id = ?', [id]);
                return { message: 'Comment deleted successfully' };
            }
        } catch (error) {
            throw ApiError.BadRequest('Error while deleting comment:', error);
        }
    }
}
  
export default new CommentModel;
  