import { useEffect } from 'react'
import { useGameStore } from '../../store/game'
import DisplayBoard from './DisplayBoard'

const Board = () => {
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const winner = useGameStore((state) => state.winner)
  const isDraw = useGameStore((state) => state.isDraw)
  const resetGame = useGameStore((state) => state.resetGame)

  useEffect(() => {
    console.log('winner', winner)
  }, [winner, isDraw])

  return (
    <section>
      <h1 className='text-4xl text-center mb-8'>
        {winner ? `${winner} wins!` : isDraw ? 'Draw!' : `${currentPlayer}'s turn`}
      </h1>

      <DisplayBoard />

      {(winner || isDraw) && (
        <button
          className='block mx-auto mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg'
          onClick={resetGame}
        >
          Play again
        </button>
      )}
    </section>
  )
}

export default Board
