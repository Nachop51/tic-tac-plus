import type { Player } from '@/types'
import { useGameStore } from '../../store/game'
import { CircleIcon, CrossIcon } from '../icons'

type CurrentPlayerProps = {
  player?: Player
}

const CurrentPlayer = ({ player }: CurrentPlayerProps) => {
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const gameResult = useGameStore((state) => state.gameResult)

  if (gameResult) {
    return null
  }

  return (
    <div className={`border border-gray-400 rounded-lg mx-auto mt-8 w-full max-w-24 p-2 ${player === currentPlayer ? 'bg-accent-foreground/20' : 'bg-card'}`}>
      {
        currentPlayer === 'X'
          ? <CrossIcon />
          : <CircleIcon />
      }
    </div>
  )
}

export default CurrentPlayer
