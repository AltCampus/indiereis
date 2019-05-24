var User = require('../models/User');
var jwt = require('jsonwebtoken');
var mailController = require('./mailController');
var jwtAuth = require("../config/jwtAuth");
// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = cloudinaryStorage({
// 	cloudinary: cloudinary,
// 	folder: "demo",
// 	allowedFormats: ["jpg", "png"],
// 	// transformation: [{ width: 500, height: 500, crop: "limit" }]
// });
// const parser = multer({ storage: storage });


// var storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'public',
//   allowedFormats: ['jpg', 'png'],
//   filename: function (req, file, cb) {
//     cb(undefined, 'my-file-name');
//   }
// });
 
// var parser = multer({ storage: storage });

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
						name: user.name,
						email: user.email,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt
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
				console.log("user deleted........")
				return res.status(200).json({ success: true, msg: "user sucessfully deleted" });
			}
		});
	},
	verifyUser: (req, res, next) => {
		// user.findOne({token: })
		// console.log(req.params.token, "user otp token....");
	},
	userProfile: (req,res,next) => {
		var username = req.params.username;
		// console.log(username, "username......................");
		User.findOne({name: username}, (err,user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			res.status(200).json({ success: true, user });
		});
	}
};
