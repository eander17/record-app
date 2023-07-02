/** @format */

// file to define the schema for albums

const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
  position: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
})

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
    styles: {
      type: [String],
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
      type: [String],
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
      type: [trackSchema],
      required: false,
    },
    runtime: {
      type: Number, // in seconds (integer)
      required: true,
      default() {
        if (this.trackList && this.trackList.length > 0) {
          return this.trackList.reduce(
            (acc, track) => acc + (track.duration ?? 0),
            0,
          )
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

const Album = mongoose.model('Album', albumSchema)
const Track = mongoose.model('Track', trackSchema)

module.exports = {
  Album,
  Track,
}
