const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller')

router.get('/getall', bookController.getAllBooks);
router.get('/getbestseller', bookController.getBestSeller);
router.get('/getnew', bookController.getNewestBook);
router.get('/gethot', bookController.getHotestBook);

// get book by id
router.get('/:id', bookController.getDetailBookByID)
//get related book by bookid and subcatID

router.get('/related/:bookid/:subcatid', bookController.getRelatedBooks)

router.get('/bookforcart/:arrId', bookController.getBookByListId);
module.exports = router;