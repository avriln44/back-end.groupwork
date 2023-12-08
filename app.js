const express = require('express')
const app = express()

const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const session = require('express-session')
const flash = require('connect-flash')

const User = require('./models/user')

const userRoutes = require('./routes/users')
const movieRoutes = require('./routes/movies')
const reviewRoutes = require('./routes/review')

// Set EJS as the view engine
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/films")

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Configuration for sessions
const sessionConfig = {
    secret: 'aaa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 4000000
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
// Enable method override for PUT and DELETE requests
app.use(methodOverride('_method'))

// Use passport for authentication
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user
    next()
})

// Routes handling
app.use('/movie', movieRoutes)
app.use('/movie/:id/reviews', reviewRoutes)
app.use('/', userRoutes)

print('ok')

app.listen(3000, () => {
    console.log('On port 3000')
})