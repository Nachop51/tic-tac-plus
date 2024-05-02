import Board from '@/components/Board'
import { GAME_SOCKET_EVENTS } from '@/lib/constants'
import { socket } from '@/lib/socket'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

const Game = ({ roomId }: { roomId?: string }) => {
  const [roomCreated, setRoomCreated] = useState(false)
  const [playerJoined, setPlayerJoined] = useState(false)
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null)
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (roomId) {
      const onRoomNotFound = () => {
        setLocation('/game/error/notFound')
      }

      socket.emit(GAME_SOCKET_EVENTS.JOIN_ROOM, roomId)

      socket.on(GAME_SOCKET_EVENTS.ROOM_NOT_FOUND, onRoomNotFound)

      return () => {
        socket.off(GAME_SOCKET_EVENTS.ROOM_NOT_FOUND, onRoomNotFound)
      }
    }
  }, [roomId, setLocation])

  useEffect(() => {
    if (!roomId) {
      socket.emit(GAME_SOCKET_EVENTS.CREATE_ROOM)

      const onRoomCreated = (roomId: string) => {
        setRoomCreated(true)
        setCurrentRoomId(roomId)
      }

      const onRoomJoined = () => {
        console.log('Player joined')

        setPlayerJoined(true)
      }

      socket.on('game:roomCreated', onRoomCreated)
      socket.on('game:roomJoined', onRoomJoined)

      return () => {
        socket.off('game:roomCreated', onRoomCreated)
        socket.off('game:roomJoined', onRoomJoined)
      }
    }
  }, [roomId])

  return (
    <main className=''>
      {currentRoomId}

      <h3>
        {roomId ? 'Joining room' : 'Creating room...'}
        {roomCreated && ' ✅ Room created'}
      </h3>
      <h3>
        {!roomId && roomCreated && 'Waiting for player to join...'}
        {playerJoined && ' ✅ Player joined'}
      </h3>
      {roomCreated && playerJoined && <Board />}
    </main>
  )
}

export default Game
