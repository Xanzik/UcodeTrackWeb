import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import {body} from 'express-validator';

router.post('/register', 
            body('email').isEmail(), 
            body('password').isLength({min: 6, max: 32}), 
            authController.register
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.post('/password-reset', authController.passwordReset);
router.post('/password-reset/:confirm_token', authController.passwordResetConfirm);

export default router;
