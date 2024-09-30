const Category = require('../../models/Category');
const Upload = require('../../config/common/upload')
const express = require('express');
const CategoryController = require("../../controllers/CategoryController");
const router = express.Router();

router.get('/get-category-by-page', new CategoryController().getCategoryByPage);
router.get('/get-category', new CategoryController().getAllCategory);
router.post('/add-category', new CategoryController().addCategory);
router.put('/update-category/:id', new CategoryController().updateCategory);
router.delete('/delete-category/:id', new CategoryController().deleteCategory);

module.exports = router;
