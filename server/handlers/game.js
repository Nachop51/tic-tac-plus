import { GAME_SOCKET_EVENTS } from '../constants.js'

/**
 *
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
export default function (io, socket) {
  socket.on(GAME_SOCKET_EVENTS.CREATE_GAME, () => {
    const roomId = crypto.getRandomValues(new Uint32Array(1))[0].toString(16)

    socket.join(roomId)

    socket.room = roomId

    socket.emit(GAME_SOCKET_EVENTS.GAME_CREATED, roomId)
  })

  socket.on(GAME_SOCKET_EVENTS.JOIN_ROOM, (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId)

    if (!room) {
      socket.emit(GAME_SOCKET_EVENTS.ROOM_NOT_FOUND, roomId)
      return
    }

    if (room.size === 1 && room.has(socket.id)) {
      return
    }

    if (room.size > 1 && !room.has(socket.id)) {
      console.log('Room is full')
      socket.emit(GAME_SOCKET_EVENTS.ROOM_NOT_FOUND, roomId)
      return
    }

    if (room.has(socket.id)) {
      return
    }

    socket.join(roomId)

    socket.room = roomId

    console.log({ room })

    const first = Array.from(room.values())[0]
    const second = socket.id

    const firstTurn = Math.random() > 0.5 ? 'X' : 'O'

    const players = {
      [first]: firstTurn,
      [second]: firstTurn === 'X' ? 'O' : 'X'
    }

    // console.log({ players })

    // Emit to all sockets in the room
    io.sockets.in(roomId).emit(GAME_SOCKET_EVENTS.ALL_PLAYERS_READY, players)
  })

  socket.on(GAME_SOCKET_EVENTS.LEAVE_ROOM, (roomId) => {
    socket.leave(roomId)
  })

  socket.on(GAME_SOCKET_EVENTS.NEW_MOVE, (move) => {
    console.log(move)

    socket.to(socket.room).emit(GAME_SOCKET_EVENTS.NEW_MOVE, move)
  })

  socket.on(GAME_SOCKET_EVENTS.RESET, () => {
    socket.to(socket.room).emit(GAME_SOCKET_EVENTS.RESET)
  })
}
