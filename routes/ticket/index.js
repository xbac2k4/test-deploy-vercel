const Category = require('../../models/Category');
const Upload = require('../../config/common/upload')
const express = require('express');
const TicketController = require("../../controllers/TicketController");
const router = express.Router();

router.get('/get-ticket-by-user', new TicketController().getTicketByUser);
router.post('/add-ticket', new TicketController().addTicket);

module.exports = router;
