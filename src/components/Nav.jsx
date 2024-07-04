import { useState } from 'react'

export const Nav = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('jwt')
    location.reload()
  }

  return (
    <header className='flex justify-center items-center sm:justify-between py-4 px-6 sm:px-12 bg-yellow-500 text-neutral-800 relative'>
      <h1 className='text-2xl font-bold cursor-default absolute left-1/2 transform -translate-x-1/2 sm:static sm:transform-none sm:translate-x-0'>
        ALEYANAS
      </h1>
      <nav className=' sm:hidden ml-auto'>
        <button
          className='rounded-full p-1'
          onClick={() => {
            setDropdownVisibility(!dropdownVisibility)
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 20h16' />
            <path d='M4 12h16' />
            <path d='M4 4h16' />
          </svg>
        </button>
        <div
          className={`bg-yellow-500 absolute left-60 font-semibold rounded transition-all duration-300 ease-in-out ${
            dropdownVisibility ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
          } overflow-hidden`}
        >
          <button
            className='px-3 py-1 rounded text-center'
            onClick={() => handleLogout()}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <nav className='hidden sm:flex  justify-between font-semibold space-x-4'>
        <button
          className='py-1 px-2 border border-1 border-black rounded hover:bg-neutral-800 hover:text-yellow-400 transition'
          onClick={() => handleLogout()}
        >
          CERRAR SESIÓN
        </button>
      </nav>
    </header>
  )
}
