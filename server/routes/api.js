const express = require("express");
const router = express.Router();

const userApi = require("./users");
const questionApi = require("./questions");
const countryApi = require("./country");
const publicDataApi = require("./publicData");

router.use("/users", userApi);
router.use("/questions", questionApi);
router.use("/country", countryApi);
router.use("/public-data", publicDataApi);

module.exports = router;
