// using the express library in variable express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// specify that app is a new express application
var app = express();

// Routing, send static elements only and others go to Angular
app.use('/javascripts', express.static(__dirname + '/public/javascripts'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/pages', express.static(__dirname + '/public/pages'));
app.use('/partials', express.static(__dirname + '/views/partials'));
app.use('/portfolio.json', express.static(__dirname + '/portfolio.json'));
app.use('/favicon.ico', express.static(__dirname + '/public/favicon.ico'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var users = require('./routes/users');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Jacob didn\'t create this page yet!');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
