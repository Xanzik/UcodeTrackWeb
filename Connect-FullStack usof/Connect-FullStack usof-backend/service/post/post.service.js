// Post.service.js
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import models from '../../models/index.js';
import ApiError from '../../exceptions/api.error.js';
import { PostBlockDTO } from '../../dto/post.dto.js';
import { buildPostWhere } from './query/post.query.where.js';
import { buildPostInclude } from './query/post.query.include.js';
import { buildPostOrder } from './query/post.query.order.js';
import { buildPostAttributes } from './query/post.query.attributes.js';

const PostModel = models.Post;
const CategoryModel = models.Category;
const UserModel = models.User;

class PostService {
	async getAllPosts(filters, search, user) {
		const posts = await PostModel.findAll({
			where: buildPostWhere(filters, search, user),
			attributes: buildPostAttributes(),
			include: buildPostInclude(filters, CategoryModel, UserModel),
			order: buildPostOrder(filters),
			distinct: true,
		});
		return posts.map((post) => post.toJSON());
	}

	async getPostByID(id) {
		const post = await PostModel.findByPk(id, {
			include: buildPostInclude([], CategoryModel, UserModel),
		});
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		return post;
	}

	async getCategoriesForPost(id) {
		const post = await PostModel.findByPk(id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		return post.getCategories();
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

	async updatePost(postId, newData, categories, user) {
		const post = await PostModel.findByPk(postId, {
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
		const post = await PostModel.findByPk(id);
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
		const post = await PostModel.findByPk(id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		if (post.authorId !== user.id && user.role !== 'admin') {
			throw ApiError.ForbiddenError('You are not the author or admin');
		}
		return post.destroy();
	}

	async blockPost(id) {
		const post = await PostModel.findByPk(id);
		if (!post) {
			throw ApiError.BadRequest('Post with this id does not exist');
		}
		const postDto = new PostBlockDTO(post);
		await post.update(postDto);
		return post;
	}
}

export default new PostService();
