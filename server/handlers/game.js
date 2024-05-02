const moves = []

/**
 *
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
export default function (io, socket) {
  socket.on('game:createRoom', () => {
    const roomId = crypto.getRandomValues(new Uint32Array(1))[0].toString(16)

    console.log({ roomId })

    socket.leave(socket.room)
    socket.join(roomId)

    socket.room = roomId

    socket.emit('game:roomCreated', roomId)
  })

  socket.on('game:joinRoom', (roomId) => {
    console.log('Joining room:', roomId)

    socket.leave(socket.room)

    const room = io.sockets.adapter.rooms.get(roomId)

    if (!room) {
      socket.emit('game:roomNotFound', roomId)
      return
    }

    socket.join(roomId)

    socket.room = roomId

    socket.to(roomId).emit('game:roomJoined', roomId)
  })

  socket.on('game:newMove', (move) => {
    console.log(move)

    moves.push(move)

    socket.broadcast.emit('game:newMove', move)
  })

  socket.on('game:reset', () => {
    console.log({ moves })
    moves.length = 0

    io.emit('game:reset')
  })
}
