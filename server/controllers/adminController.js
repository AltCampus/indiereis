const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSign = "12w@3!fgrty5a7&*-+-0poAsWW)%@!`";

function generate_token(length) {
  const a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  const b = [];

  for (let i = 0; i < length; i++) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

module.exports = {
  login: (req, res) => {
    const data = req.body;
    User.findOne({ email: data.email }, (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: "server error" });
      }

      if (!user) {
        res.status(400).json({ success: false, error: "user not found" });
      }

      if (user && !user.isAdmin) {
        res
          .status(400)
          .json({ success: false, error: "You dont have admin access" });
      }

      if (user && user.isAdmin) {
        const result = user.validatePassword(data.password);
        const token = jwt.sign({ _id: user._id }, jwtSign);

        if (!result) {
          res.status(400).json({ success: false, error: "incorrect password" });
        }

        if (result) {
          const user = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };

          console.log("login successful...");
          res.status(200).json({ success: true, user, token });
        }
      }
    });
  },

  update: (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, req.body, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "server side error" });
      }

      if (user) {
        return res.status(200).json({ success: true, user });
      }
    });
  },

  delete: (req, res) => {
    if (req.body.isAdmin) {
      User.findOneAndDelete({ email: req.body.email }, (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, error: "server side error" });
        }

        if (user) {
          return res
            .status(200)
            .json({ success: true, msg: "user successfully deleted" });
        }
      });
    } else {
      return res.status(401).json({ success: false, msg: "unauthorized" });
    }
  },
};
