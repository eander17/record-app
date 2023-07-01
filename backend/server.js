/** @format */

// ? This is the backend server for the record app
/// packages to import ///
const express = require('express')

const app = express() // express app
const server = require('http').createServer(app)

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'

// td: separate cors from socket.io
// eslint-disable-next-line no-unused-vars
const io = require('socket.io')(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies to be sent with requests
  },
})

const PORT = process.env.PORT || 5000 // Port number
// const fs = require('fs')  //! might break app?
const path = require('path')
const dotenv = require('dotenv')

/// Middleware Section ///

app.use(express.json()) // allows us to use json data
app.use(express.urlencoded({ extended: false })) // allows us to use url encoded data
// middleware requires
const { errorHandler } = require('./middleware/errorMiddleware') // error handler
// error handler

/// Database Section ///
const connectDB = require('./config/db')
// connects to the database
dotenv.config() // loads the environment variables
connectDB() // connects to the database

/// Routing Section ///
app.use('/api/collection', require('./routes/albumCollectionRoutes')) // routes for albums
app.use('/api/users', require('./routes/userRoutes')) // routes for users
app.use('/api/search', require('./routes/discogRoutes')) // routes for discogs search

// register the error handler middleware.
//! !! This middleware must be registered last !!!
app.use(errorHandler)

// td determine if I want to use socket.io - #project
// td refactor socket io to separate file - #server.js
/// Socket IO Section ///
// // add a socket.io connection listener
// const albumUserMap = new Map() // map of album ids to users
// io.on('connection', (socket) => {
//   console.log('client connected: ')

//   // joinAlbumRoom - Listens for a user to join a room
//   // ? room === discogsId
//   // ? id === userId
//   // ? join room listener
//   socket.on('joinAlbumRoom', (data) => {
//     const { room, id } = data
//     socket.join(room)
//     socket.join(id)

//     if (!albumUserMap.has(room)) {
//       albumUserMap.set(room, new Set([id]))
//     } else {
//       albumUserMap.get(room).add(id)
//     }
//   })

//   // listen for events from client
//   socket.on('emitCustomFieldUpdate', (data) => {
//     const { room, id, key, value } = data

//     const albumUsers = albumUserMap.get(room) || new Set() // get the set of users in the room

//     // ? if the user is the only one in the room, don't send the update
//     if (albumUsers.size === 1 && albumUsers.has(id)) return

//     // ? emit the updated custom field data to all connected clients in the room
//     albumUsers.forEach((userId) => {
//       if (userId !== id) {
//         io.to(userId).emit('notifyCustomFieldUpdate', {
//           discogId: room,
//           key,
//           value,
//         })
//       }
//     })
//   })

//   // disconnect listener
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

/// Serve Application ///
// serve front end
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './dist', 'index.html')),
  )
} else {
  app.get('/', (req, res) => res.send('please set to production'))
}

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
