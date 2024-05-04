import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { socket } from './lib/socket'
import HomePage from './pages/Home'
import { Switch, Route } from 'wouter'
import GamePage from './pages/Game'
import GameNotFound from './pages/GameNotFound'
import CreateGamePage from './pages/CreateGame'

function App () {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect () {
      setIsConnected(true)
    }

    function onDisconnect () {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <>
      <NavBar isConnected={isConnected} />

      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
        <Route path='/game'>
          <CreateGamePage />
        </Route>
        <Route path='/game/:roomId'>
          {(params) => <GamePage roomId={params.roomId} />}
        </Route>
        <Route path='/game/error/notFound'>
          <GameNotFound />
        </Route>
        <Route>
          404
        </Route>
      </Switch>
    </>
  )
}

export default App
