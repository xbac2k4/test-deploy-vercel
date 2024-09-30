const express = require('express');
const TimeController = require('../../controllers/TimeController');
const router = express.Router();

router.get('/get-time', new TimeController().getAllTime);

module.exports = router;
