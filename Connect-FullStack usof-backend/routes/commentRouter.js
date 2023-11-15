import express from 'express';
const router = express.Router();
import commentController from '../controllers/commentController.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import roleMiddleware from '../middlewares/role-middlewares.js';

router.get('/comments/:comment_id', authMiddleware, commentController.getComment);
router.get('/comments/:comment_id/like', authMiddleware, commentController.getLikesByComment);
router.post('/comments/:comment_id/like', authMiddleware, commentController.createLike);
router.post('/comments/:comment_id/block', authMiddleware, roleMiddleware, commentController.blockComment);
router.patch('/comments/:comment_id', authMiddleware, commentController.updateComment);
router.delete('/comments/:comment_id', authMiddleware, commentController.deleteComment);
router.delete('/comments/:comment_id/like', authMiddleware, commentController.deleteLike);

export default router;