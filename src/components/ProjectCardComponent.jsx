import { DAYS, MONTHS } from '../services/utils'

export const ProjectCardComponent = ({
  project,
  handleSelectProject,
  setProjectToDelete,
  setShowDeleteModal,
  setShowUpdateModal,
  setProjectToUpdate,
}) => {
  const date = new Date(project.finishDate)
  const formattedDate = `${DAYS[date.getUTCDay()]} ${date.getUTCDate()} de ${
    MONTHS[date.getMonth()]
  } de ${date.getFullYear()}`
  return (
    <div className='relative' key={project.id}>
      <button
        className='absolute right-8 -top-3 p-2 bg-stone-200 border  hover:bg-[#FF5733] rounded-full  transition'
        onClick={() => {
          setProjectToUpdate(project)
          setShowUpdateModal(true)
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
          className='icon icon-tabler icons-tabler-outline icon-tabler-pencil'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4' />
          <path d='M13.5 6.5l4 4' />
        </svg>
      </button>
      <button
        className='absolute -right-5 -top-3 p-2 bg-stone-200 border hover:text-white hover:bg-[#FF5733] rounded-full  transition'
        onClick={() => {
          setProjectToDelete(project)
          setShowDeleteModal(true)
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
          className='icon icon-tabler icons-tabler-outline icon-tabler-trash'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 7l16 0' />
          <path d='M10 11l0 6' />
          <path d='M14 11l0 6' />
          <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
          <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
        </svg>
      </button>
      <div
        className='bg-neutral-50 hover:bg-[#FFFAA0] cursor-pointer transition p-4 font-medium shadow-lg rounded'
        onClick={() => handleSelectProject(project.id)}
        key={project.id}
      >
        <h3 className='text-xl font-bold'>
          {project.name} - {project.dninif}
        </h3>
        <p className='mt-3 flex space-x-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-phone'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
          </svg>
          <span>
            {project.phone}{' '}
            {project.altphone !== null && `// ${project.altphone}`}
          </span>
        </p>
        <p className='flex space-x-1'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-mail'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z' />
            <path d='M3 7l9 6l9 -6' />
          </svg>
          <span> {project.email}</span>
        </p>
        <p className='flex space-x-1'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-map-2'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5' />
            <path d='M9 4v13' />
            <path d='M15 7v5.5' />
            <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z' />
            <path d='M19 18v.01' />
          </svg>
          <span> {project.address || 'Preguntar dirección del nicho'}</span>
        </p>
        {project.finishDate !== null && (
          <p className='mt-3 font-semibold'>
            Fecha entrega: <span>{formattedDate}</span>
          </p>
        )}
      </div>
    </div>
  )
}
