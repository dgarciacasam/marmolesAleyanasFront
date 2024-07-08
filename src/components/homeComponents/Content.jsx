import { useEffect, useState } from 'react'
import { getProjects } from '../../services/projects'
import { Project } from './Project'
import { ContentLayout } from '../ContentLayout'
import styles from '../css/Content.module.css'

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
const DAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]
export const Content = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState()
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState()

  const handleSelectProject = (projectId) => {
    const project = projects.find((project) => project.id === projectId)
    setSelectedProject(project)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects()
      setProjects(data)
    }

    fetchData()
  }, [])

  //Filtramos por nombre, dni/nif o fecha
  const filteredProjects = projects.filter((project) => {
    const lowerCaseSearchTerm = search.toLowerCase()
    return (
      project.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.dninif.toLowerCase().includes(lowerCaseSearchTerm) ||
      new Date(project.finishDate)
        .toLocaleDateString('es-ES')
        .includes(lowerCaseSearchTerm)
    )
  })

  //Ordenamos los proyectos por orden de creación por defecto, nombre o fecha de finalización
  filteredProjects.sort((a, b) => {
    if (order === 'name') return a.name.localeCompare(b.name)
    if (order === 'finishDate')
      return new Date(a.finishDate) - new Date(b.finishDate)
    return
  })

  if (selectedProject === undefined) {
    return (
      <ContentLayout title='Pedidos'>
        <div className='flex justify-between'>
          <div className={'flex items-center ' + styles.inputContainer}>
            <input
              type='search'
              placeholder='Buscar'
              className={
                'p-2 border border-1 rounded text-sm focus-visible:outline-none focus:border-black transition ml-2 ' +
                styles.searchInput
              }
              onChange={(e) => setSearch(e.target.value)}
            />
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
                'icon icon-tabler icons-tabler-outline icon-tabler-search '
              }
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
              <path d='M21 21l-6 -6' />
            </svg>
          </div>
          <div className='flex items-center'>
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
                'icon icon-tabler icons-tabler-outline icon-tabler-arrows-down-up ' +
                styles.bounce
              }
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M17 3l0 18' />
              <path d='M10 18l-3 3l-3 -3' />
              <path d='M7 21l0 -18' />
              <path d='M20 6l-3 -3l-3 3' />
            </svg>
            <select
              name='orderSelect'
              className='font-medium ml-2 p-1 border rounded focus:rounded hover:border-black focus-visible:rounded focus-visible:outline-none transition'
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value=''>Fecha de pedido</option>
              <option value='name'>Nombre</option>
              <option value='finishDate'>Fecha de finalización</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4'>
          {filteredProjects.map((project) => {
            const date = new Date(project.finishDate)
            const formattedDate = `${
              DAYS[date.getUTCDay()]
            } ${date.getUTCDate()} de ${
              MONTHS[date.getMonth()]
            } de ${date.getFullYear()}`
            return (
              <div
                className='bg-neutral-50 hover:bg-yellow-400 hover:scale-110 cursor-pointer transition p-4 font-medium shadow-lg rounded'
                onClick={() => handleSelectProject(project.id)}
                key={project.id}
              >
                <h3 className='text-lg font-bold'>
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
                    - {project.phone}{' '}
                    {project.altphone !== null && `// ${project.altphone}`}
                  </span>
                </p>
                <p className='flex space-x-1'>
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
                    className='icon icon-tabler icons-tabler-outline icon-tabler-mail'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z' />
                    <path d='M3 7l9 6l9 -6' />
                  </svg>
                  <span>- {project.email}</span>
                </p>
                <p className='flex space-x-1'>
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
                    className='icon icon-tabler icons-tabler-outline icon-tabler-map-2'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5' />
                    <path d='M9 4v13' />
                    <path d='M15 7v5.5' />
                    <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z' />
                    <path d='M19 18v.01' />
                  </svg>
                  <span>
                    {' '}
                    - {project.address || 'Preguntar dirección del nicho'}
                  </span>
                </p>
                {project.finishDate !== null && (
                  <p className='mt-3 font-semibold'>
                    Fecha entrega: <span>{formattedDate}</span>
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout
      title={selectedProject.name + ' - ' + selectedProject.dninif}
      button={true}
      setSelectedProject={setSelectedProject}
    >
      <Project
        project={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </ContentLayout>
  )
}
