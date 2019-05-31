const express = require('express');
const router = express.Router();
var userApi = require('./users');
const authController = require('../controllers/authController');
var Question = require("../models/Question");

router.get('/', (req,res) => {
	Question.find({}, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

router.post('/', (req,res) => {
	Question.create(req.body, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

module.exports = router;
