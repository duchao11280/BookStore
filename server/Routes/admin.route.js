const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin.controller')

router.get('/book/delete/:id', adminController.disableBookByBookId);

module.exports = router;