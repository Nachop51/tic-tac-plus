import { create } from 'zustand'
import { Cell, Move, MoveHistory } from '../types'
import { checkDraw, checkWinner, createBoard } from '../utils/board'
import { BOARD_SIZE } from '../constants'

interface Game {
  currentPlayer: 'X' | 'O'
  board: Cell[]
  moveHistory: MoveHistory
  gameResult: 'X' | 'O' | 'draw' | null
  placeMark: (rowIndex: number, cellIndex: number) => void
  placeHover: (rowIndex: number, cellIndex: number) => void
  removeHover: (rowIndex: number, cellIndex: number) => void
  resetGame: () => void
}

export const useGameStore = create<Game>()((set) => {
  return {
    currentPlayer: 'X',
    board: createBoard(BOARD_SIZE),
    moveHistory: [],
    gameResult: null,
    resetGame: () => {
      set({ currentPlayer: 'X', board: createBoard(BOARD_SIZE), gameResult: null, moveHistory: [] })
    },
    placeMark: (rowIndex, cellIndex) => {
      set((state) => {
        if (state.gameResult) return state

        const newBoard = [...state.board]

        if (state.moveHistory.length >= 5) {
          newBoard[state.moveHistory[state.moveHistory.length - 5].pos].nextToRemove = true
        }

        if (state.moveHistory.length >= 6) {
          newBoard[state.moveHistory[state.moveHistory.length - 6].pos] = {
            current: null,
            hoveredPlayer: null
          }
        }

        newBoard[rowIndex * BOARD_SIZE + cellIndex] = {
          current: state.currentPlayer,
          hoveredPlayer: null
        }

        const gameResult = checkWinner(newBoard) || (checkDraw(newBoard) ? 'draw' : null)

        const newMove: Move = {
          cell: newBoard[rowIndex * BOARD_SIZE + cellIndex],
          pos: rowIndex * BOARD_SIZE + cellIndex
        }

        const moveHistory = [...state.moveHistory, newMove]

        return {
          board: newBoard,
          currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
          gameResult,
          moveHistory
        }
      })
    },
    placeHover: (rowIndex, cellIndex) => {
      set((state) => {
        if (state.gameResult) return state
        const newBoard = [...state.board]
        newBoard[rowIndex * BOARD_SIZE + cellIndex].hoveredPlayer = state.currentPlayer
        return { board: newBoard }
      })
    },
    removeHover: (rowIndex, cellIndex) => {
      set((state) => {
        if (state.gameResult) return state
        const newBoard = [...state.board]
        newBoard[rowIndex * BOARD_SIZE + cellIndex].hoveredPlayer = null
        return { board: newBoard }
      })
    }
  }
})
