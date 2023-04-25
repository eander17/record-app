// TODO:
// 1. clean out comments
// 2. clean out unused code
// 3. maybe figure out a slice?

import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

socket.on('connect', () => {
  console.log(`socket connected: ${socket.connected}`)

  // Get the user's data from the local storage
  const userData = JSON.parse(localStorage.getItem('userData'))

  // Rejoin the room
  if (userData) {
    joinAlbumRoom({
      discogId: userData.room,
      user: { _id: userData.id },
    })
  }
})

// SECTION emitters

const joinAlbumRoom = ({ discogId, user }) => {
  console.log(
    `emitting joinAlbumRoom event with data: ${discogId}, ${user._id}`
  )
  socket.emit('joinAlbumRoom', { room: discogId, id: user._id })

  // Save the user's data in the local storage
  localStorage.setItem(
    'userData',
    JSON.stringify({ room: discogId, id: user._id })
  )
}

const emitCustomFieldUpdate = ({ discogId, user, key, value }) => {
  console.log(
    `emitting customFieldUpdate event with data: ${discogId}, ${user}, ${key}, ${value}`
  )
  socket.emit('emitCustomFieldUpdate', {
    room: discogId,
    id: user,
    key: key,
    value: value,
  })
}

// SECTION listeners

// Client-side code
socket.on('reconnect', () => {
  console.log('Socket reconnected')

  // Get the user's data from the local storage
  const userData = JSON.parse(localStorage.getItem('userData'))

  // Rejoin the room
  if (userData) {
    joinAlbumRoom({
      discogId: userData.room,
      user: { _id: userData.id },
    })
  }
})


export { joinAlbumRoom, emitCustomFieldUpdate }

export default socket


