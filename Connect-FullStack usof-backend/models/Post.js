import mysql from 'mysql2/promise';
import ApiError from '../exceptions/api-error.js';
import config from '../utils/config.json' assert { type: "json" };
import categoryService from '../service/categoryService.js';

let connection = mysql.createPool(config);

class PostModel {
  async getAllPosts(filters) {
    try {
      let query = `
      SELECT *
      FROM posts
      WHERE 1=1
    `;

    const queryParams = [];

    if (filters.dateFrom) {
      query += ` AND publish_date >= ?`;
      queryParams.push(filters.dateFrom);
    }

    if (filters.dateTo) {
      query += ` AND publish_date <= ?`;
      queryParams.push(filters.dateTo);
    }

    if (filters.status) {
      query += ` AND status = ?`;
      queryParams.push(filters.status);
    }

    if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
      const categoryPlaceholders = filters.category.map(category => category.split(',').map(() => '?').join(',')).join(',');
      query += `
        AND posts.id IN (
          SELECT post_id
          FROM post_categories
          JOIN categories ON post_categories.category_id = categories.id
          WHERE categories.name IN (${categoryPlaceholders})
        )
      `;
    
      queryParams.push(...filters.category.join().split(',').map(category => category.trim()));
    }
    
    query += ` GROUP BY posts.id`;

    const [results] = await connection.execute(query, queryParams);

    return { posts: results };
    } catch (error) {
        throw ApiError.BadRequest('Error while getting posts:', error);
    }
  }

  async getPostByID(id) {
    try {
        const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [id]);
        return rows;
    } catch (error) {
        throw ApiError.BadRequest('Error while getting a post by ID:', error);
    }
  }

  async getSortedPost(sortBy) {
    try {
      let query = 'SELECT * FROM posts';

      if (sortBy === 'likes') {
          query += ' ORDER BY (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) DESC';
      } else if (sortBy === 'date') {
          query += ' ORDER BY publish_date DESC';
      }
      const [posts] = await connection.execute(query);
      return posts;
    } catch (error) {
        throw ApiError.BadRequest('Failed to get sorted post', error);
    }
  }

  async getFilteredPost(filters) {
    try {
        let query = 'SELECT p.* FROM posts p ';

        if (filters.category && filters.category.length > 0) {
            query += 'JOIN post_categories pc ON p.id = pc.post_id ';
        }

        query += 'WHERE 1=1';

        if (filters.category && filters.category.length > 0) {
            query += ' AND pc.category_id IN (?)';
        }

        if (filters.dateFrom) {
            query += ' AND publish_date >= ?';
        }

        if (filters.dateTo) {
            query += ' AND publish_date <= ?';
        }

        if (filters.status) {
            query += ' AND status = ?';
        }

        const [posts] = await connection.execute(query, Object.values(filters));
        return posts;
    } catch (error) {
        throw ApiError.BadRequest('Failed to get filtered posts', error);
    }
}

  async createPost(title, content, categories, user_id) {
    const sqlPostQuery = 'INSERT INTO posts (author_id, title, content) VALUES (?, ?, ?)';
    try {
        const [postResult] = await connection.execute(sqlPostQuery, [user_id, title, content]);
        const postId = postResult.insertId;
        let categoryIds = [];
        if (categories && categories.length > 0) {
          categoryIds = await categoryService.getCategoryIds(categories);
        }
        if (categoryIds.length > 0) {
          for (const categoryId of categoryIds) {
              await db.execute('INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)', [postId, categoryId]);
          }
      }
        return postId;
    } catch (error) {
        throw ApiError.BadRequest('Error by creating post:', error);
    }
  }

  async getCommentsForPost(id) {
    try {
        const [comments] = await connection.execute('SELECT * FROM comments WHERE PostID = ?', [id]);
        return comments;
    } catch (error) {
        throw ApiError.BadRequest('Error while getting comments for post:', error);
    }
  }

  async getCategoriesForPost(id) {
    try {
        const [categories] = await connection.execute(
            'SELECT categories.name FROM post_categories ' +
            'JOIN categories ON post_categories.category_id = categories.id ' +
            'WHERE post_categories.post_id = ?',
            [id]
        );
        return categories;
    } catch (error) {
        throw ApiError.BadRequest('Error while getting categories for post:', error);
    }
  }

  async updatePost(id, newData) {
    try {
        const postExists = await this.getPostByID(id);
        if (!postExists) {
            throw ApiError.BadRequest('Post not found');
        }
        const { title, content } = newData;
        const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
        await connection.execute(query, [title, content, id]);
        const updatedPost = await this.getPostByID(id);
        return updatedPost;
    } catch (error) {
        throw ApiError.BadRequest('Error by updating post:', error);
    }
  }

  async updatePostCategories(postId, newCategories) {
    try {
        await connection.execute('DELETE FROM post_categories WHERE post_id = ?', [postId]);
        if (newCategories && newCategories.length > 0) {
          let categoryIds = await categoryService.getCategoryIds(newCategories);
          for (const categoryId of categoryIds) {
              await connection.execute('INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)', [postId, categoryId]);
          }
        }
        return { message: 'Post categories updated successfully' };
    } catch (error) {
        throw ApiError.BadRequest('Error by updating post categories:', error);
    }
  }

  async deletePost(id) {
    try {
        await connection.execute('DELETE FROM comments WHERE PostID = ?', [id]);
        await connection.execute('DELETE FROM post_categories WHERE post_id = ?', [id]);
        await connection.execute('DELETE FROM posts WHERE id = ?', [id]);
        return { message: 'Post deleted successfully' };
    } catch (error) {
        throw ApiError.BadRequest('Error while deleting post:', error);
    }
  }

  async getLikesForPost(postId) {
    try {
        const query = 'SELECT * FROM likes WHERE EntityID = ? AND EntityType = "post"';
        const [likes] = await connection.execute(query, [postId]);
        return likes;
    } catch (error) {
        throw ApiError.BadRequest('Error while getting likes for post:', error);
    }
  }

  async createLike(postId, userId) {
    try {
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const query = `
          INSERT INTO likes (AuthorID, PublishDate, EntityID, EntityType, Type)
          VALUES (?, ?, ?, ?, ?)
      `;
      await connection.execute(query, [userId, currentDate, postId, 'post', 'like']);

      return { message: 'Like created successfully' };
    } catch (error) {
        throw ApiError.BadRequest('Error while creating like for post:', error);
    }
  }

  async blockPost(id) {
    try {
        const query = 'UPDATE posts SET isBlocked = true, status = "inactive" WHERE id = ?';
        await connection.execute(query, [id]);

        return { message: 'Post blocked successfully' };
    } catch (error) {
        throw new Error('Failed to block post');
    }
  }

  async deleteLike(postId, userId) {
    try {
        const query = 'DELETE FROM likes WHERE EntityID = ? AND AuthorID = ? AND EntityType = "post"';
        await connection.execute(query, [postId, userId]);

        return { message: 'Like deleted successfully' };
    } catch (error) {
        console.error('Error while deleting like for post:', error);
        throw ApiError.BadRequest('Error while deleting like for post:', error);
    }
  }
}

export default new PostModel;
