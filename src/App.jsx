import './App.css'
import '@fontsource-variable/inter'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { Toaster } from 'sonner'
import { useEffect, useState } from 'react'
function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState()

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    if (jwt != null) {
      setIsLogged(true)
    }
  }, [])

  if (isLogged) {
    return (
      <>
        <Toaster />
        <Home username={username} />
      </>
    )
  }

  return (
    <>
      <Toaster />
      <Login setIsLogged={setIsLogged} setUser={setUsername} />
    </>
  )
}

export default App
