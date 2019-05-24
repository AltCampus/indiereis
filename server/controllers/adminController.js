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
	login: (req, res, next) => {
		const data = req.body;
		User.findOne({ email: data.email }, (err, user) => {
			if (err) return res.status(500).json({ success: false, error: "server error" });
			if(!user) {
				res.status(400).json({ success: false, error: "user not found" });
			}
      if(user && !user.isAdmin ){
        res.status(400).json({ success: false , error: "You dont have admin access" });
      }
			if(user && user.isAdmin ){
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
	update: (req, res, next) => {
		User.findOneAndUpdate({ email: req.body.email }, req.body, (err, user) => {
			if(err) return res.status(500).json({ success: false, error: "server side error" });
			if(user) return res.status(200).json({ success: true, user, token });
		})
	},
	delete: (req, res, next) => {
    if(req.body.isAdmin){
  		User.findOneAndDelete({ email: req.body.email }, (err, user) => {
  			if(err) return res.status(500).json({ success: false, error: "server side error" });
  			if(user) return res.status(200).json({ success: true, msg: "user sucessfully deleted" });
  		})
    }else {
      return res.status(401).json({ success: false, msg: "unauthorized" });
    }
	}

}
