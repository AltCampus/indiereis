const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mailController = require("./mailController");
const jwtAuth = require("../config/jwtAuth");

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
  allUsers: (req, res) => {
    User.find({}, { _id: 0, password: 0 }, (err, user) => {
      if (err) {
        return res.status(400).json({ error: "server error" });
      }

      res.json({ user, massage: "user found..." });
    });
  },

  loginUser: (req, res) => {
    const data = req.body;

    User.findOne({ email: data.email }, (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: "server error" });
      }

      if (!user) {
        res.status(400).json({ success: false, error: "user not found" });
      }

      if (user) {
        if (user.strategies.includes("google")) {
          return res.status(401).send({
            success: false,
            error: "google user",
            message: "please login through google",
          });
        } else {
          const result = user.validatePassword(data.password);
          const token = jwtAuth.signToken({ _id: user._id });

          if (!result) {
            return res
              .status(400)
              .json({ success: false, error: "incorrect password" });
          }

          if (result) {
            User.findOne({ _id: user._id })
              .select("-password -createdAt -updatedAt -__v")
              .exec(function (err, user) {
                if (err) {
                  return res
                    .status(500)
                    .json({ success: false, error: "server error" });
                }

                console.log("login successful...");
                return res.status(200).json({ success: true, user, token });
              });
          }
        }
      }
    });
  },

  registerUser: (req, res) => {
    const data = req.body;

    User.findOne({ email: data.email }, (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: "server error" });
      }

      if (!user) {
        User.create(data, (err, user) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, error: "server error" });
          }

          User.findOne({ _id: user._id })
            .select("-password -createdAt -updatedAt -__v")
            .exec(function (err, user) {
              if (err) {
                return res
                  .status(500)
                  .json({ success: false, error: "server error" });
              }

              if (!user) {
                return res
                  .status(400)
                  .json({ success: false, error: "user does not exist" });
              }

              const token = jwtAuth.signToken({ _id: user._id });

              user.token = generate_token(6);
              user.save();

              mailController
                .mail(user.email, user.token)
                .catch((err) => console.error(err));

              console.log("mail sent for successful registration.....");

              return res.status(200).json({ success: true, user, token });
            });
        });
      }

      return res.json({ success: false, error: "user already exist" });
    });
  },

  updateUser: (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, req.body, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "server side error" });
      }

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "user does not exist" });
      }

      return res.status(200).json({ success: true, message: "User updated!" });
    });
  },

  deleteUser: (req, res) => {
    User.findOneAndDelete({ email: req.body.email }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "server side error" });
      }

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "user does not exist" });
      }

      if (user) {
        return res
          .status(200)
          .json({ success: true, msg: "user sucessfully deleted" });
      }
    });
  },

  verifyUser: (req, res) => {
    const token = req.params.token;

    User.findOne({ token }).exec(function (err, user) {
      if (user) {
        user.verified = true;
        user.save();
        res.status(200).redirect("/");
      } else {
        res.status(400).send({ message: "Wrong Token" });
      }
    });
  },

  verifyRequest: (req, res) => {
    // const token = generate_token(6);
    // mailController.mail(req.params.email, user.token ).catch(err => console.error(err));
    // console.log("mail sent for sucessfull registration.....");
  },

  userProfile: (req, res) => {
    const username = req.params.username;

    User.findOne({ name: username }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "server side error" });
      }

      res.status(200).json({ success: true, user });
    });
  },

  upload: async (req, res) => {
    // cloudinary image upload async method
    // console.log(req.body, req.file, "inside file upload....")
    // try{
    // 	const result = await cloudinary.v2.uploader.upload(req.file.path);
    // 	res.send(result);
    // }catch(err){
    // 	console.log(err, "upload err1")
    // 	res.status(400).send(err, "upload err...");
    // }
  },

  verifyToken: (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SIGN);

    User.findOne({ _id: decoded._id })
      .select("-password -createdAt -updatedAt -__v")
      .exec(function (err, user) {
        if (err) {
          res.status(500).send({ success: false, error: "Server error" });
        } else if (user) {
          res.status(200).json({ success: true, user, token });
        } else {
          res.status(400).send({ message: "User does not exist!" });
        }
      });
  },

  forgotPassword: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Server error" });
      }

      if (user) {
        const token = generate_token(6);
        user.token = token;
        user.save();

        const html = `<h2> welcome to travel info</h2>
			   <p> Your one time password is : <p>
			   <h4>${user.token}</h4>`;

        mailController
          .mail(user.email, user.token, html)
          .catch((err) => console.error(err, "mail sent error"));

        res.status(200).json({
          success: true,
          message: "Please check your mail inbox for OTP",
        });
      } else {
        res.status(400).json({ message: "User does not exist!" });
      }
    });
  },

  confirmOTP: (req, res) => {
    User.findOne({ token: req.body.otp }, (err, user) => {
      if (err) {
        return res.status(500).send({ success: false, error: "Server error" });
      }

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "user does not exist" });
      }

      res
        .status(200)
        .json({ success: true, message: "otp verified", otp: user.token });
    });
  },

  changePassword: (req, res) => {
    User.findOne({ email: req.body.email }, req.body, (err, user) => {
      if (err) {
        return res.status(500).send({ success: false, error: "Server error" });
      }

      if (user) {
        user.password = req.body.password;
        user.save();

        res
          .status(200)
          .json({ success: true, message: "password changed successfully" });
      }
    });
  },
};
