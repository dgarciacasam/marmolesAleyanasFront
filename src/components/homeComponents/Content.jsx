import { useEffect, useState } from 'react'
import { getProjects } from '../../services/projects'
import { Project } from './Project'
import { ContentLayout } from '../ContentLayout'
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

  if (selectedProject === undefined) {
    return (
      <ContentLayout title='Pedidos'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {projects.map((project) => {
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
