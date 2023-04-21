const express = require('express')
const router = express.Router()

const {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controllers/collectionController')

const {protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAlbums).post(protect, createAlbum)

router.route('/:id').get(protect, getAlbum).put(protect, updateAlbum).delete(protect, deleteAlbum)



module.exports = router
