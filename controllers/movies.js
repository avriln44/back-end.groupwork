const Movie = require('../models/movie')


module.exports.index = async (req, res) => {
    const movies = await Movie.find({})
    res.render('movies/index', { movies })
}

module.exports.newForm = (req, res) => {
    res.render('movies/new')
}

module.exports.new = async (req, res) => {
    const movie = new Movie(req.body.movie)
    movie.author = req.user.id
    await movie.save()
    req.flash('success', 'Successfully created a new movie')
    res.redirect(`/movie`)
}

module.exports.show = async (req, res) => {
    const movies = await Movie.findById(req.params.id).populate('reviews').populate('author')
    res.render('movies/show', { movies })
}

module.exports.editForm = async (req, res) => {
    const movies = await Movie.findById(req.params.id)
    res.render('movies/edit', { movies })
}

module.exports.update = async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, { ...req.body.movie })
    req.flash('success', 'Successfully updated movie')
    res.redirect(`/movie/${movie.id}`)
}

module.exports.delete = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
    req.flash('success', 'Succesfully deleted')
    res.redirect('/movie')
}