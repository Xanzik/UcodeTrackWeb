import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

router.get('/users', userController.getUsers);
router.get('/users/:user_id', userController.getUsersByID);
router.post('/users', userController.createNewUser);
router.patch('/users/avatar', userController.updateUserAvatar);
router.patch('/users/:user_id', userController.updateUser);
router.delete('/users/:user_id', userController.deleteUser);

export default router;
