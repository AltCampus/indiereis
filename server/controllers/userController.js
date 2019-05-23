var User = require('../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwtSign = "12w@3!fgrty5a7&*-+-0poAsWW)%@!`";
var mailController = require('./mailController');
var bcrypt = require('bcrypt');

function generate_token(length) {
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
			res.json({ user, massage: "user found..." })
		})
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
				var token = jwt.sign( { _id: user._id }, jwtSign );
				if(!result){
					res.status(400).json({ success: false , error: "incorrect password" });
				}
				if(result){
					var user = {
						name: user.name,
						email: user.email,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt
					}
					console.log("login successfull...");
					res.status(200).json({ success: true , user, token });
				}
			}
		})
	},
	registerUser: (req, res, next) => {
		var data = req.body;
		console.log(data, "inside register user...")
		User.findOne({ email: data.email }, ( err, user ) => {
			if(err) return res.status(500).json({ success: false, error: "server error" });
			if(user) return res.json({ success: false, error: "user already exist" });
			if(!user) {
				User.create(req.body, (err, user) => {
					if(err) return res.status(500).json({success: false, error: "server error" });
					var token = jwt.sign( { _id: user._id }, jwtSign );
					user.otp = generate_token(6);
					mailController.mail(user.email, user.otp ).catch(console.error);
					console.log("mail sent for sucessfull registration.....")
					user.save();
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
		console.log("fired");
	},
	logout: (req, res, next) => {
		req.session.destroy();
		res.status(200).json({ success: true, msg: "logout sucessfull" });
	},

	verifyUser: (req, res, next) => {
		// user.findOne({token: })
		console.log(req.params.token, "user otp token....");
	},
	userProfile: (req,res,next) => {
		var username = req.params.username;
		console.log(username, "username......................");
		User.findOne({name: username}, (err,user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			res.status(200).json({ success: true, user });
		})
	}
}