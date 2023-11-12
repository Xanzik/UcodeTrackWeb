// CategoryService.js
import CategoryModel from '../models/Category.js';

class categoryService {
  async createCategory(title) {
    const Category = await CategoryModel.createCategory(title);
    return Category;
  }

  async getCategories() {
    const Categories = await CategoryModel.getCategories();
    return Categories;
  }

  async getCategoryByID(id) {
    const Category = await CategoryModel.getCategoryByID(id);
    return Category;
  }

  async getPostsByCategory(id) {
    const posts = await CategoryModel.getPostsByCategory(id);
    return posts;
  }

  async updateCategory(id, newData) {
    const Category = await CategoryModel.updateCategory(id, newData);
    return Category;
  }

  async deleteCategory(id) {
    const Category = await CategoryModel.deleteCategory(id);
    return Category;
  }

  async getCategoryIds(categories) {
    const Categories = await CategoryModel.getCategoryIds(categories);
    return Categories;
}
}

export default new categoryService();
