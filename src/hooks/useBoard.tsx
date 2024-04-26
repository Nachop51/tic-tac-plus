import { useEffect, useState } from 'react'
import { checkDraw, checkWinner, createBoard, isOccupied } from '../utils/board'
import { Cell } from '../types'

interface useBoardProps {
  size: number
}

export const useBoard = ({ size }: useBoardProps) => {
  const [board, setBoard] = useState<Cell[]>(createBoard(size))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<'X' | 'O' | null>(null)
  const [isDraw, setIsDraw] = useState(false)

  useEffect(() => {
    const winner = checkWinner(board)

    if (winner) setWinner(winner)

    const isDraw = checkDraw(board)

    if (isDraw) setIsDraw(true)
  }, [board])

  const placeMark = (rowIndex: number, cellIndex: number) => {
    if (winner) return
    if (isOccupied(rowIndex, cellIndex, board)) return

    const newBoard = [...board]
    newBoard[rowIndex * size + cellIndex].current = currentPlayer
    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const placeHover = (rowIndex: number, cellIndex: number) => {
    if (winner) return
    const newBoard = [...board]
    newBoard[rowIndex * size + cellIndex].hoveredPlayer = currentPlayer
    setBoard(newBoard)
  }

  const removeHover = (rowIndex: number, cellIndex: number) => {
    if (winner) return
    const newBoard = [...board]
    newBoard[rowIndex * size + cellIndex].hoveredPlayer = null
    setBoard(newBoard)
  }

  const resetBoard = () => {
    setBoard(createBoard(size))
    setCurrentPlayer('X')
    setWinner(null)
    setIsDraw(false)
  }

  return { board, currentPlayer, winner, isDraw, placeMark, removeHover, placeHover, resetBoard }
}
