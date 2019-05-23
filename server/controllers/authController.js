var User = require('../models/User');
var jwt = require('jsonwebtoken');
var jwtSign = "12w@3!fgrty5a7&*-+-0poAsWW)%@!`";

exports.isUserLoggedIn = (req,res,next) => {
	if(req.headers.authorization) {
    let authToken = req.headers.authorization;
    let decoded = jwt.verify(authToken, jwtSign);

    jwt.verify(authToken, jwtSign, (err, decoded) => {
      if(err) return res.status(400).json({ success: false, error: "invalid token" })
      console.log(decoded._id, "dec....");
      User.findOne({ _id: decoded._id }, (err, user) => {
        if(err) return res.status(500).json({ success: false, error: 'server error' });
        console.log(user, "user......");
        if(user){
          var user = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
          res.json({ success: true, user })
        }else{
          next()
        }
      })
    })	
  }else {
  	next();
  }
}

exports.isUserAdmin = (req,res,next) => {
	User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return res.status(500).json({ success: false, error: 'server error' });
    
    if(user.isAdmin){
      var user = {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
      res.json({ success: true, user })
      next();
    }
  })
}