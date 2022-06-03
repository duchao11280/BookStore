const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin.controller')
const uploadimage = require('../utls/uploadimage')

router.post('/book/delete/:id', adminController.disableBookByBookId);

router.get('/book/allbook', adminController.getAllBook);

router.post('/book/add', uploadimage.any(), adminController.addBookByBookId);

router.post('/book/update', uploadimage.any(), adminController.updateBookByBookId);

router.get('/order/getall', adminController.getAllOrder);
router.get('/order/:id', adminController.getOrderByID);
router.get('/detailorder/:id', adminController.getTotalPriceOfOrderById);

router.post('/order/updatestatus', adminController.updateOrderStatusbyId)


module.exports = router;