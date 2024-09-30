const express = require('express');
const SeatSelectedController = require("../../controllers/SeatSelectedController");
const router = express.Router();

router.get('/get-seatselected-by-showtimes', new SeatSelectedController().getSeatSelectedByShowtimes);
router.post('/add-seatselected', new SeatSelectedController().addSeatSelected);

module.exports = router;
