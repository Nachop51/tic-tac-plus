export type Player = 'X' | 'O'

export type Cell = {
  current: Player | null
  nextToRemove?: boolean
  hoveredPlayer: Player | null
}

export type Move = {
  pos: number
  cell: Cell
}

export type MoveHistory = Move[]
