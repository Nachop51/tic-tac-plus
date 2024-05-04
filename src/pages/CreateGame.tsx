import { GAME_SOCKET_EVENTS } from '@/lib/constants'
import { socket } from '@/lib/socket'
import { useEffect } from 'react'
import { useLocation } from 'wouter'

const CreateGame = () => {
  const [, setLocation] = useLocation()

  useEffect(() => {
    socket.emit(GAME_SOCKET_EVENTS.CREATE_GAME)

    const onRoomCreated = (roomId: string) => {
      setLocation('/game/' + roomId)
    }

    socket.on(GAME_SOCKET_EVENTS.GAME_CREATED, onRoomCreated)

    return () => {
      socket.off(GAME_SOCKET_EVENTS.GAME_CREATED, onRoomCreated)
    }
  }, [setLocation])

  return (
    <main>
      <h3>Creating room...</h3>
    </main>
  )
}

export default CreateGame
