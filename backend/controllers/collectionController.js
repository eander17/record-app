const asyncHandler = require('express-async-handler')

const Album = require('../models/albumModel')
const User = require('../models/userModel')

// @desc    Fetch all albums
// @route   GET /api/albums
// @access  Public
const getAlbums = asyncHandler(async (req, res) => {
  try {
    const collection = await Album.find({ user: req.user.id })
    res.status(200).json(collection)
  } catch {
    res.status(400)
    throw new Error('Albums not found')
  }
})

// @desc    Fetch single album
// @route   GET /api/albums/:id
// @access  Public
const getAlbum = asyncHandler(async (req, res) => {

  const album = await Album.findById(req.params.id)

  // if album exists, send it back
  if (album) {
    res.status(200).json(album)
  } else {
    res.status(400)
    throw new Error('Album not found')
  }
})


// @desc    Create an album
// @route   POST /api/albums
// @access  Private
const createAlbum = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.artist ||
    !req.body.genre ||
    !req.body.year ||
    !req.body.discogsId
  ) {
    res.status(400)
    throw new Error('Please fill out all fields create album')
  }

  // create the album
  const album = await Album.create({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    year: req.body.year,
    image: req.body.image,
    customFields: {},
    discogsAlbumId: req.body.discogsId,
    user: req.user.id, // this is the user id
  })
  // add the album to the user's collection
  res.status(201).json(album)
})

// @desc    Update an album
// @route   PUT /api/albums/:id
// @access  Private
const updateAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id)

  if (!album) {
    res.status(400)
    throw new Error('Album not found')
  }

  // verify user exists and is authorized
  //validateUser(album, await User.findById(req.user), res)

  const user = await User.findById(req.user.id)
  // verify user exists
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // verify user is authorized
  if (album.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the updated album
  })

  res.status(200).json(updatedAlbum)
})

// @desc    Delete an album
// @route   DELETE /api/albums/:id
// @access  Private
const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id)

  if (!album) {
    res.status(400)
    throw new Error('Album not found')
  }

  // // verify user exists and is authorized
  // validateUser(album, await Album.findById(req.user), res)

  const user = await User.findById(req.user.id)
  // verify user exists
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // verify user is authorized
  if (album.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await album.deleteOne() // delete the album

  res.status(200).json({ id: req.params.id })
})

// helper function to validate user
const validateUser = (album, user, res) => {
  // verify user exists
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // verify user is authorized
  if (album.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
}

module.exports = {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
}
