const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserData = require("../models/UserData");
const jwtAuth = require("../config/jwtAuth");

router.get("/", (req, res) => {
  UserData.find({}, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    res.status(200).json({ success: true, data });
  });
});

router.get("/:id", (req, res) => {
  UserData.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    res.status(200).json({ success: true, data });
  });
});

router.post("/", jwtAuth.verifyToken, (req, res) => {
  const data = req.body;

  UserData.create(data, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    data.userId = req.user._id;
    data.save();

    User.findByIdAndUpdate(
      req.user._id,
      { $push: { userData: data._id } },
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "server side error" });
        }

        console.log(user, "user updated with his data info...");

        res
          .status(200)
          .json({ success: true, message: "UserData saved successfully" });
      }
    );
  });
});

router.get("/delete/:id", jwtAuth.verifyToken, (req, res) => {
  const id = req.params.id;

  UserData.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { userData: id } },
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "server side error" });
        }

        console.log(user, "user updated after deleting userData...");
        res.status(200).json({ success: true, message: "UserData deleted!" });
      }
    );
  });
});

router.post("/update/:id", jwtAuth.verifyToken, (req, res) => {
  const Id = req.params.id;

  UserData.findOneAndUpdate({ _id: Id }, req.body, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server side error" });
    }

    res
      .status(200)
      .json({ success: true, message: "user data updated successfully" });
  });
});

module.exports = router;
