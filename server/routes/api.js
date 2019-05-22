const express = require('express');
const router = express.Router();
var userApi = require('./users');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
var User = require("../models/User");

router.post('/users/login', userController.loginUser);
router.post('/users/register', userController.registerUser);
router.post('/users/update', userController.updateUser);
router.post('/users/delete', userController.deleteUser);
// router.post('/users/logout', userController.registerUser);

router.get('/users', userController.allUsers);
router.get('/users/profiles/:username', userController.userProfile);
router.get('/users/verify/:token', userController.verifyUser);

module.exports = router;