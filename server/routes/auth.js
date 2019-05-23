var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google' }),
  function(req, res) {
    res.json({ success: false });
  })

// router.get('/logout', (req, res) => {
// 	req.logout();
// 	res.json({ success: false });
// })

module.exports = router;