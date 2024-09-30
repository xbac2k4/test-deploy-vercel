var express = require('express');
const fs = require('fs');
const path = require('path');

// Helper để đọc và render partials
// const renderPartial = (partialName) => {
//   const partialPath = path.join(__dirname, '../views/partials', `${partialName}.hbs`);
//   return fs.readFileSync(partialPath, 'utf8');
// };
// const renderPartial = (partialName) => {
//   const partialPath = path.join(__dirname, 'views', 'partials', `${partialName}.hbs`);
//   return fs.readFileSync(partialPath, 'utf8');
// };
const renderPartial = (partialName) => {
  const partialPath = path.join(__dirname, '../views/partials', `${partialName}.hbs`);
  return fs.readFileSync(partialPath, 'utf8');
};

//
const categoryRouter = require('./category/index');
const movieRouter = require('./movie/index');
const userRouter = require('./user/index');
const showtimesRouter = require('./showtimes/index');
const RoomRouter = require('./room/index');
const TimeRouter = require('./time/index');
const SeatRouter = require('./seat/index');
const SeatSelectedRouter = require('./seatselected/index');
const DetailTicketRouter = require('./detailticket/index');
const TicketRouter = require('./ticket/index');
const authenticateToken = require('../middlewares/auth');

//
const router = express.Router();
//
router.use("/api/v1/user", userRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/movie", movieRouter);
router.use("/api/v1/showtimes", showtimesRouter);
router.use("/api/v1/room", RoomRouter);
router.use("/api/v1/time", TimeRouter);
router.use("/api/v1/seat", SeatRouter);
router.use("/api/v1/seatselected", SeatSelectedRouter);
router.use("/api/v1/detailticket", DetailTicketRouter);
router.use("/api/v1/ticket", TicketRouter);

router.get("/", function(req, res, next) {
  res.render('login', { title: 'LOGIN' })
});
router.get("/login", function(req, res, next) {
  res.render('login', { title: 'LOGIN' })
});
router.get("/category", function(req, res, next) {
  const content = renderPartial('category');
  res.render('main', { 
      title: 'Category',
      body: content,
  });
});
router.get("/movie", function(req, res, next) {
  const content = renderPartial('movie');
  res.render('main', { 
      title: 'Movie',
      body: content,
  });
});
router.get("/user", function(req, res, next) {
  const content = renderPartial('user');
  res.render('main', { 
      title: 'User',
      body: content,
  });
});
router.get("/showtimes", function(req, res, next) {
  const content = renderPartial('showtimes');
  res.render('main', { 
      title: 'ShowTimes',
      body: content,
  });
});
router.get("/ticket", function(req, res, next) {
  const content = renderPartial('movieticket');
  res.render('main', { 
      title: 'Ticket',
      body: content,
  });
});
module.exports = router;
