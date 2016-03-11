// using the express library in variable express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// specify that app is a new express application
var app = express();

// Routing... inclusive of callback function w/ request and response parameters
// var routes = require('./routes');
app.use('/javascripts', express.static(__dirname + '/public/javascripts'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/pages', express.static(__dirname + '/public/pages'));
app.use('/partials', express.static(__dirname + '/views/partials'));
app.use('/portfolio.json', express.static(__dirname + 'portfolio.json'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// app.get('/', routes.home);
// app.get('*', routes.home);

// app.get('/*', routes.home);
// app.get('/portfolio_thing/:item_number?', routes.home);

// For Portfolio Item
// app.get('/portfolio_item/:item_number?', routes.portfolio_single);

// var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));

var users = require('./routes/users');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
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
