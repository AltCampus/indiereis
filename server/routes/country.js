const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Country = require("../models/Country");
const jwtAuth = require("../config/jwtAuth");

router.get("/", (req, res) => {
  Country.find({}, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    res.status(200).json({ success: true, data });
  });
});

router.get("/:country", (req, res) => {
  const countryName = req.params.country;

  Country.find({}, { country: { $elemMatch: { name: countryName } } }).exec(
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "server side error" });
      }

      res.status(200).json({ success: true, data });
    }
  );
});

router.post("/", jwtAuth.verifyToken, (req, res) => {
  // Country.create(req.body, (err, data) => {
  // 	if(err) return res.status(500).json({ success: false, message: "server side error"});
  // 	res.status(200).json({ success: true, message: "Country data added successfully" });
  // })

  const data = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    if (user.isAdmin) {
      Country.create(data, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "server side error" });
        }

        res
          .status(200)
          .json({ success: false, message: "Country data added successfully" });
      });
    } else {
      res.status(401).json({ success: false, message: "Access denied!" });
    }
  });
});

router.get("/delete/:id", jwtAuth.verifyToken, (req, res) => {
  const id = req.params.id;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    if (user.isAdmin) {
      Country.findOneAndDelete({ _id: id }, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "server side error" });
        }

        res
          .status(200)
          .json({ success: true, message: "Country deleted successfully" });
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Access denied! You are not allowed to delete this data!",
      });
    }
  });
});

router.post("/update/:id", jwtAuth.verifyToken, (req, res) => {
  const Id = req.params.id;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    if (user.isAdmin) {
      Country.findOneAndUpdate({ _id: Id }, req.body, (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "server side error" });
        }

        res.status(200).json({ success: true, message: "country updated!" });
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Access denied! You are not allowed to change this data!",
      });
    }
  });
});

module.exports = router;
