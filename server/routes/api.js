const express = require('express');
const router = express.Router();

var userApi = require('./users');
var questionApi = require('./questions');
var countryApi = require('./country');
var publicDataApi = require('./publicData');
var jwtAuth = require("../config/jwtAuth");

router.use('/users', userApi);
router.use('/questions', questionApi);
router.use('/country', countryApi);
router.use('/public-data', jwtAuth.verifyToken, publicDataApi);

module.exports = router;
