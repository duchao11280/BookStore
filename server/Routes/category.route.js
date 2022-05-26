const express = require('express');
const { getAllCatAndSubCat, insertCategory, updateCatName } = require('../Controllers/category.controller');
const router = express.Router();

router.get('/getall', getAllCatAndSubCat);

router.post('/insertcat/', insertCategory)

router.put('/updatecatname/:id', updateCatName)
module.exports = router;