import { create } from 'zustand'
import { Cell } from '../types'
import { checkDraw, checkWinner, createBoard } from '../utils/board'
import { BOARD_SIZE } from '../constants'

interface Game {
  currentPlayer: 'X' | 'O'
  board: Cell[]
  winner: 'X' | 'O' | null
  isDraw: boolean
  placeMark: (rowIndex: number, cellIndex: number) => void
  placeHover: (rowIndex: number, cellIndex: number) => void
  removeHover: (rowIndex: number, cellIndex: number) => void
  resetGame: () => void
}

export const useGameStore = create<Game>()((set) => {
  return {
    currentPlayer: 'X',
    board: createBoard(BOARD_SIZE),
    winner: null,
    isDraw: false,
    resetGame: () => {
      set({ currentPlayer: 'X', board: createBoard(BOARD_SIZE), isDraw: false, winner: null })
    },
    placeMark: (rowIndex, cellIndex) => {
      set((state) => {
        if (state.winner) return state
        const newBoard = [...state.board]
        newBoard[rowIndex * BOARD_SIZE + cellIndex].current = state.currentPlayer
        newBoard[rowIndex * BOARD_SIZE + cellIndex].hoveredPlayer = null

        const winner = checkWinner(newBoard)
        const isDraw = checkDraw(newBoard)

        return { board: newBoard, currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X', winner, isDraw }
      })
    },
    placeHover: (rowIndex, cellIndex) => {
      set((state) => {
        if (state.winner || state.isDraw) return state
        const newBoard = [...state.board]
        newBoard[rowIndex * BOARD_SIZE + cellIndex].hoveredPlayer = state.currentPlayer
        return { board: newBoard }
      })
    },
    removeHover: (rowIndex, cellIndex) => {
      set((state) => {
        if (state.winner || state.isDraw) return state
        const newBoard = [...state.board]
        newBoard[rowIndex * BOARD_SIZE + cellIndex].hoveredPlayer = null
        return { board: newBoard }
      })
    }
  }
})
