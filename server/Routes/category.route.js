const express = require('express');
const { getAllCatAndSubCat } = require('../Controllers/category.controller');
const router = express.Router();

router.get('/getall', getAllCatAndSubCat);

module.exports = router;