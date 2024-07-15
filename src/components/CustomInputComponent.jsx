import styles from './css/NewProjectButton.module.css'

export const CustomInputComponent = ({ setSearch }) => {
  return (
    <div className='flex items-center'>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={
              'icon icon-tabler icons-tabler-outline icon-tabler-search w-5 h-5'
            }
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
            <path d='M21 21l-6 -6' />
          </svg>
        </div>
        <input
          type='text'
          className={
            'border border-1 text-sm rounded  w-full ps-10 p-2.5 focus-visible:outline-none focus:border-black transition ' +
            styles.searchInput
          }
          placeholder='Buscar'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
