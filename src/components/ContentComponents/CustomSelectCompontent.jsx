const orderOptions = [
  { key: '', value: 'Fecha de pedido' },
  { key: 'finishDate', value: 'Fecha de finalización' },
  { key: 'name', value: 'Nombre' },
]

export const CustomSelectComponents = ({ order, setOrder }) => {
  const showCustomSelect = () => {
    document.querySelector('#customOptions').classList.toggle('hidden')
  }
  console.log(order)
  const orderName = orderOptions.find((option) => option.key === order).value

  return (
    <div className='flex items-center'>
      <div className='relative'>
        <div
          className='flex p-2 w-full min-w-[15rem] border rounded hover:border-black items-center justify-between space-x-2 cursor-pointer transition text-left'
          onClick={() => showCustomSelect()}
        >
          <div className='flex items-center justify-start gap-2'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='rgb(24 24 27)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-arrows-down-up size-4'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M17 3l0 18' />
              <path d='M10 18l-3 3l-3 -3' />
              <path d='M7 21l0 -18' />
              <path d='M20 6l-3 -3l-3 3' />
            </svg>
            <p className='font-medium pointer-events-none'>{orderName}</p>
          </div>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-chevron-down size-4'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 9l6 6l6 -6' />
          </svg>
        </div>
        <ul
          className='absolute overflow-hidden  w-full bg-white border rounded cursor-pointer z-50 hidden'
          id='customOptions'
        >
          {orderOptions.map((option) => (
            <li
              key={option.key}
              className='box-border hover:bg-gray-300  p-2'
              onClick={() => {
                setOrder(option.key)
                showCustomSelect()
              }}
            >
              <p className='whitespace-nowrap	'>{option.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
