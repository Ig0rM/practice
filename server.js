var express = require('express');
var app = express();
var routes = require('./backend/routes.js');
var passportConf = require('./config/passport');
var bodyParser = require('body-parser');

var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var configDB = require('./backend/connection.js');

mongoose.connect(configDB.dbUrl);//
passportConf.conf(passport);
//require('./config/passport')(passport);//

app.use(morgan('dev'));//
app.use(cookieParser());//


app.use(bodyParser());

app.set('view engine', 'ejs'); //


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


routes.createRoutes(app, passport);
// app.listen(3000);

module.exports = app;

