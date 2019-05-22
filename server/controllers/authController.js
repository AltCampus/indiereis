exports.check = (req,res,next) => {
	console.log("authcheck...1");
	next();
}

exports.isUserLoggedIn = (req,res,next) => {
	if (req.session && req.session.user) {
  	User.findById(req.session.user, (err, user) => {
  		if(err) return res.status(500).json({ error: 'server error' });
  		req.user = user;
  		res.json = user;
    	next();
  	})
  }else {
  	next();
    // res.redirect("/users/login");
  }
}

exports.userSession = (req,res,next) => {
	if (req.session && req.session.user) {
  	User.findOne({_id: req.session.user}, (err, user) => {
  		if(err) return res.status(500).json({ error: 'server error' });
  		req.user = user;
  		res.json = user;
      next();
  	})
  }else {
  	req.user = null;
  	res.json = null;
  	next();
  }
}