const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    tmdbId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: .5, 
        max: 5  
    },
    mediaType: {
        type: String,
        enum: ['movie', 'tv'],
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Rating', RatingSchema)