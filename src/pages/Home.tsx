import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

const Home = () => {
  return (
    <main>
      <h1>
        Tic tac plus game!
      </h1>
      <p>
        Plus? what you mean by plus? Well... It just consists in the classic one, is a 3x3 grid and the first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner. But in this version, once 6 marks are placed, the first one is removed, so you have to be careful with your strategy.
      </p>
      <h2>
        Play online with your friends!
      </h2>
      <p>
        You can create a{' '}
        <Link
          to='/game'
          className='font-medium text-primary underline underline-offset-4'
        >
          private match
        </Link>
        {' '}and share the link with your friends!
        <br /> or just play locally, against the computer or with a friend.
      </p>

      <Button
        variant='default'
        asChild
      >
        <Link to='/game' className='mt-10'>
          Play now!
        </Link>
      </Button>

      <h2>Or just play locally!</h2>

      <p>
        You can play against the computer or with a friend.
      </p>

      <Button
        variant='default'
        asChild
      >
        <Link to='/local-game' className='mt-10'>
          Play locally!
        </Link>
      </Button>
    </main>
  )
}

export default Home
