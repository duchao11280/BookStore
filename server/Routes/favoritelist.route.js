const express = require('express');
const router = express.Router();
const favoriteListController = require('../Controllers/favoritelist.controller')

router.get('/check/:bookid/:userid', favoriteListController.checkFavorited);

router.post('/add/:bookid', favoriteListController.insertFavorite)

router.delete('/delete/:bookid/:userid', favoriteListController.deleteFavorite)

router.get('/byuserid/:id', favoriteListController.getAllWishListByUserId)
module.exports = router;