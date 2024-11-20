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

io.on('connection', (user) => {
  console.log('a user connected', user.id)

  socket.on('chat message', (message) => {
    io.emit('chat message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// Use a different port for the Socket.io server to avoid conflicts with Vite
const PORT = 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`)
})