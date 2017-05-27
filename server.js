// set up environment variables using .env file
require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const port = process.env.PORT || 3000;


// connect to MongoDB
require('./server/utils/connectDb')();

// configure passport object
require('./server/auth/passport')(passport);

const bodyParser = require('body-parser');
const session = require('express-session');
app.use(session({
  secret: 'secretword',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    // failureRedirect: '/failure'
  }));

app.listen(port, () => {
  console.log(`App is listening on port: ${ port }`);
});