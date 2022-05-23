const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller')

router.get('/getall', bookController.getAllBooks);
router.get('/getbestseller', bookController.getBestSeller);
router.get('/getnew', bookController.getNewestBook);
router.get('/gethot', bookController.getHotestBook);

module.exports = router;