const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/users/:user_id', userController.getUsersByID);
router.post('/users', userController.createNewUser);
router.patch('/users/avatar', userController.updateUserAvatar);
router.patch('/users/:user_id', userController.updateUser);
router.delete('/users/:user_id', userController.deleteUser);

module.exports = router;
