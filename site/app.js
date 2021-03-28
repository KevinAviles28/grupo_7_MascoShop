require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require('express-session');
/* RUTAS */
var usuarioCheck=require('./middlewares/usuarioCheck');
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var productsRouter = require('./routes/productsRouter');
var adminRouter = require('./routes/adminRouter');
var cookieCheck = require("./middlewares/cookieCheck");

var app = express();

/* METHOD OVERRIDE */
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Agregar al session dos parametros adicionales, resave, saveUnitialized */
app.use(session({secret: "Mascoshop el mejor", resave: true, saveUninitialized: true}));

app.use(cookieCheck);
app.use(usuarioCheck);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
