const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {body} = require('express-validator');

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

module.exports = router;
