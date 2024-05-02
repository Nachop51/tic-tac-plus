import { useGameStore } from '../../store/game'
import { isOccupied } from '../../utils/board'
import { CircleIcon, CrossIcon } from '../icons'
import { socket } from '@/lib/socket'

const DisplayBoard = () => {
  const board = useGameStore((state) => state.board)
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const placeHover = useGameStore((state) => state.placeHover)
  const removeHover = useGameStore((state) => state.removeHover)
  const placeMark = useGameStore((state) => state.placeMark)

  const handleMouseEnter = (index: number) => {
    if (isOccupied(index, board)) return
    placeHover(index)
  }

  const handleMouseLeave = (index: number) => {
    if (isOccupied(index, board)) return
    removeHover(index)
  }

  const handleClick = (index: number) => {
    if (isOccupied(index, board)) return

    socket.emit('game:newMove', { pos: index, player: currentPlayer })
    placeMark(index)
  }

  return (
    <div className='grid grid-cols-3 w-full'>
      {
      board.map((cell, index) => {
        return (
          <div
            key={index}
            className='h-auto border border-gray-300 flex items-center justify-center select-none aspect-square p-4'
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleClick(index)}
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
