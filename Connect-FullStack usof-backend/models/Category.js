import mysql from 'mysql2/promise';
import ApiError from '../exceptions/api-error.js';
import config from '../utils/config.json' assert { type: "json" };

let connection = mysql.createPool(config);

class CategoryModel {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    async createCategory(title) {
        const sqlQuery = 'INSERT INTO categories (title) VALUES (?)';
        try {
          const [result] = await connection.execute(sqlQuery, [title]);
          return result;
        } catch (error) {
          throw ApiError.BadRequest('Error by creating category:', error);
        }
    }

    async getCategories() {
      try {
        const [result] = await connection.execute('SELECT * FROM categories');
        return result;
      } catch (error) {
        throw ApiError.BadRequest('Error by finding categories:', error);
      }
    }

    async getCategoryByID(id) {
      try {
        const query = 'SELECT * FROM categories WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        if(!result[0]) {
          return "Category not exists";
        }
        return result;
      } catch (error) {
        throw ApiError.BadRequest('Error by finding categories:', error);
      }
    }

    async updateCategory(id, newData) {
      try {
        console.log(newData);
          const query = 'UPDATE categories SET name = ? WHERE id = ?';
          const [result] = await connection.execute(query, [newData.name, id]);
  
          if (result.affectedRows > 0) {
              const updatedCategory = await this.getCategoryByID(id);
              return updatedCategory;
          } else {
              return "Nothing was updated";
          }
      } catch (error) {
          throw ApiError.BadRequest('Error updating category:', error);
      }
  }

    async deleteCategory(id) {
      try {
        const query = 'DELETE FROM categories WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result;
      } catch (error) {
        throw ApiError.BadRequest('Error by deleting categories:', error);
      }
    }

    async getCategoryIds(categories) {
      try {
        const placeholders = categories.map(() => '?').join(',');
        const [rows] = await connection.execute(`SELECT id FROM categories WHERE title IN (${placeholders})`, categories);
        return rows.map(row => row.id);
      } catch (error) {
        throw ApiError.BadRequest('Error by get categories id:', error);
      }
    }

    async getPostsByCategory(categoryId) {
      try {
          const query = `
              SELECT posts.*
              FROM posts
              JOIN post_categories ON posts.id = post_categories.post_id
              WHERE post_categories.category_id = ?;
          `;
          const [posts] = await connection.execute(query, [categoryId]);
          return posts;
      } catch (error) {
          throw ApiError.BadRequest('Error by getting posts by category:', error);
      }
    }  
}

export default new CategoryModel;