import { BOARD_SIZE } from '../../constants'
import { useBoard } from '../../hooks/useBoard'
import DisplayBoard from './DisplayBoard'

const Board = () => {
  const { board, currentPlayer, winner, isDraw, placeHover, placeMark, removeHover, resetBoard } = useBoard({ size: BOARD_SIZE })

  return (
    <section>
      <h1 className='text-4xl text-center mb-8'>
        {winner ? `${winner} wins!` : isDraw ? 'Draw!' : `${currentPlayer}'s turn`}
      </h1>

      <DisplayBoard
        currentPlayer={currentPlayer} board={board} placeMark={placeMark}
        placeHover={placeHover} removeHover={removeHover}
      />

      {(winner || isDraw) && (
        <button
          className='block mx-auto mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg'
          onClick={resetBoard}
        >
          Play again
        </button>
      )}
    </section>
  )
}

export default Board
