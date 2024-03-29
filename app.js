var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const winston = require('winston')

var calenderApi=require('./server/routes/api/calender-api');


var app = express();

// view engine setup

winston.log('info', 'Hello log files!', {
  someKey: 'some-value'
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({secret: 'ssshhhhh',saveUninitialized : true, resave : true}));
app.use('/calender', calenderApi);

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/dist/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
