import { BOARD_SIZE } from '../constants'
import { Cell } from '../types'

export function createBoard (size: number): Cell[] {
  const board: Cell[] = []
  for (let i = 0; i < size * size; i++) {
    board.push({ current: null, hoveredPlayer: null })
  }
  return board
}

export function isOccupied (rowIndex: number, cellIndex: number, board: Cell[]) {
  return board[rowIndex * BOARD_SIZE + cellIndex].current !== null
}

export function checkWinner (board: Cell[]): 'X' | 'O' | null {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const line of lines) {
    const [a, b, c] = line
    if (
      board[a].current &&
      board[a].current === board[b].current &&
      board[a].current === board[c].current
    ) {
      return board[a].current
    }
  }

  return null
}

export function checkDraw (board: Cell[]) {
  return board.every(cell => cell.current !== null)
}
