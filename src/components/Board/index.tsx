import { useEffect } from 'react'
import { useGameStore } from '../../store/game'
import DisplayBoard from './DisplayBoard'
import CurrentPlayer from './CurrentPlayer'
import { Button } from '@/components/ui/button'

const Board = () => {
  const gameResult = useGameStore((state) => state.gameResult)
  const moveHistory = useGameStore((state) => state.moveHistory)
  const resetGame = useGameStore((state) => state.resetGame)

  console.log({ moveHistory })

  useEffect(() => {
    console.log({ gameResult })
  }, [gameResult])

  return (
    <section className='w-full max-w-3xl'>
      <DisplayBoard />

      {gameResult && (
        <Button
          className='block mx-auto mt-8'
          onClick={resetGame}
        >
          Play again
        </Button>
      )}

      <CurrentPlayer />
    </section>
  )
}

export default Board
