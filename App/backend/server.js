// Description: This is the backend server for the record app
// packages to import
const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000 // Port number

const app = express()
const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const path = require('path')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv')

// middleware requres
const { errorHandler } = require('./middleware/errorMiddleware') // error handler
// error handler
app.use(errorHandler)
// my Files
const connectDB = require('./config/db') // connects to the database

dotenv.config() // loads the environment variables
connectDB() // connects to the database

const albumUserMap = new Map() // map of album ids to users

app.use(express.json()) // allows us to use json data
app.use(express.urlencoded({ extended: true })) // allows us to use url encoded data

app.use('/api/collection', require('./routes/albumCollectionRoutes')) // routes for albums
app.use('/api/users', require('./routes/userRoutes')) // routes for users
app.use('/api/search', require('./routes/discogRoutes')) // routes for discogs search

// // serve front end
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => res.send('please set to production'))
// }

console.log(
  `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
)

// add a socket.io connection listener
io.on('connection', (socket) => {
  console.log('client connected: ', socket.id)
  console.log('socketysock')

  // room === discogsId
  // id === userId
  // join room listener
  socket.on('joinAlbumRoom', (data) => {
    const { room, id } = data
    console.log(`user ${id} joined room ${room}`)
    socket.join(room)
    socket.join(id)

    if (!albumUserMap.has(room)) {
      albumUserMap.set(room, new Set([id]))
    } else {
      albumUserMap.get(room).add(id)
    }
  })

  // TODO remove user from room when they delete the album

  // listen for events from client
  socket.on('emitCustomFieldUpdate', (data) => {
    const { room, id, key, value } = data

    console.log(
      `in room ${room} received update from ${id} for custom field ${key} with value ${value}`
    )

    const albumUsers = albumUserMap.get(room) || new Set() // get the set of users in the room

    // if the user is the only one in the room, don't send the update
    if (albumUsers.size === 1 && albumUsers.has(id)) {
      console.log('user is the only one in the room, not sending update')
      return
    }

    // emit the updated custom field data to all connected clients in the room
    albumUsers.forEach((userId) => {
      if (userId !== id) {
        console.log(`userId: ${userId} id: ${id}`)
        console.log(
          `sending update to ${userId} params: ${room}, ${key}, ${value}`
        )
        // io.to(userId).emit('notifyCustomFieldUpdate', { room, key, value })
        io
          .to(userId)
          .emit('notifyCustomFieldUpdate', { discogId: room, key: key, value: value })
      }
    })
  })

  // disconnect listener
  socket.on('disconnect', (reason) => {
    console.log(`user disconnected: ${reason}`)
  })
})

// setInterval(() => {
//   //io.to('customFieldUpdate').emit('customFieldUpdate', { key: 'deez', value: 'nuts' })
// })

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
