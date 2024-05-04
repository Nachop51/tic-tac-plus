export const BOARD_SIZE = 3

export const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

export const GAME_SOCKET_EVENTS = {
  NEW_MOVE: 'game:newMove',
  RESET: 'game:reset',
  JOIN_ROOM: 'game:joinRoom',
  LEAVE_ROOM: 'game:leaveRoom',
  ALL_PLAYERS_READY: 'game:allPlayersReady',
  ROOM_NOT_FOUND: 'game:roomNotFound',
  CREATE_GAME: 'game:createGame',
  GAME_CREATED: 'game:gameCreated'
} as const
