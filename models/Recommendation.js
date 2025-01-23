const mongoose = require('mongoose')

const RecommendationSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    recommendations: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Recommendation', RecommendationSchema)