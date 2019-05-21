var User = require('../models/User');
var bcrypt = require('bcrypt');
var jwtSign = "12w@3!fgrty5a7&*-+-0poAsWW)%@!`";
var jwt = require('jsonwebtoken');
var mailController = require('./mailController');

module.exports = {
	loginUser: (req, res, next) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) return res.status(500).json({ success: false, error: "server error" });
			if(!user) {
				res.status(400).json({ success: false, error: "user not found" });
			}
			if(user){
				var token = jwt.sign( { _id: user._id }, jwtSign );
				// mailController.mail(user.email).catch(console.error);
				console.log("login sucess....");
				res.status(200).json({ success: true, token });
			}
		})
	},
	registerUser: (req, res, next) => {
		console.log("check...");
		User.findOne({ email:req.body.email }, ( err, user ) => {
			if(err) return res.status(500).json({ success: false, error: "server error" });
			if(user) return res.json({ success: false, error: "user already exist" });
			if(!user) {
				User.create(req.body, (err, user) => {
					if(err) return res.status(500).json({success: false, error: "server error" });
					var token = jwt.sign( { _id: user._id }, jwtSign );
					mailController.mail(user.email).catch(console.error);
					console.log("mail sent for sucessfull registration.....")
					if(user) return res.status(200).json({ user, token, success: true });
				})
			}
		})
	},
	updateUser: (req, res, next) => {
		User.findOneAndUpdate({ email: req.body.email }, req.body, (err, user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			if(user) return res.status(200).json({ success: true, user, token });
		})
	},
	deleteUser: (req, res, next) => {
		User.findOneAndDelete({ email: req.body.email }, (err, user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			if(user) return res.status(200).json({ success: true, msg: "user sucessfully deleted" });
		})
		console.log("fired")
	},
	logout: (req, res, next) => {
		req.session.destroy();
		res.status(200).json({ success: true, msg: "logout sucessfull" });
	},
}