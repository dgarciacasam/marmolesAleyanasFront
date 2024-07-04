export const Nav = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('jwt')
    location.reload()
  }

  return (
    <header className='flex justify-between py-4 px-12 bg-yellow-500 text-neutral-800'>
      <h1 className='text-2xl font-bold cursor-default'>ALEYANAS</h1>
      <nav className='flex justify-between font-semibold space-x-4'>
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
