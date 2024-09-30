const express = require('express');
const RoomController = require('../../controllers/RoomController');
const router = express.Router();

router.get('/get-room', new RoomController().getAllRoom);

module.exports = router;
