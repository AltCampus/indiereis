const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/logout', userController.logout);
router.get('/profile/?username', userController.userProfile);

module.exports = router;