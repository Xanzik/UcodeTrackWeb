import mysql from "mysql2/promise";
import ApiError from "../exceptions/api-error.js";
import config from "../utils/config.json" assert { type: "json" };
import categoryService from "../service/categoryService.js";

let connection = mysql.createPool(config);

class PostModel {
  async getAllPosts(filters, user) {
    try {
      let query = `
      SELECT *
      FROM posts
      WHERE 1=1
    `;

      const queryParams = [];

      if (filters.dateFrom) {
        query += ` AND updatedAt >= ?`;
        queryParams.push(filters.dateFrom);
      } else {
        query += ` AND updatedAt >= ?`;
        queryParams.push("1970-00-00");
      }

      if (filters.dateTo) {
        query += ` AND updatedAt <= ?`;
        queryParams.push(filters.dateTo);
      } else {
        query += ` AND updatedAt <= ?`;
        queryParams.push("3000-00-00");
      }

      if (filters.status && user.role === "admin") {
        query += ` AND status = ?`;
        queryParams.push(filters.status);
      } else {
        query += ` AND (status = 'active' OR (status = "inactive" AND author_id = ${user.id}))`;
      }

      if (filters.category && filters.category.length > 0) {
        const categoryPlaceholders = filters.category
          .map((category) =>
            category
              .split(",")
              .map(() => "?")
              .join(",")
          )
          .join(",");
        query += `
        AND posts.id IN (
          SELECT post_id
          FROM post_categories
          JOIN categories ON post_categories.category_id = categories.id
          WHERE categories.title IN (${categoryPlaceholders})
          GROUP BY post_id
          HAVING COUNT(DISTINCT categories.title) = ${filters.category.length}
        )
      `;

        queryParams.push(
          ...filters.category
            .join()
            .split(",")
            .map((category) => category.trim())
        );
      }

      if (filters.sortBy === "likes") {
        query +=
          " ORDER BY (SELECT COUNT(*) FROM likes WHERE PostID = posts.id) ASC";
      } else {
        query += " ORDER BY updatedAt DESC";
      }
      if (!queryParams[1]) {
        const [results] = await connection.execute(query);
        return { posts: results };
      } else {
        const [results] = await connection.execute(query, queryParams);
        return { posts: results };
      }
    } catch (error) {
      throw ApiError.BadRequest("Error while getting posts:", error);
    }
  }

