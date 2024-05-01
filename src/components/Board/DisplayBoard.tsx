import { BOARD_SIZE } from '../../constants'
import { useGameStore } from '../../store/game'
import { isOccupied } from '../../utils/board'
import { CircleIcon, CrossIcon } from '../icons'

const DisplayBoard = () => {
  const board = useGameStore((state) => state.board)
  const placeHover = useGameStore((state) => state.placeHover)
  const removeHover = useGameStore((state) => state.removeHover)
  const placeMark = useGameStore((state) => state.placeMark)

  const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
    if (isOccupied(rowIndex, cellIndex, board)) return
    placeHover(rowIndex, cellIndex)
  }

  const handleMouseLeave = (rowIndex: number, cellIndex: number) => {
    if (isOccupied(rowIndex, cellIndex, board)) return
    removeHover(rowIndex, cellIndex)
  }

  const handleClick = (rowIndex: number, cellIndex: number) => {
    if (isOccupied(rowIndex, cellIndex, board)) return
    placeMark(rowIndex, cellIndex)
  }

  return (
    <div className='grid grid-cols-3 w-full'>
      {
      board.map((cell, index) => {
        const rowIndex = Math.floor(index / BOARD_SIZE)
        const cellIndex = index % BOARD_SIZE
        return (
          <div
            key={index}
            className='h-auto border border-gray-300 flex items-center justify-center select-none aspect-square p-4'
            onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
            onMouseLeave={() => handleMouseLeave(rowIndex, cellIndex)}
            onClick={() => handleClick(rowIndex, cellIndex)}
          >
            {
              cell.hoveredPlayer
                ? (
                  <span className='opacity-40 grayscale'>
                    {cell.hoveredPlayer === 'X' ? <CrossIcon /> : <CircleIcon />}
                  </span>
                  )
                : (cell.current && (
                  <span className={cell?.nextToRemove ? 'opacity-40' : ''}>
                    {cell.current === 'X' ? <CrossIcon /> : <CircleIcon />}
                  </span>
                  ))
            }
          </div>
        )
      })
    }
    </div>
  )
}

export default DisplayBoard
