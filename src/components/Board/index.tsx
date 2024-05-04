import { useGameStore } from '../../store/game'
import DisplayBoard from './DisplayBoard'
import CurrentPlayer from './CurrentPlayer'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { socket } from '@/lib/socket'
import type { Move, Player } from '@/types'
import { GAME_SOCKET_EVENTS } from '@/lib/constants'

type BoardProps = {
  player?: Player
  onlineGame: boolean
}

const Board = ({ player, onlineGame }: BoardProps) => {
  const gameResult = useGameStore((state) => state.gameResult)
  const placeMark = useGameStore((state) => state.placeMark)
  const resetGame = useGameStore((state) => state.resetGame)

  const handleClick = () => {
    socket.emit(GAME_SOCKET_EVENTS.RESET)
    resetGame()
  }

  useEffect(() => {
    if (!onlineGame) return

    function onNewMove (move: Move) {
      placeMark(move.pos)
    }

    socket.on(GAME_SOCKET_EVENTS.RESET, resetGame)
    socket.on(GAME_SOCKET_EVENTS.NEW_MOVE, onNewMove)

    return () => {
      socket.off(GAME_SOCKET_EVENTS.RESET, resetGame)
      socket.off(GAME_SOCKET_EVENTS.NEW_MOVE, onNewMove)
    }
  }, [resetGame, placeMark, onlineGame])

  return (
    <section className='w-full max-w-lg'>
      <DisplayBoard player={player} onlineGame={onlineGame} />

      {gameResult && (
        <Button
          className='block mx-auto mt-8'
          onClick={handleClick}
        >
          Play again
        </Button>
      )}

      <CurrentPlayer player={player} />
    </section>
  )
}

export default Board
