import mysql from "mysql2/promise";
import ApiError from "../exceptions/api-error.js";
import config from "../utils/config.json" assert { type: "json" };

let connection = mysql.createPool(config);

import PostService from "../service/postService.js";
import commentService from "../service/commentService.js";

class LikeModel {
  constructor(authorID, entityID, entityType, type) {
    this.authorID = authorID;
    this.entityID = entityID;
    this.entityType = entityType;
    this.type = type;
  }

  async getLikesByComment(id, type) {
    try {
      const query = "SELECT * FROM likes WHERE CommentID = ? AND Type = ?";
      const [likes] = await connection.execute(query, [id, type]);
      return likes;
    } catch (error) {
      throw ApiError.BadRequest(
        "Error while getting likes for comment:",
        error
      );
    }
  }

  async getLikesByPost(id, type) {
    try {
      const query = "SELECT * FROM likes WHERE PostID = ? AND Type = ?";
      const [likes] = await connection.execute(query, [id, type]);
      return likes;
    } catch (error) {
      throw ApiError.BadRequest(
        "Error while getting likes for comment:",
        error
      );
    }
  }

  async createLike(id, user, type, entityType) {
    try {
      const entityIDColumn = entityType === "post" ? "PostID" : "CommentID";
      const checkQuery = `SELECT * FROM likes WHERE AuthorID = ? AND ${entityIDColumn} = ? AND Type = ?`;
      const [existingLike] = await connection.execute(checkQuery, [
        user.id,
        id,
        type,
      ]);
      if (existingLike.length > 0) {
        return { message: "Like already exists for this user and entity" };
      }
      const insertQuery = `INSERT INTO likes (AuthorID, ${entityIDColumn}, Type) VALUES (?, ?, ?)`;
      await connection.execute(insertQuery, [user.id, id, type]);
      if (entityType === `post`) {
        if (type === `like`) {
          const post = await PostService.getPostByID(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating + 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [post[0].author_id]);
        } else if (type === `dislike`) {
          const post = await PostService.getPostByID(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating - 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [post[0].author_id]);
        }
      } else if (entityType === `comment`) {
        if (type === `like`) {
          const comment = await commentService.getComment(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating + 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [comment.AuthorID]);
        } else if (type === `dislike`) {
          const comment = await commentService.getComment(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating - 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [comment.AuthorID]);
        }
      }

      return { message: "Like or dislike created successfully" };
    } catch (error) {
      console.error("Error while creating like:", error);
      throw ApiError.BadRequest(
        `Error while creating like for ${entityType}:`,
        error
      );
    }
  }

  async deleteLike(id, user, type, entityType) {
    try {
      const entityIDColumn = entityType === "post" ? "PostID" : "CommentID";
      const query = `DELETE FROM likes WHERE ${entityIDColumn} = ? AND AuthorID = ? AND Type = ?`;
      await connection.execute(query, [id, user.id, type]);
      if (entityType === `post`) {
        if (type === `like`) {
          const post = await PostService.getPostByID(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating - 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [post[0].author_id]);
        } else if (type === `dislike`) {
          const post = await PostService.getPostByID(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating + 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [post[0].author_id]);
        }
      } else if (entityType === `comment`) {
        if (type === `like`) {
          const comment = await commentService.getComment(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating - 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [comment.AuthorID]);
        } else if (type === `dislike`) {
          const comment = await commentService.getComment(id);
          const updateRatingQuery = `UPDATE users SET rating = Rating + 1 WHERE id = ?`;
          await connection.execute(updateRatingQuery, [comment.AuthorID]);
        }
      }
      return { message: "Like or dislike deleted successfully" };
    } catch (error) {
      throw ApiError.BadRequest(
        "Error while deleting like for comment:",
        error
      );
    }
  }
}

export default new LikeModel();
