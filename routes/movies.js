const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')
const movies = require('../controllers/movies')

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

router.get('/', movies.index).post('/', isLoggedIn, movies.new)

router.get('/new', isLoggedIn, movies.newForm)

router.get('/:id', movies.show)
    .put('/:id', isLoggedIn, movies.update)
    .delete('/:id', isLoggedIn, movies.delete)

router.get('/:id/edit', isLoggedIn, movies.editForm)

module.exports = router