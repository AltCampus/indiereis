const express = require('express');
const router = express.Router();
var userApi = require('./users');
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');
var Question = require("../models/Question");

router.get('/', (req,res,next) => {
	console.log("inside fetch questions...")

	Question.find({}, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

router.post('/', (req,res,next) => {
	console.log("inside question post...")
	Question.create(req.body, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

module.exports = router;
