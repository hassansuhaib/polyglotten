const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server, {
  cors: {
    orgin: ['http://localhost:3000'],
  },
})

const users = {}

const socketToRoom = {}

io.on('connection', (socket) => {
  console.log('Making connection')
  socket.on('join room', (roomID) => {
    console.log('Joining room')
    if (users[roomID]) {
      const length = users[roomID].length
      if (length === 4) {
        socket.emit('room full')
        return
      }
      users[roomID].push(socket.id)
    } else {
      users[roomID] = [socket.id]
    }
    socketToRoom[socket.id] = roomID
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id)

    socket.emit('all users', usersInThisRoom)
  })

  socket.on('sending signal', (payload) => {
    console.log('Sending signal')
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    })
  })

  socket.on('returning signal', (payload) => {
    console.log('Returning signal')
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
    })
  })

  socket.on('disconnect', () => {
    console.log('Disconnecting')
    const roomID = socketToRoom[socket.id]
    let room = users[roomID]
    if (room) {
      room = room.filter((id) => id !== socket.id)
      users[roomID] = room
    }
    socket.broadcast.emit('user left', socket.id)
  })
  console.log('We here')
})

server.listen(7000, () => console.log('server is running on port 7000'))
