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
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
})

// Middleware to log all events
io.use((socket, next) => {
  console.log('New connection attempt:', socket.handshake.address)
  next()
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Handle room joining
  socket.on('join-room', (room) => {
    socket.join(room)
    console.log(`User ${socket.id} joined room: ${room}`)
    // Notify room of new user
    socket.to(room).emit('user-joined', { userId: socket.id, room })
  })

  // Handle room leaving
  socket.on('leave-room', (room) => {
    socket.leave(room)
    console.log(`User ${socket.id} left room: ${room}`)
    // Notify room that user left
    socket.to(room).emit('user-left', { userId: socket.id, room })
  })

  // Handle chat messages
  socket.on('chat-message', (message) => {
    console.log(`New message in room ${message.room}:`, message)
    // Broadcast the message to the room
    io.to(message.room).emit('chat-message', {
      ...message
    })
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    // Notify all rooms this user was in
    const rooms = Array.from(socket.rooms)
    rooms.forEach(room => {
      if (room !== socket.id) { // socket.id is also treated as a room
        io.to(room).emit('user-left', { userId: socket.id, room })
      }
    })
  })

  // Handle errors
  socket.on('error', (error) => {
    console.error('Socket error:', error)
  })
})

// Error handling for the server
io.engine.on("connection_error", (err) => {
  console.error('Connection error:', err)
})

const POeRT = 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
  console.log(`Allowed origins: ${io.opts.cors.origin}`)
})