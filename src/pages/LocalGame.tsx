import Board from '@/components/Board'

const LocalGame = () => {
  return (
    <main className='flex flex-col items-center'>
      <Board onlineGame={false} />
    </main>
  )
}

export default LocalGame
