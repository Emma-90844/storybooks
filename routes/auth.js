const express = require('express');
const router = express.Router();
const passport = require('passport');

//Passport-google-oauth2

//Allows request from the user for  their profile and email[FROM DOCUMENTATION]
router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));

// Set up from Documentation
router.get('/google/callback',
passport.authenticate('google',{ failureRedirect: '/'}),
(req,res) => {
    //Sucessful Authentication Redirect Home
    res.redirect('/dashboard');
});

module.exports = router;