import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:user_id', authMiddleware, userController.getUsersByID);
router.post(
	'/users',
	authMiddleware,
	roleMiddleware,
	userController.createNewUser,
);
router.patch('/users/avatar', authMiddleware, userController.updateUserAvatar);
router.patch('/users/:user_id', authMiddleware, userController.updateUser);
router.delete('/users/:user_id', authMiddleware, userController.deleteUser);

export default router;
