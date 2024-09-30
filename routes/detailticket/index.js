const Category = require('../../models/Category');
const Upload = require('../../config/common/upload')
const express = require('express');
const DetailTicketController = require("../../controllers/DetailTicketController");
const router = express.Router();

router.get('/get-all-detailticket', new DetailTicketController().getAllDetailTicket);
router.get('/get-detailticket-by-page', new DetailTicketController().getDetailTicketByPage);
router.get('/get-detailticket-by-user', new DetailTicketController().getDetailTicketByUser);
router.post('/add-detailticket', new DetailTicketController().addDetailTicket);
router.put('/update-detailticket/:id', new DetailTicketController().updateDetailTicket);
router.get('/get-ticket-by-id/:id', new DetailTicketController().getTicketByID);

// router.put('/update-category/:id', new CategoryController().updateCategory);
// router.delete('/delete-category/:id', new CategoryController().deleteCategory);

module.exports = router;
