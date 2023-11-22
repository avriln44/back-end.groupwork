const User = require('../models/user')
const passport = require('passport')

// Render register form
module.exports.registerForm = (req, res) => {
    res.render('users/register')
}

// Handle registration 
module.exports.register = async (req, res) => {
    const { email, username, password } = req.body
    const user = new User({ email, username })
    const registeredUser = await User.register(user, password)
    res.redirect('/movie')
}

// Render login form
module.exports.loginForm = (req, res) => {
    res.render('users/login')
}

// Handle login
module.exports.login = passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async (req, res) => {
    res.redirect('/movie')
}

// Handle logout
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Successfully logged out')
        res.redirect('/movie');
    });
}