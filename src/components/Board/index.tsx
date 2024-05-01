import { useEffect } from 'react'
import { useGameStore } from '../../store/game'
import DisplayBoard from './DisplayBoard'
import CurrentPlayer from './CurrentPlayer'

const Board = () => {
  const gameResult = useGameStore((state) => state.gameResult)
  const moveHistory = useGameStore((state) => state.moveHistory)
  const resetGame = useGameStore((state) => state.resetGame)

  console.log({ moveHistory })

  useEffect(() => {
    console.log({ gameResult })
  }, [gameResult])

  return (
    <section>
      <h1 className='text-4xl text-center mb-8'>
        {
          gameResult === 'draw'
            ? 'Draw!'
            : `${gameResult} wins!`
        }
      </h1>

      <DisplayBoard />

      {(gameResult) && (
        <button
          className='block mx-auto mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg'
          onClick={resetGame}
        >
          Play again
        </button>
      )}

      <CurrentPlayer />
    </section>
  )
}

export default Board
