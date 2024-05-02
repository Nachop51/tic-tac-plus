import { create } from 'zustand'
import { Cell, Move, MoveHistory } from '../types'
import { checkDraw, checkWinner, createBoard } from '../utils/board'
import { BOARD_SIZE } from '../lib/constants'

interface Game {
  currentPlayer: 'X' | 'O'
  board: Cell[]
  moveHistory: MoveHistory
  gameResult: 'X' | 'O' | 'draw' | null
  placeMark: (index: number) => void
  placeHover: (index: number) => void
  removeHover: (index: number) => void
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
    placeMark: (index: number) => {
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

        newBoard[index] = {
          current: state.currentPlayer,
          hoveredPlayer: null
        }

        const gameResult = checkWinner(newBoard) || (checkDraw(newBoard) ? 'draw' : null)

        const newMove: Move = {
          cell: newBoard[index],
          pos: index
        }

        const moveHistory = [...state.moveHistory, newMove]

        console.log({ moveHistory })
        console.log({ newMove })

        return {
          board: newBoard,
          currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
          gameResult,
          moveHistory
        }
      })
    },
    placeHover: (index: number) => {
      set((state) => {
        if (state.gameResult) return state
        const newBoard = [...state.board]
        newBoard[index].hoveredPlayer = state.currentPlayer
        return { board: newBoard }
      })
    },
    removeHover: (index: number) => {
      set((state) => {
        if (state.gameResult) return state
        const newBoard = [...state.board]
        newBoard[index].hoveredPlayer = null
        return { board: newBoard }
      })
    }
  }
})
