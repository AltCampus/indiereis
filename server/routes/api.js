const express = require('express');
const router = express.Router();

var userApi = require('./users');
var questionApi = require('./questions');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
var User = require("../models/User");

router.use('/users/login', userApi);
router.use('/users/register', userApi);
router.use('/users/update', userApi);
router.use('/users/delete', userApi);
router.use('/users', userApi);
router.use('/users/profiles/:username', userApi);
router.use('/users/verify/:token', userApi);

router.use('/questions', questionApi);

module.exports = router;
