import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js';

router.get('/posts', postController.getAllPosts);
router.get('/posts/:post_id', postController.getPostByID);
router.get('/posts/:post_id/comments', postController.getCommentsForPost);
router.post('/posts/:post_id/comments', postController.createComment);
router.get('/posts/:post_id/categories', postController.getCategoriesForPost);
router.get('/posts/:post_id/like', postController.getLikesForPost);
router.post('/posts', postController.createPost);
router.post('/posts/:post_id/block', postController.blockPost);
router.post('/posts/:post_id/like', postController.createLike);
router.patch('/posts/:post_id', postController.updatePost);
router.get('/posts/:sortBy', postController.getSortedPosts);
// router.get('/posts/filtered', postController.getFilteredPosts);
router.delete('/posts/:post_id', postController.deletePost);
router.delete('/posts/:post_id/like', postController.deleteLike);

export default router;