  async getPostByID(id) {
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM posts WHERE id = ?",
        [id]
      );
      return rows;
    } catch (error) {
      throw ApiError.BadRequest("Error while getting a post by ID:", error);
    }
  }

  async createPost(title, content, categories, user) {
    const sqlPostQuery =
      "INSERT INTO posts (author_id, title, content) VALUES (?, ?, ?)";
    try {
      let values = [user.id, title, content];
      const [postResult] = await connection.execute(sqlPostQuery, values);
      const postId = postResult.insertId;

      let categoryIds = [];

      if (categories && categories.length > 0) {
        categoryIds = await categoryService.getCategoryIds(categories);
      }
      if (categoryIds.length > 0) {
        for (const categoryId of categoryIds) {
          await connection.execute(
            "INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)",
            [postId, categoryId]
          );
        }
      }

      return postId;
    } catch (error) {
      throw ApiError.BadRequest("Error by creating post:", error);
    }
  }

  async getCommentsForPost(id) {
    try {
      const [comments] = await connection.execute(
        "SELECT * FROM comments WHERE PostID = ?",
        [id]
      );
      return comments;
    } catch (error) {
      throw ApiError.BadRequest(
        "Error while getting comments for post:",
        error
      );
    }
  }

  async getCategoriesForPost(id) {
    try {
      const [categories] = await connection.execute(
        "SELECT categories.title FROM post_categories " +
          "JOIN categories ON post_categories.category_id = categories.id " +
          "WHERE post_categories.post_id = ?",
        [id]
      );
      return categories;
    } catch (error) {
      throw ApiError.BadRequest(
        "Error while getting categories for post:",
        error
      );
    }
  }

  async updatePost(id, newData, user) {
    try {
      const postExists = await this.getPostByID(id);
      if (!postExists[0].id) {
        throw ApiError.BadRequest("Post not found");
      }
      if (postExists[0].author_id !== user.id && user.role !== "admin") {
        throw ApiError.ForbiddenError("You not author");
      }
      if (newData.content) {
        const { content } = newData;
        const query = "UPDATE posts SET content = ? WHERE id = ?";
        await connection.execute(query, [content, id]);
      } else {
        const { status } = newData;
        const query = "UPDATE posts SET status = ? WHERE id = ?";
        await connection.execute(query, [status, id]);
      }
      const updatedPost = await this.getPostByID(id);
      return updatedPost;
    } catch (error) {
      throw ApiError.BadRequest("Error by updating post:", error);
    }
  }

  async updatePostCategories(postId, newCategories) {
    try {
      await connection.execute(
        "DELETE FROM post_categories WHERE post_id = ?",
        [postId]
      );
      if (newCategories && newCategories.length > 0) {
        let categoryIds = await categoryService.getCategoryIds(newCategories);
        for (const categoryId of categoryIds) {
          await connection.execute(
            "INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)",
            [postId, categoryId]
          );
        }
      }
      return { message: "Post categories updated successfully" };
    } catch (error) {
      throw ApiError.BadRequest("Error by updating post categories:", error);
    }
  }

  async updatePostScreenshot(screenshot, post_id) {
    try {
      const updateQuery = "UPDATE posts SET screenshot = ? WHERE id = ?";
      await connection.query(updateQuery, [screenshot, post_id]);
      return "Screenshot updated successfully";
    } catch (error) {
      throw ApiError.BadRequest("Error by updating post categories:", error);
    }
  }

  async deletePost(id, user) {
    try {
      const postExists = await this.getPostByID(id);
      if (!postExists[0].id) {
        throw ApiError.BadRequest("Post not found");
      }
      if (postExists[0].author_id !== user.id && user.role !== "admin") {
        throw ApiError.ForbiddenError("You not author or admin");
      }
      const result = await connection.execute(
        "DELETE FROM posts WHERE id = ?",
        [id]
      );
      return { result, message: "Post deleted successfully" };
    } catch (error) {
      throw ApiError.BadRequest("Error while deleting post:", error);
    }
  }

  async getLikesForPost(postId) {
    try {
      const query =
        'SELECT * FROM likes WHERE EntityID = ? AND EntityType = "post"';
      const [likes] = await connection.execute(query, [postId]);
      return likes;
    } catch (error) {
      throw ApiError.BadRequest("Error while getting likes for post:", error);
    }
  }

  async createLike(postId, user) {
    try {
      const checkQuery = `
            SELECT * FROM likes
            WHERE AuthorID = ? AND PostID = ? AND Type = ?
        `;
      const [existingLike] = await connection.execute(checkQuery, [
        user.id,
        postId,
        "like",
      ]);

      if (existingLike.length > 0) {
        return { message: "Like already exists for this user and post" };
      }

      const insertQuery = `
            INSERT INTO likes (AuthorID, PostID, Type)
            VALUES (?, ?, ?)
        `;
      await connection.execute(insertQuery, [user.id, postId, "like"]);

      return { message: "Like created successfully" };
    } catch (error) {
      throw ApiError.BadRequest("Error while creating like for post:", error);
    }
  }

  async blockPost(id) {
    try {
      const query =
        'UPDATE posts SET isBlocked = true, status = "inactive" WHERE id = ?';
      await connection.execute(query, [id]);

      return { message: "Post blocked successfully" };
    } catch (error) {
      throw new Error("Failed to block post");
    }
  }

  async deleteLike(postId, user) {
    try {
      await this.getPostByID(postId);
      const query = "DELETE FROM likes WHERE PostID = ? AND AuthorID = ?";
      await connection.execute(query, [postId, user.id]);

      return { message: "Like deleted successfully" };
    } catch (error) {
      throw ApiError.BadRequest("Error while deleting like for post:", error);
    }
  }
}

export default new PostModel();
