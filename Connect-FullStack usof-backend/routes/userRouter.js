import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import roleMiddleware from '../middlewares/role-middlewares.js';

router.get('/users', authMiddleware, roleMiddleware, userController.getUsers);
router.get('/users/:user_id', authMiddleware, roleMiddleware, userController.getUsersByID);
router.post('/users', authMiddleware, roleMiddleware, userController.createNewUser);
router.patch('/users/avatar', authMiddleware, roleMiddleware, userController.updateUserAvatar);
router.patch('/users/:user_id', authMiddleware, roleMiddleware, userController.updateUser);
router.delete('/users/:user_id', authMiddleware, roleMiddleware, userController.deleteUser);

export default router;
