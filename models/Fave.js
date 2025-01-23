const mongoose = require('mongoose')

const FaveSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    poster: {
        type: String, 
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        enum: ['movie', 'tv'],
        requires: true
    }
})

FaveSchema.methods.populateItem = async function() {
    if (this.type === 'movie') {
        await this.populate('itemId', 'poster title tmdbId')
    } else if (this.type === 'tv') {
        await this.populate('itemId', 'poster name tmdbId')
    }
    return this
}

const Fave = mongoose.model('Fave', FaveSchema);

module.exports = Fave;