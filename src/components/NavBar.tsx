import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

const NavBar = ({ isConnected }: { isConnected: boolean}) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='flex justify-between items-center py-2 px-6 sm:px-12 max-w-5xl mx-auto'>
        <Button variant='ghost'>
          <Link to='/' className='text-xl font-semibold'>Tic Tac Plus</Link>
        </Button>
        <div className='flex gap-2 items-center'>
          <div
            className={`rounded-full w-3 h-3 border border-background/60 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
