const express = require('express');
const router = express.Router();
var userApi = require('./users');
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');
var Question = require("../models/Question");
var User = require("../models/User");
var UserData = require("../models/UserData");

router.get('/', (req,res,next) => {
	// console.log("inside fetch questions...");
	UserData.find({}, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

router.post('/', (req,res,next) => {
	console.log(req.body, "inside userData post...");
	console.log(req.user, "jwt user data");
	// var data = Object.assign({}, req.body.countaryAndTrip, req.body.form1, req.body.form2, req.body.form3, req.body.form4, req.body.form5, req.body.form6);
	var data = req.body
	data.userId = req.user._id;

	console.log(data, "concat obj data....")
	UserData.create(data, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		if(data) {
			User.findByIdAndUpdate( data.userId ,{ $push: { userData: data._id } }, (err, user) => {
			if(err) return next(err);
			console.log(user, "user updated with his datainfo...");
			res.status(200).json({ success: true, message: "data is saved" });
			}
		)}
	})
})

router.get('/:id', (req,res,next) => {
	var dataId = req.params.id;
	// var userId = 
	console.log(req.query, "query req....");
	// User.findOneAndUpdate({ user: id });
	console.log("inside userData get...");
	UserData.findOneAndDelete({ _id: id }, ( err, data ) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		console.log(data, "data deleted ...");
		if(data) {
			User.findOneAndUpdate({ _id: data.userId },{ $pull: { userData: data.user._id } }, (err, user) => {
			if(err) return next(err);
				console.log(user, "user updated with his info...");
				res.status(200).json({ success: true });
			}
		)}
	})
})

module.exports = router;
