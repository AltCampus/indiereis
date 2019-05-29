var User = require('../models/User');
var jwt = require('jsonwebtoken');
var cloudinaryConfig = require('../routes/users');
var mailController = require('./mailController');
var jwtAuth = require("../config/jwtAuth");
const cloudinary = require("cloudinary");

function generate_token(length){
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i=0; i<length; i++) {
    var j = (Math.random() * (a.length-1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

module.exports = {
	allUsers: (req,res,next) => {
		User.find({}, { _id: 0, password: 0 }, (err, user) => {
			if(err) return res.status(400).json({ error: "server error" });
			res.json({ user, massage: "user found..." });
		});
	},
	loginUser: (req, res, next) => {
		const data = req.body;
		User.findOne({ email: data.email }, (err, user) => {
			if (err) return res.status(500).json({ success: false, error: "server error" });
			if(!user) {
				res.status(400).json({ success: false, error: "user not found" });
			}
			if(user){
				var result = user.validatePassword(data.password);
				var token = jwtAuth.signToken({ _id: user._id });
				if(!result){
					res.status(400).json({ success: false , error: "incorrect password" });
				}
				if(result){
					const newUser = {
						id: user._id,
						name: user.name,
						email: user.email,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
					};
					console.log("login successfull...");
					res.status(200).json({ success: true , user: newUser, token });
				}
			}
		});
	},
	registerUser: (req, res, next) => {
		var data = req.body;
		console.log(data, "inside register user...");
		User.findOne({ email: data.email }, ( err, user ) => {
			if(err) return res.status(500).json({ success: false, error: "server error" });
			if(user) return res.json({ success: false, error: "user already exist" });
			if(!user) {
				User.create(req.body, (err, user) => {
					if(err) return res.status(500).json({success: false, error: "server error" });
					const newUser = {
						id: user._id,
						name: user.name,
						email: user.email,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt
					};
					var token = jwtAuth.signToken({ _id: user._id });
					user.token = generate_token(6);
					user.save();
					console.log(user, "user otp check1....");
					mailController.mail(user.email, user.token ).catch(err => console.error(err));
					console.log("mail sent for sucessfull registration.....");
					if(user) return res.status(200).json({ success: true, user: newUser, token });
				});
			}
		});
	},
	updateUser: (req, res, next) => {
		User.findOneAndUpdate({ email: req.body.email }, req.body, (err, user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			if(user) return res.status(200).json({ success: true, user });
		});
	},
	
	deleteUser: (req, res, next) => {
		User.findOneAndDelete({ email: req.body.email }, (err, user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			if(!user) return res.status(400).json({ success: false, error: "user does not exist" });
			if(user) {
				console.log("user deleted........");
				return res.status(200).json({ success: true, msg: "user sucessfully deleted" });
			}
		});
	},
	verifyUser: (req, res, next) => {
		var token = req.params.token;
		User.findOne({ token }).exec(function(err, user) {
			if(user) {
				user.verified = true;
				user.save();
				res.json({ message: 'succesfully verified' });
			} else {
				res.status(400).send({ message: 'Wrong Token' });
			}
		});
	},
	userProfile: (req,res,next) => {
		var username = req.params.username;
		// console.log(username, "username......................");
		User.findOne({name: username}, (err,user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			res.status(200).json({ success: true, user });
		});
	},
	upload: async(req, res, next) => {
		console.log(req.body, req.file, "inside file upload....")
		try{
			const result = await cloudinary.v2.uploader.upload(req.file.path);
			res.send(result);
		}catch(err){
			console.log(err, "upload err1")
			res.status(400).send(err, "upload err...");
		}
	}
};
