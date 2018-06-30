const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware de terceros para logs de peticiones HTTP
app.use(logger('dev'));
// Middleware integrado para manejo de JSON
app.use(express.json());
// Middleware integrado para entender urls
app.use(express.urlencoded({ extended: false }));
// Middleware de terceros para manejo de cookies
app.use(cookieParser());
// Middleware integrado de estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares de rutas
app.use('/', indexRouter);

// Middlewares de errores
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

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
