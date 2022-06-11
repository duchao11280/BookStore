const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order.controller')

//insert rating 
router.post('/insertorder', orderController.insertOrder);

router.get('/getorderbyid/:phone', orderController.getAllOrderByPhone)
module.exports = router;