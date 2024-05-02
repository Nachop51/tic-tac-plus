import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

const GameNotFound = () => {
  return (
    <main>
      <h1>
        404 Game not found
      </h1>
      <p>
        The game you are looking for does not exist.
      </p>
      <Button asChild className='mt-4'>
        <Link to='/'>Go back</Link>
      </Button>
    </main>
  )
}

export default GameNotFound
