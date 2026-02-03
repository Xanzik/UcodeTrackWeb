import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import roleMiddleware from '../middlewares/role-middlewares.js';

router.get('/users', userController.getUsers);
router.get('/users/:user_id', userController.getUsersByID);
router.post(
	'/users',
	authMiddleware,
	roleMiddleware,
	userController.createNewUser,
);
router.patch('/users/avatar', authMiddleware, userController.updateUserAvatar);
router.patch('/users/:user_id', userController.updateUser);
router.delete('/users/:user_id', userController.deleteUser);

export default router;
