var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser')

var app = express();

var authController = require('./controllers/authController');
var tasksController = require('./controllers/tasksController');
var usersController = require('./controllers/usersController');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'azerty',
  resave: true,
  saveUninitialized: false,
  cookie: {}
}));

function requireLogin (req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    res.locals.user = req.session.user_id
    next();
  }
};

app.use(function(req, res, next) {
  res.locals.user = req.session.user_id;
  next();
});

app.get('/task', requireLogin, tasksController.index);
app.post('/task', requireLogin, tasksController.create);
app.get('/task/update/:id', requireLogin, tasksController.edit);
app.post('/task/update/:id', requireLogin, tasksController.update);
app.get('/task/delete/:id', requireLogin, tasksController.delete);

app.get('/', authController.indexLogin);
app.get('/login', authController.indexLogin);
app.post('/login', authController.login);
app.get('/logout', authController.logOut);

app.get('/register', authController.indexRegister);
app.post('/register', authController.register);

// app.get('/user', usersController.index)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
