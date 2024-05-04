import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Board from '@/components/Board'
import { Button } from '@/components/ui/button'
import { GAME_SOCKET_EVENTS } from '@/lib/constants'
import { socket } from '@/lib/socket'
import type { Player } from '@/types'

type GameProps = {
  roomId: string
}

const Game = ({ roomId }: GameProps) => {
  const [players, setPlayers] = useState<Record<string, Player>>({})
  const [, setLocation] = useLocation()
  const link = `${window.location.origin}/game/${roomId}`

  useEffect(() => {
    const onRoomNotFound = () => {
      setLocation('/game/error/notFound')
    }

    const onAllPlayersReady = (data: Record<string, Player>) => {
      setPlayers(data)
    }

    // Register event listeners
    socket.on(GAME_SOCKET_EVENTS.ROOM_NOT_FOUND, onRoomNotFound)
    socket.on(GAME_SOCKET_EVENTS.ALL_PLAYERS_READY, onAllPlayersReady)

    socket.emit(GAME_SOCKET_EVENTS.JOIN_ROOM, roomId)

    return () => {
      socket.off(GAME_SOCKET_EVENTS.ROOM_NOT_FOUND, onRoomNotFound)
      socket.off(GAME_SOCKET_EVENTS.ALL_PLAYERS_READY, onAllPlayersReady)
    }
  }, [roomId, setLocation])

  if (!players[socket.id!]) {
    return (
      <main className='mt-20 flex flex-col justify-center'>
        <h3>
          Share the link to invite a friend !
        </h3>

        <p className='mb-4'>
          {link}
        </p>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(link)
          }}
        >
          Copy link
        </Button>
      </main>
    )
  }

  return (
    <main className='flex flex-col items-center'>
      <Board player={players[socket.id!]} onlineGame />
    </main>
  )
}

export default Game
