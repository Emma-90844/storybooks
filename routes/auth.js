const express = require('express');
const router = express.Router();
const passport = require('passport');
//Allows request from the user for email and profile credentials
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


//Set up from Documentation
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
      //Successfull Authentication Redirect
    res.redirect('/dashboard');
  });

module.exports = router;

