const express = require('express');
const SeatController = require("../../controllers/SeatController");
const router = express.Router();

router.get('/get-all-seat', new SeatController().getAllSeat);

module.exports = router;
