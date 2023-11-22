const Movie = require('../models/movie')
const Review = require('../models/review')



module.exports.createReview = async (req, res) => {
    const movie = await Movie.findById(req.params.id) // Find movie by id
    const review = new Review(req.body.review) // Create a new Review with the data from the request body
    movie.reviews.push(review) // Add review to movie's review array
    review.save()
    movie.save()
    res.redirect(`/movie/${movie.id}`)
}


module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params // Extract movie and review IDs from request parameters  
    await Movie.findByIdAndUpdate(id, { $pull: { reviewId } }) // Remove review from movie's review array
    await Review.findByIdAndDelete(reviewId)  // Delete review by id
    req.flash('success', 'Successfully deleted')
    res.redirect(`/movie/${id}`)
}