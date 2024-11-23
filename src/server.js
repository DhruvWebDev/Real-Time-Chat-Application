import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server port
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('join room', (room) => {
    socket.join(room)
    console.log(`User joined room: ${room}`)
  })

  socket.on('leave room', (room) => {
    socket.leave(room)
    console.log(`User left room: ${room}`)
  })

  socket.on('chat message', (message) => {
    io.to(message.room).emit('chat message', message)
    console.log(message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

const PORT = 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`)
})