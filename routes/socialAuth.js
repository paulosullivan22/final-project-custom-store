const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.json('success')
});

module.exports = router