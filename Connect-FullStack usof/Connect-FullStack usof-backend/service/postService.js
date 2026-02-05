// postService.js
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import {
	Category as CategoryModel,
	Post as PostModel,
} from '../admin/models/index.js';
import commentService from './commentService.js';
import { literal, Op } from 'sequelize';
import PostRepository from '../repositories/postRepository.js';
import ApiError from '../exceptions/api-error.js';
import { PostBlockDTO } from '../dto/post_dto.js';
import Category from '../models/Category.js';
import Comment from '../models/Comment.js';

class PostService {
	async getAllPosts(filters, user) {
		const where = {};

		where.updated_at = {
			[Op.gte]: filters.dateFrom || new Date('1970-01-01'),
			[Op.lte]: filters.dateTo || new Date('3000-01-01'),
		};

		if (filters.status && user.role === 'admin') {
			where.status = filters.status;
		} else {
			where[Op.or] = [
				{ status: 'active' },
				{ status: 'inactive', authorId: user.id },
			];
		}

		const include = [];
		if (filters.category && filters.category.length > 0) {
			include.push({
				model: CategoryModel,
				as: 'categories',
				where: { title: { [Op.in]: filters.category } },
				through: { attributes: [] },
				required: true,
			});
		}

		let order;
		if (filters.sortBy === 'likes') {
			order = [
				[
					literal(`(
            SELECT COUNT(*)
            FROM likes AS like
            WHERE like.PostID = Post.id
          )`),
					'DESC',
				],
			];
		} else {
			order = [['updated_at', 'DESC']];
		}
		const posts = await PostModel.findAll({
			where,
			include,
			order,
			distinct: true,
		});
		return posts.map((post) => post.toJSON());
	}

	async getPostByID(id) {
		const post = await PostRepository.findById(id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		return post;
	}

	async getCommentsForPost(id) {
		return await Comment.getCommentsForPost(id);
	}

	async getCategoriesForPost(id) {
		return await Category.getCategoriesForPost(id);
	}

	async createPost(title, content, categories, user) {
		const post = await PostModel.create({
			title,
			content,
			authorId: user.id,
		});
		if (categories?.length) {
			await post.setCategories(categories);
		}
		return post;
	}

	//todo: Replace
	async createComment(content, postId, user, replyCommentID) {
		return await commentService.createComment(
			content,
			user,
			postId,
			replyCommentID,
		);
	}

	async updatePost(postId, newData, categories, user) {
		const post = await PostRepository.findById(postId, {
			include: CategoryModel,
		});
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		const updateData = {};
		if (user.role === 'admin') {
			updateData.status = newData.status;
		} else {
			if (newData.content !== undefined)
				updateData.content = newData.content;
		}
		await post.update(updateData);
		if (categories?.length) {
			await post.setCategories(categories);
		}
		return post;
	}

	async updatePostScreenshot(screenshot, post_id) {
		const post = await PostRepository.findById(post_id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		const path = './static';
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
		const screenshotName = uuidv4() + '.jpg';
		await screenshot.mv(process.env.FILE_PATH + '\\' + screenshotName);
		await post.update({ screenshot: screenshot.name });
		return post;
	}

	async deletePost(id, user) {
		const post = await PostRepository.findById(id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		if (post.authorId !== user.id && user.role !== 'admin') {
			throw ApiError.ForbiddenError('You are not the author or admin');
		}
		return await PostRepository.delete(id);
	}

	async blockPost(id) {
		const post = await PostRepository.findById(id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		const postDto = new PostBlockDTO(post);
		await post.update(postDto);
		return post;
	}
}

export default new PostService();
