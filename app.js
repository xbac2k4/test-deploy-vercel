var createError = require('http-errors');
var express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
const database = require('./config/db');

var app = express();

// view engine setup
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// Cấu hình session middleware
app.use(session({
  secret: 'CINEMA',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Đặt secure: true nếu bạn sử dụng HTTPS
}));
// Cấu hình body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
app.post('/upload-avatar', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Xử lý tệp tải lên ở đây
  res.send('Tệp đã được tải lên thành công');
});
//
database.connect();
//

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
