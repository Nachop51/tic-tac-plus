export type Cell = {
  current: 'X' | 'O' | null
  nextToRemove?: boolean
  hoveredPlayer: 'X' | 'O' | null
}

export type Move = {
  pos: number
  cell: Cell
}

export type MoveHistory = Move[]
