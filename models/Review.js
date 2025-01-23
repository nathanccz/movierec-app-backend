const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    editedAt: {
        type: Date
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Review', ReviewSchema)