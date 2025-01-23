const mongoose = require('mongoose')

const TVShowSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    plot_overview: {
        type: String,
        required: true
    },
    poster: {
        type: String
    },
    type: {
        type: String
    },
    trailer: {
        type: String
    },
    sources: {
        type: Array
    },
    genres: {
        type: Array
    },
    critic_score: {
        type: Number
    },
    user_rating: {
        type: Number
    }

})

module.exports = mongoose.model('TVShow', TVShowSchema)