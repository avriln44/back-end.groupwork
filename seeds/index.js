const mongoose = require('mongoose')
const movies = require('./movieList')
const Movie = require('../models/movie')
mongoose.connect("mongodb://127.0.0.1:27017/films")

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const movieDB = async () => {
    await Movie.deleteMany({})
    for (let i = 0; i < 80; i++) {
        const random = Math.floor(Math.random() * 80)
        const randomRating = Math.floor(Math.random() * 70) + 30
        const movie = new Movie({
            author: '6553dc20f186867233a89781',
            title: `${movies[random].title}`,
            rating: `${randomRating}`,
            image: `https://source.unsplash.com/random/250x250?movie,${i}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam dolore laudantium libero obcaecati alias, vel placeat ut cupiditate. Voluptatem corrupti ad odio totam deserunt exercitationem atque perferendis corporis doloribus voluptates.'
        })
        await movie.save()
    }
}

movieDB()