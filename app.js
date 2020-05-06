const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
//Load User Model
require('./models/User');
// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

//DB CONNECTION
//Map global promise
mongoose.Promise = global.Promise;
 //mongoose Connect
 mongoose.connect(keys.mongoURI, { useUnifiedTopology: true })
 .then(()=> console.log('Mongo db Connection Successful....'))
 .catch(err => console.log(err)); 

const app = express();

app.get('/', (req, res) => {
  res.send('It Works!');
});

//Adding Session
app.use(cookieParser());

//Adding session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next();
})

// Use Routes
app.use('/auth', auth);

//Listening Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});