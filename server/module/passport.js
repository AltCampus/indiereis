var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {    
    User.findOne({ email: profile.emails[0].value }, (err, user) => {
      if(err) return done(null, null);
      if(user){
        // console.log(user,"..............................");
        return done(null, user);
      }
    	if(!user) {
    		// console.log(profile, "profile....................................");
    		User.create({
    			name: profile.displayName,
    			email: profile.emails[0].value,
    			photo: profile.photos[0].value,
    		},(err, user) => {
    			if(err) { return done(err, null) };
    			done(null, user);
    		})
    	}	
    })
  }
));

// serialize user
passport.serializeUser((user, done) => {
	done(null, user._id);
})

// // deserialize user
passport.deserializeUser((id, done) => {
	User.findById(id, function(err, user) {
    if(err) return done(err, null);
    done(null, user);
  });
})
