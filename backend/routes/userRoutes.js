const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

// 3 routes: to register, login, and get user profile

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

module.exports = router
