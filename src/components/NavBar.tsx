import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'

const NavBar = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='p-2 flex justify-between items-center'>
        <Button variant='ghost' className='text-xl font-semibold'>
          Tic Tac Plus
        </Button>
        <ModeToggle />
      </nav>
    </header>
  )
}

export default NavBar
