const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller')

router.get('/', bookController.getAllBooks);

module.exports = router;