const express = require('express');
const router = express.Router();
var Question = require("../models/Question");
var User = require("../models/User");
var Country = require("../models/Country");
var jwtAuth = require("../config/jwtAuth");

router.get('/', (req,res,next) => {
	console.log("inside get countries...");
	Country.find({}, (err, data) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, data });
	})
});

router.get('/country', (req,res,next) => {
	console.log("inside get country...");
	var country = req.params.country;
	Country.findOne({ country: country }, (err, country) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		res.status(200).json({ success: true, country });
	})
});

router.post('/', jwtAuth.verifyToken, (req,res,next) => {

	// Country.create(req.body, (err, data) => {
	// 	if(err) return res.status(500).json({ success: false, message: "server side error"});
	// 	res.status(200).json({ success: true, message: "Country data added successfully" });
	// })

	console.log(req.body,req.user, "inside addCountry post...");
	var data = req.body;
	console.log(data, "data....");
	User.findOne({ _id: req.user._id }, (err, user) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		if(user.isAdmin){
			Country.create(data, (err, data) => {
				if(err) return res.status(500).json({ success: false, message: "server side error"});
				res.status(200).json({ success: false, message: "Country data added successfully" });
			})
		}else {
			res.status(401).json({ success: false, message: "Access denied!" });
		}
	})
	
})

router.get('/delete/:id', jwtAuth.verifyToken, (req,res,next) => {
	console.log(req.user, "inside delete Country...");
	var id = req.params.id;
	User.findOne({ _id: req.user._id }, (err, user) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		if(user.isAdmin){
			Country.findOneAndDelete({ _id: id }, (err, data) => {
				if(err) return res.status(500).json({ success: false, message: "server side error"});
				res.status(200).json({ success: true, message: "Country deleted successfully" });
			})
		}else {
			res.status(401).json({ success: false, message: "Access denied! You are not allowed to delete this data!" });
		}
	})
})

router.post('/update/:id', jwtAuth.verifyToken, (req,res,next) => {
	console.log("inside update Country.....");
	var Id = req.params.id;
	User.findOne({ _id: req.user._id }, (err, user) => {
		if(err) return res.status(500).json({ success: false, message: "server side error"});
		if(user.isAdmin){
			Country.findOneAndUpdate({ _id: Id }, req.body, ( err, data ) => {
				if(err) return res.status(500).json({ success: false, message: "server side error"});
				console.log(data, "country updated....");
				res.status(200).json({ success: true, message: "country updated!" });
			})
		}else {
			res.status(401).json({ success: false, message: "Access denied! You are not allowed to change this data!" });
		}
	})
})

module.exports = router;
