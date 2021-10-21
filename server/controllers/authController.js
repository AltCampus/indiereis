const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isUserLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    let authToken = req.headers.authorization;
    // let decoded = jwt.verify(authToken, process.env.JWT_SIGN);

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ success: false, error: "invalid token" });
      }

      User.findOne({ _id: decoded._id }, (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, error: "server error" });
        }

        if (user) {
          const user = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };

          console.log("isLogged in...");

          res.status(200).json({ success: true, user });
        } else {
          next();
        }
      });
    });
  } else {
    console.log("not logged in...");
    next();
  }
};

exports.isUserAdmin = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, error: "server error" });
    }

    if (user.isAdmin) {
      const user = {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.json({ success: true, user });
      next();
    }
  });
};
