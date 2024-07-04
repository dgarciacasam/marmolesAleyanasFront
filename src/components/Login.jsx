import { useState } from 'react'
import { login } from '../services/auth'

export const Login = ({ setIsLogged, setUser }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleLogin = async (username, password) => {
    const response = await login(username, password)
    if (response != null) {
      sessionStorage.setItem('jwt', response.accesToken)
      setUser(response.username)
      setIsLogged(true)
    }
  }

  return (
    <main className='flex flex-col justify-center items-center min-h-screen min-w-screen p-4 bg-[#e9e9e9]'>
      <div className='flex flex-col border border-1 p-8 bg-white text-neutral-800 rounded-xl text-center'>
        <h1 className='text-2xl font-semibold'>MARMOLES ALEYANAS</h1>
        <h2 className='mt-4 text-xl'>Iniciar sesión</h2>
        <div className='flex flex-col h-full lg:min-w-96 lg:min-h-64 mt-2'>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='icon icon-tabler icons-tabler-filled icon-tabler-user w-5 h-5 text-gray-500'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
                <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
              </svg>
            </div>
            <input
              type='text'
              id='username'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 '
              placeholder='Usuario'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='relative mt-2'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='icon icon-tabler icons-tabler-filled icon-tabler-lock w-5 h-5 text-gray-500'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3' />
              </svg>
            </div>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-neutral-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 transition'
              placeholder='Contraseña'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>

          <button className='text-left mt-8 hover:underline transition'>
            ¿Has olvidado tu contraseña?
          </button>
          <button
            className='justify-self-end border border-1 border-gray-300 rounded-lg hover:bg-neutral-800 hover:text-white transition px-4 py-2 mt-1'
            onClick={() => handleLogin(username, password)}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </main>
  )
}
