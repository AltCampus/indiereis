const express = require("express");
const router = express.Router();

router.get("/", (err, res) => {
  res.status(200).render("index");
});

module.exports = router;
