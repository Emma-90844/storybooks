const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');


//Load User Model
const User = mongoose.model('users');


module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID, 
      clientSecret:keys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);
     
      //This object puts a user into the database
      const newUser = {
        googleID: profile.id,
        firstname: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
     
      };

      //Check for existing user
      User.findOne({
        googleID: profile.id
      })
      .then(user => {
        if(user){
          //Return user
          done(null, user);
        } else {
          //Create user
          new User(newUser)
          .save()
          .then(user(user => done(null, user)));
        }
      });
      //Serialize and Deserialize User
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });

      passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
      });

  
    })
  );
};