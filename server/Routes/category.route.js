const express = require('express');
const {
    getAllCatAndSubCat,
    insertCategory,
    updateCatName,
    insertSubCategory, updateSubCatName,
    disableSubCat, disableCat, getHotCategory,
    getAllCategory, getAllSubCatByCat } = require('../Controllers/category.controller');
const router = express.Router();
const uploadimage = require('../utls/uploadimage')

router.get('/getall', getAllCatAndSubCat);
router.get('/gethot', getHotCategory);

router.post('/insertcat/', uploadimage.single('thumbnails'), insertCategory)

router.put('/updatecatname/:id', uploadimage.single('thumbnails'), updateCatName)

router.post('/insertsubcat/:id', insertSubCategory)

router.put('/updatesubcatname/:id', updateSubCatName)

router.put('/disable/subcat/:id', disableSubCat)

router.put('/disable/cat/:id', disableCat)
router.get('/getallcat', getAllCategory);

router.get('/getallsubcat/:id', getAllSubCatByCat);

module.exports = router;