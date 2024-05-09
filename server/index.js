import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

import registerGameHandlers from './handlers/game.js'

const app = express()
app.use(cors(
  { origin: ['http://localhost:5173'] }
))

const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 3000
  },
  cors: { origin: ['http://localhost:5173'] }
})

app.use(logger('dev'))
app.use(express.json())

io.on('connection', async (socket) => {
  console.log(`New connection: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`)
  })

  registerGameHandlers(io, socket)
})

const port = process.env.PORT ?? 3000

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
