const express = require('express');
const router = express.Router();
var userApi = require('./users');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

var User = require("../models/User");

router.get('/', (req,res,next) => {
	User.find({}, (err, user) => {
		if(err) return res.status(400).json({err: "server error"});
		res.json({user: "user found..."})
	})
})
router.post('/users/login', userController.loginUser);
router.post('/users/register', userController.registerUser);
router.post('/users/update', userController.updateUser);
router.post('/users/delete', userController.deleteUser);
// router.post('/users/logout', userController.registerUser);


module.exports =router;