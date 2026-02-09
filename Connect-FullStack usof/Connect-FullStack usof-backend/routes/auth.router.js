import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { body } from 'express-validator';
import validationMiddleware from '../middlewares/validation.middleware.js';

router.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 32 }),
	validationMiddleware,
	authController.register,
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.post('/password-reset', authMiddleware, authController.passwordReset);
router.post(
	'/password-reset/:confirm_token',
	authController.passwordResetConfirm,
);

export default router;
