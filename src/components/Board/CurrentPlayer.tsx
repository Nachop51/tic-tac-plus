import { useGameStore } from '../../store/game'
import { CircleIcon, CrossIcon } from '../icons'

const CurrentPlayer = () => {
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const gameResult = useGameStore((state) => state.gameResult)

  return (
    <>
      {
      !gameResult && (
        <div className='border border-gray-400 rounded-lg bg-gray-800/50 w-fit mx-auto mt-8'>
          {currentPlayer === 'X'
            ? <CrossIcon />
            : <CircleIcon />}
        </div>
      )
    }
    </>
  )
}

export default CurrentPlayer
