const mongoose = require('mongoose')
const Album = require('../../models/albumModel')

// todo - make this work lol

const MONGO_URI =
  'mongodb+srv://eander17:eander17@mystudentcluster.mi5ugmj.mongodb.net/recordApp?retryWrites=true&w=majority'

async function updateAlbums() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')

    // retrieve existing albums
    const albums = await Album.find()

    // eslint-disable-next-line no-restricted-syntax
    for (const album of albums) {
      album.trackList = album.trackList || []
      // eslint-disable-next-line no-await-in-loop
      await album.save()
    }
    console.log('Albums updated successfully')
  } catch (err) {
    console.error('Error updating albums:', err)
  } finally {
    mongoose.disconnect()
  }
}

updateAlbums()
