const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller')

router.get('/', bookController.getAllBooks);

// get book by id
router.get('/:id', bookController.getDetailBookByID)
//get related book by bookid and subcatID

router.get('/related/:bookid/:subcatid', bookController.getRelatedBooks)

router.get('/bookforcart/:arrId', bookController.getBookByListId);
module.exports = router;