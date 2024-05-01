import Board from './components/Board/'
import NavBar from './components/NavBar'

function App () {
  return (
    <>
      <NavBar />
      <main className='min-h-[calc(100vh-57px)] flex flex-col items-center w-full p-6 sm:p-12'>
        <Board />
      </main>
    </>
  )
}

export default App
