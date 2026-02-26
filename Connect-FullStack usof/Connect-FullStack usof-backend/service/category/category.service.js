// CategoryService.js
import models from '../../models/index.js';
import ApiError from '../../exceptions/api.error.js';
import { CategoryUpdateDTO } from '../../dto/category.dto.js';
import { Op } from 'sequelize';

const CategoryModel = models.Category;

class categoryService {
	async createCategory(title) {
		return CategoryModel.create(title);
	}

	async getCategories(search) {
		const where = {};
		if (search) {
			console.log(search);
			where.title = {
				[Op.like]: `%${search}%`,
			};
		}
		return CategoryModel.findAll({ where });
	}

	async getCategoryByID(id) {
		return CategoryModel.findByPk(id);
	}

	async getPostsByCategory(id) {
		const category = await CategoryModel.findByPk(id);
		if (!category) {
			throw ApiError.BadRequest(
				'Category with provided ID does not exist',
			);
		}
		return category.getPosts();
	}

	async updateCategory(id, newData) {
		const category = await CategoryModel.findByPk(id);
		if (!category) {
			throw ApiError.BadRequest(
				'Category with provided ID does not exist',
			);
		}
		const categoryDto = new CategoryUpdateDTO(newData);
		await category.update(categoryDto);
		return category;
	}

	async deleteCategory(id) {
		const category = await CategoryModel.findByPk(id);
		if (!category) {
			throw ApiError.BadRequest(
				'Category with provided ID does not exist',
			);
		}
		return category.destroy();
	}
}

export default new categoryService();
