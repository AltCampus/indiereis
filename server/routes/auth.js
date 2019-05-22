var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', (req, res, next) => {
	res.render('google');
})

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.json({ success: true })
  })

router.get('/logout', (req, res) => {
	req.logout();
	res.json('/');
})

module.exports = router;