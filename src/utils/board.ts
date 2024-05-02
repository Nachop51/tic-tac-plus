import { BOARD_SIZE, WINNING_COMBOS } from '../lib/constants'
import { Cell } from '../types'

export function createBoard (size: number): Cell[] {
  const board: Cell[] = []
  for (let i = 0; i < size * size; i++) {
    board.push({ current: null, hoveredPlayer: null })
  }
  return board
}

export function isOccupied (index: number, board: Cell[]) {
  const rowIndex = Math.floor(index / BOARD_SIZE)
  const cellIndex = index % BOARD_SIZE

  return board[rowIndex * BOARD_SIZE + cellIndex].current !== null
}

export function checkWinner (board: Cell[]): 'X' | 'O' | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo
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
