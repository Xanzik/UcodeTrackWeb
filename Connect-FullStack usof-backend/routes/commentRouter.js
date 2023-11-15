import express from 'express';
const router = express.Router();
import commentController from '../controllers/commentController.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import roleMiddleware from '../middlewares/role-middlewares.js';

router.patch('/comments/:comment_id', authMiddleware, commentController.updateComment);
router.delete('/comments/:comment_id', authMiddleware, commentController.deleteComment);

router.get('/comments/:comment_id', authMiddleware, roleMiddleware, commentController.getComment);
router.post('/comments/:comment_id/block', authMiddleware, roleMiddleware, commentController.blockComment);

router.get('/comments/:comment_id/like', authMiddleware, commentController.getLikesByComment);
router.post('/comments/:comment_id/like', authMiddleware, commentController.createLike);
router.delete('/comments/:comment_id/like', authMiddleware, commentController.deleteLike);

router.get('/comments/:comment_id/dislike', authMiddleware, commentController.getDislikesByComment);
router.post('/comments/:comment_id/dislike', authMiddleware, commentController.createDislike);
router.delete('/comments/:comment_id/dislike', authMiddleware, commentController.deleteDislike);

export default router;