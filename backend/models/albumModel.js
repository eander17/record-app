/** @format */

// file to define the schema for albums

const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
  position: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true, default: 0 },
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
    genres: {
      type: [String],
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
      default: 0,
    },
    listens: {
      type: [String], // array of timestamps
      default: [],
      required: true,
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
