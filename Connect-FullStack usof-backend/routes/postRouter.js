import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import roleMiddleware from '../middlewares/role-middlewares.js';

router.get('/posts', authMiddleware, authMiddleware, postController.getAllPosts);
router.get('/posts/:post_id', authMiddleware, authMiddleware, postController.getPostByID);
router.get('/posts/:post_id/comments', authMiddleware, postController.getCommentsForPost);
router.post('/posts/:post_id/comments', authMiddleware, postController.createComment);
router.get('/posts/:post_id/categories', authMiddleware, postController.getCategoriesForPost);
router.get('/posts/:post_id/like', authMiddleware, postController.getLikesForPost);
router.post('/posts', authMiddleware, postController.createPost);
router.post('/posts/:post_id/block', authMiddleware, roleMiddleware, postController.blockPost);
router.post('/posts/:post_id/like', authMiddleware, postController.createLike);
router.patch('/posts/:post_id', authMiddleware, postController.updatePost);
router.get('/posts/:sortBy', authMiddleware, postController.getSortedPosts);
router.delete('/posts/:post_id', authMiddleware, postController.deletePost);
router.delete('/posts/:post_id/like', authMiddleware, postController.deleteLike);

export default router;
