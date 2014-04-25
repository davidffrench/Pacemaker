
// set up ======================================================================
var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var passport     = require('passport');
var jwt          = require('jsonwebtoken');

var database         = require('./config/database');
var allowCrossDomain = require('./app/middleware/cors');

var app = express();
var router        = require('./app/routes')(app, passport);

require('./app/middleware/errorHandling')(app, router);
require('./config/passport')(passport);

// configuration ===============================================================
mongoose.connect(database.url);     // connect to mongoDB database

app.use(allowCrossDomain);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
app.use('/api', router);


module.exports = app;
