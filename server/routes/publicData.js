const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var userApi = require('./users');
var Question = require("../models/Question");
var User = require("../models/User");
var UserData = require("../models/UserData");
var jwtAuth = require("../config/jwtAuth");

router.get('/', (req,res,next) => {
	// console.log("inside fetch questions...");
	UserData.find({}, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

router.post('/', jwtAuth.verifyToken, (req,res,next) => {
	console.log(req.body, "inside userData post...");
	console.log(req.user, "jwt user data");
	var data = req.body;

	console.log(data, "data....");
	UserData.create( data, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		data.userId = req.user._id;
		data.save();
		User.findByIdAndUpdate( req.user._id ,{ $push: { userData: data._id } }, (err, user) => {
			if(err) return res.status(500).json({ success: false, message: "server side error"});
			console.log(user, "user updated with his datainfo...");
			res.status(200).json({ success: true, message: "Userdata saved successfully" });
		})
	})
})

router.get('/delete/:id', jwtAuth.verifyToken, (req,res,next) => {
	console.log("inside delete userData get...");
	var dataId = req.params.id;
	UserData.findOneAndDelete({ _id: id }, ( err, data ) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		console.log(data, data._id, "data deleted ...");
		
		User.findOneAndUpdate({ _id: req.user._id },{ $pull: { userData: data._id } }, (err, user) => {
			if(err) return res.status(500).json({ success: false, message: "server side error" });
			console.log(user, "user updated after deleting userData...");
			res.status(200).json({ success: true , message: "UserData deleted!" });
		})
	})
})

router.post('/update/:id', jwtAuth.verifyToken, (req,res,next) => {
	console.log("inside update userData...");
	var Id = req.params.id;
	UserData.findOneAndUpdate({ _id: Id }, req.body, ( err, data ) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		console.log(data, "userdata updated....");
		res.status(200).json({ success: true });
	})
})

module.exports = router;
