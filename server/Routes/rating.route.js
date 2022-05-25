const express = require('express');
const router = express.Router();
const ratingController = require('../Controllers/rating.controller')

// get rating by book id
router.get('/bybook/:id', ratingController.getAllRatingOfBookId)

//insert rating 
router.post('/rate/book/:id', ratingController.insertRating);

//update rating
router.put('/update/book/:id', ratingController.updateRating);
module.exports = router;