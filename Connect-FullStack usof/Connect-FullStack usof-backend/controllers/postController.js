import postService from '../service/postService.js';
import likeService from '../service/likeService.js';

class PostController {
	getAllPosts = async (req, res, next) => {
		try {
			const filters = {
				category: req.query.category,
				dateFrom: req.query.dateFrom,
				dateTo: req.query.dateTo,
				status: req.query.status,
				sortBy: req.query.sortBy,
			};
			const user = req.user;
			const posts = await postService.getAllPosts(filters, user);
			return res.json(posts);
		} catch (e) {
			next(e);
		}
	};

	getPostByID = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const post = await postService.getPostByID(postId);
			return res.json(post);
		} catch (e) {
			next(e);
		}
	};

	getCommentsForPost = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const comments = await postService.getCommentsForPost(postId);
			return res.json(comments);
		} catch (e) {
			next(e);
		}
	};

	getCategoriesForPost = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const comments = await postService.getCategoriesForPost(postId);
			return res.json(comments);
		} catch (e) {
			next(e);
		}
	};

	//todo: Перенести в commentController
	createComment = async (req, res, next) => {
		try {
			const user = req.user;
			const postId = req.params.post_id;
			const { content, replyCommentID } = req.body;
			const post = await postService.createComment(
				content,
				postId,
				user,
				replyCommentID,
			);
			return res.json(post);
		} catch (e) {
			next(e);
		}
	};

	createPost = async (req, res, next) => {
		try {
			const { title, content, categories } = req.body;
			const user = req.user;
			const post = await postService.createPost(
				title,
				content,
				categories,
				user,
			);
			return res.json(post);
		} catch (e) {
			next(e);
		}
	};

	updatePostScreenshot = async (req, res, next) => {
		try {
			const { screenshot } = req.files;
			const postId = req.params.post_id;
			const post = await postService.updatePostScreenshot(
				screenshot,
				postId,
			);
			return res.json(post);
		} catch (e) {
			next(e);
		}
	};

	updatePost = async (req, res, next) => {
		try {
			const user = req.user;
			const postId = req.params.post_id;
			const updatedData = req.body;
			const result = await postService.updatePost(
				postId,
				updatedData,
				updatedData.categories,
				user,
			);
			return res.json(result);
		} catch (e) {
			next(e);
		}
	};

	deletePost = async (req, res, next) => {
		try {
			const user = req.user;
			const postId = req.params.post_id;
			const post = await postService.deletePost(postId, user);
			return res.json(post);
		} catch (e) {
			next(e);
		}
	};

	blockPost = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const post = await postService.blockPost(postId);
			return res.json(post);
		} catch (e) {
			next(e);
		}
	};
	//todo Later
	getLikesForPost = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const like = await likeService.getLikesForPost(
				postId,
				'like',
				'post',
			);
			return res.json(like);
		} catch (e) {
			next(e);
		}
	};
	//todo Later
	createLike = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const user = req.user;
			const like = await likeService.createLike(
				postId,
				user,
				'like',
				'post',
			);
			return res.json(like);
		} catch (e) {
			next(e);
		}
	};
	//todo Later
	deleteLike = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const user = req.user;
			const like = await likeService.deleteLike(
				postId,
				user,
				'like',
				'post',
			);
			return res.json(like);
		} catch (e) {
			next(e);
		}
	};
	//todo Later
	getDislikesForPost = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const like = await likeService.getLikesForPost(
				postId,
				'dislike',
				'post',
			);
			return res.json(like);
		} catch (e) {
			next(e);
		}
	};
	//todo Later
	createDislike = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const user = req.user;
			const like = await likeService.createLike(
				postId,
				user,
				'dislike',
				'post',
			);
			return res.json(like);
		} catch (e) {
			next(e);
		}
	};
	//todo Later
	deleteDislike = async (req, res, next) => {
		try {
			const postId = req.params.post_id;
			const user = req.user;
			const like = await likeService.deleteLike(
				postId,
				user,
				'dislike',
				'post',
			);
			return res.json(like);
		} catch (e) {
			next(e);
		}
	};
}

export default new PostController();
