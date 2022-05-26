const express = require('express');
const {
    getAllCatAndSubCat,
    insertCategory,
    updateCatName,
    insertSubCategory, updateSubCatName,
    disableSubCat, disableCat } = require('../Controllers/category.controller');
const router = express.Router();

router.get('/getall', getAllCatAndSubCat);

router.post('/insertcat/', insertCategory)

router.put('/updatecatname/:id', updateCatName)

router.post('/insertsubcat/:id', insertSubCategory)

router.put('/updatesubcatname/:id', updateSubCatName)

router.put('/disable/subcat/:id', disableSubCat)

router.put('/disable/cat/:id', disableCat)
module.exports = router;