// file to define the schema for albums

const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    discogsAlbumId: {
        type: Number,
        required: true, 
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

    }, 
    image: {
        type: String,   // url to image
        required: false, 
    }, 
    customFields: {
        type: Map, // allows for any key/value pair
        of: mongoose.Schema.Types.Mixed, // allows for any type of value
        required: false,
    }
}, {
    timestamps: true, 
})

module.exports = mongoose.model('Album', albumSchema)
