const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

//Load User Model
require('./models/User');

// Passport Config
require('./config/passport')(passport); 

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

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

// Body Parser middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

//Set static folder configuration
app.use(express.static(path.join(__dirname, 'public')));

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
  res.locals.user = req.user || null;
  next();
});

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories)

//Listening Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

