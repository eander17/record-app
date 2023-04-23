import {io}  from 'socket.io-client'

const socket = io('http://localhost:5000')


socket.on('connect', () => {
  console.log(`socket connected: ${socket.connected}`)
}) 

// SECTION emitters

const joinAlbumRoom = ({discogId, user}) => {
  console.log(`emitting joinAlbumRoom event with data: ${discogId}, ${user._id}`)
  socket.emit('joinAlbumRoom', { room: discogId, id: user._id })
}

const emitCustomFieldUpdate = ({ discogId, user, key, value }) => {
  console.log(`emitting customFieldUpdate event with data: ${discogId}, ${user}, ${key}, ${value}`)
  socket.emit('emitCustomFieldUpdate', { room: discogId, id: user, key: key, value: value })
}

// SECTION listeners

// const addCustomFieldUpdateListener = (callback) => {
//   socket.on('notifyCustomFieldUpdate', (data) => {
//     const { discogId, key, value } = data
//     console.log(`socket.js received notifyCustomFieldUpdate event with data: ${discogId}, ${key}, ${value}`)
//     callback(data)
//   })

//   // return a function to remove the listener
//   return () => {
//     socket.off('notifyCustomFieldUpdate', callback)
//   }
// }




export { joinAlbumRoom, emitCustomFieldUpdate }

export default socket


// socket.on('connection', () => {
//   console.log(`socket connected: ${socket.connected}`)
// })

// socket.on('disconnect', () => {
//   console.log(`socket disconnected: ${socket.connected}`)
// })

// socket.on('customFieldUpdate', (data) => {
//   console.log(`socket.js received customFieldUpdate event with data: ${data}`)
// })

// socket.on('joinAlbumRoom', (data) => {
//   console.log(`socket.js received joinAlbumRoom event with data: ${data}`)
// })

// const emitCustomFieldUpdate = (data) => {
//   console.log(`emitting customFieldUpdate event with data: ${data}`)
//   socket.emit('customFieldUpdate', data)
// }


// export {  }


