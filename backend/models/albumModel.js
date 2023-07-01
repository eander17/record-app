/** @format */

// file to define the schema for albums

const mongoose = require('mongoose')

const albumSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    discogsId: {
      type: Number,
      required: true,
    },
    masterId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add album title'],
    },
    artist: {
      type: String,
      required: [true, 'Please add artist name'],
    },
    genre: {
      type: String,
      required: [true, 'Please add genre'],
    },
    style: {
      type: String,
      required: false,
    },
    year: {
      type: Number,
      required: [true, 'Please add release year'],
    },
    image: {
      type: String, // url to image
      required: false,
    },
    thumb: {
      type: String, // url to image
      required: false,
    },
    format: {
      type: String,
      required: false,
    },
    dateAdded: {
      type: Date,
      required: true, // formatted as ISODate
      default() {
        return this.createdAt
      },
    },
    trackList: {
      type: Array,
      required: false,
    },
    runtime: {
      type: Number, // in seconds (integer)
      required: true,
      default() {
        if (this.trackList && this.trackList.length > 0) {
          return this.trackList.reduce((acc, track) => {
            return acc + (track.duration ?? 0)
          }, 0)
        }
        return 0 // or any other default value you want to set
      },
    },
    customFields: {
      type: Map, // allows for any key/value pair
      of: mongoose.Schema.Types.Mixed, // allows for any type of value
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Album', albumSchema)
