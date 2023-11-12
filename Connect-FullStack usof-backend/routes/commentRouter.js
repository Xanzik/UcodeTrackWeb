import express from 'express';
const router = express.Router();
import commentController from '../controllers/commentController.js';

router.get('/comments/:comment_id', commentController.getComment);
router.get('/comments/:comment_id/like', commentController.getLikesByComment);
router.post('/comments/:comment_id/like', commentController.createLike);
router.post('/comments/:comment_id/block', commentController.blockComment);
router.patch('/comments/:comment_id', commentController.updateComment);
router.delete('/comments/:comment_id', commentController.deleteComment);
router.delete('/comments/:comment_id/like', commentController.deleteLike);

export default router;