const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin.controller')

router.post('/book/delete/:id', adminController.disableBookByBookId);

router.get('/book/allbook', adminController.getAllBook);

router.post('/book/add', adminController.addBookByBookId);

router.post('/book/update/:id', adminController.updateBookByBookId);

router.get('/order/getall', adminController.getAllOrder);
module.exports = router;