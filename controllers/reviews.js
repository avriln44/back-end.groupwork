const Movie = require('../models/movie')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    const review = new Review(req.body.review)
    movie.reviews.push(review)
    review.save()
    movie.save()
    res.redirect(`/movie/${movie.id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Movie.findByIdAndUpdate(id, { $pull: { reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted')
    res.redirect(`/movie/${id}`)
}