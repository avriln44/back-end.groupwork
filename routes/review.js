const express = require('express')
const router = express.Router({ mergeParams: true })
const reviews = require('../controllers/reviews')


// Create review routes
router.post('/', reviews.createReview)

// Delete review routes
router.delete('/:reviewId', reviews.deleteReview)

module.exports = router