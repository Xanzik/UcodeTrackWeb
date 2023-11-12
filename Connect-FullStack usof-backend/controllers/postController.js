import postService from '../service/postService.js';
import ApiError from '../exceptions/api-error.js';

class PostController {
    getAllPosts = async (req, res, next) => {
        try {
            const filters = {
                category: req.query.category,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                status: req.query.status,
            };
            const posts = await postService.getAllPosts(filters);
            return res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    getPostByID = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const post = await postService.getPostByID(postId);
            if (!post) {
                throw ApiError.BadRequest('Post with this id does not exist');
            }
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }

    getCommentsForPost = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const comments = await postService.getCommentsForPost(postId);
            return res.json(comments);
        } catch (e) {
            next(e);
        }
    }

    getCategoriesForPost = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const comments = await postService.getCategoriesForPost(postId);
            return res.json(comments);
        } catch (e) {
            next(e);
        }
    }

    createComment = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const { content } = req.body;
            const token = req.headers.authorization;
            const post = await postService.createComment(content, token, postId);
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }

    createPost = async (req, res, next) => {
        try {
            const { title, content, categories } = req.body;
            const token = req.headers.authorization;
            const post = await postService.createPost(title, content, categories, token);
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }

    updatePost = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const { title, content, categories } = req.body;
            const updatedPost = await postService.updatePost(postId, {title, content}, categories);
            return res.json(updatedPost);
        } catch (e) {
            next(e);
        }
    }

    deletePost = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const post = await postService.deletePost(postId);
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }

    getSortedPosts = async (req, res, next) => {
        try {
            const { sortBy } = req.query;
            console.log(sortBy);
            const posts = await postService.getSortedPost(sortBy);
            return res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    getFilteredPosts = async (req, res, next) => {
        try {
            const filters = {
                category: req.query.category,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                status: req.query.status,
            };
            console.log(filters);
            const posts = await postService.getFilteredPosts(filters);
            return res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    blockPost = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const post = await postService.blockPost(postId);
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }

    getLikesForPost = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const like = await postService.getLikesForPost(postId);
            return res.json(like);
        } catch (e) {
            next(e);
        }
    }

    createLike = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const token = req.headers.authorization;
            const like = await postService.createLike(postId, token);
            return res.json(like);
        } catch (e) {
            next(e);
        }
    }

    deleteLike = async (req, res, next) => {
        try {
            const postId = req.params.post_id;
            const token = req.headers.authorization;
            const like = await postService.deleteLike(postId, token);
            return res.json(like);
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();
