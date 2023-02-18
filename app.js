const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');
const path = require('path'); 
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , 'public')));
const MongoStore = require('connect-mongo');//SESSION STORER

// Need to require the entire Passport config module so app.js knows about it



/**
 * -------------- GENERAL SETUP ----------------
 */
const sessionStore=MongoStore.create({
   client: connection.getClient(),
    collectionName:'session'

});

    app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:sessionStore,
    cookie: { maxAge:1000*60*60 }//COOKIE TIME
}));
// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application



/**
 * -------------- SESSION SETUP ----------------
 */

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
 require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use('/',require('./routes/index.js'));
app.use('/item',require('./routes/item'));


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);