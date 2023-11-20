const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const users = require('../controllers/users')

router.get('/register', users.registerForm)
    .post('/register', users.register)

router.get('/login', users.loginForm)
    .post('/login', passport.authenticate('local', { failureFlash: true, failuteRedirect: '/login' }), async (req, res) => {
        res.redirect('/movie')
    })

router.get('/logout', users.logout);


module.exports = router