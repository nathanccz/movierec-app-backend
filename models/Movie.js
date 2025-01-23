const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true
    },
    cast: {
        type: Array,
        required: true
    },
    director: {
        type: Object
    },
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster: {
        type: String
    },
    mediaType: {
        type: String,
        required: true
    },
    production_companies: {
        type: Array
    },
    trailer: {
        type: String
    },
    status: {
        type: String
    },
    popularity: {
        type: String
    },
    tagline: {
        type: String
    },
    sources: {
        type: Array
    },
    genres: {
        type: Array
    }
})

module.exports = mongoose.model('Movie', MovieSchema)