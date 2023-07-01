/** @format */

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1]

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401) // means not authorized
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401) // means not authorized
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
