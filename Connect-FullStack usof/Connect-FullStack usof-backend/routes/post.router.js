import express from 'express';
const router = express.Router();
import commentController from '../controllers/comment.controller.js';
import postController from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', authMiddleware, postController.getAllPosts);
router.patch('/posts/:post_id', authMiddleware, postController.updatePost);
router.delete('/posts/:post_id', authMiddleware, postController.deletePost);
router.post(
	'/posts/:post_id/comments',
	authMiddleware,
	commentController.createComment,
);
router.get(
	'/posts/:post_id/comments',
	authMiddleware,
	commentController.getCommentsForPost,
);

router.get(
	'/posts/:post_id/categories',
	authMiddleware,
	postController.getCategoriesForPost,
);
router.get('/posts/:post_id', authMiddleware, postController.getPostByID);
router.post(
	'/posts/:post_id/block',
	authMiddleware,
	roleMiddleware,
	postController.blockPost,
);
router.patch(
	'/posts/:post_id/screenshot',
	authMiddleware,
	postController.updatePostScreenshot,
);
router.get(
	'/posts/:post_id/like',
	authMiddleware,
	postController.getLikesForPost,
);
router.post('/posts/:post_id/like', authMiddleware, postController.createLike);
router.delete(
	'/posts/:post_id/like',
	authMiddleware,
	postController.deleteLike,
);

router.get(
	'/posts/:post_id/dislike',
	authMiddleware,
	postController.getDislikesForPost,
);
router.post(
	'/posts/:post_id/dislike',
	authMiddleware,
	postController.createDislike,
);
router.delete(
	'/posts/:post_id/dislike',
	authMiddleware,
	postController.deleteDislike,
);

export default router;
