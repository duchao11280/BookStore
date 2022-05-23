const express = require('express');
const { getAllCatAndSubCat, getHotCategory } = require('../Controllers/category.controller');
const router = express.Router();

router.get('/getall', getAllCatAndSubCat);
router.get('/gethot', getHotCategory);

module.exports = router;