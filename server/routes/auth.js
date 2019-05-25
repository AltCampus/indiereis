var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/User');
var jwtAuth = require('../config/jwtAuth');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) { 
    console.log(profile, "user profile......");  
    User.findOne({ email: profile.emails[0].value }, (err, user) => {
      if(err) return done(null, null);
      if(user){
        console.log(user)
        return done(null, user);
      }
			if(!user) {
				User.create({
					name: profile.displayName,
					email: profile.emails[0].value,
					photo: profile.photos[0].value,
				},(err, user) => {
          console.log(user, "google user.......");
					if(err) return done(err, null);
					done(null, user);
			});
			}	
		});
  }
));

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user) {
    console.log(user, "google user........")
    if(err) {
      return res.send({ message: 'Something went wrong with google auth' });
    }
    // generate token
    var token = jwtAuth.signToken({ _id: user._id });
    // send the response it back to client.
    res.redirect('/?t='+token);
  })(req, res, next);
});

module.exports = router;