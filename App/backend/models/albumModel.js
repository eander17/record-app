// file to define the schema for albums

const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add album title']
    }, 
    artist: {
        type: String,
        required: [true, 'Please add artist name']
    }, 
    genre: {
        type: String,
        required: [true, 'Please add genre']

    }, 
    year: {
        type: Number,
        required: [true, 'Please add release year']

    }    
}, {
    timestamps: true, 
})

module.exports = mongoose.model('Album', albumSchema)
