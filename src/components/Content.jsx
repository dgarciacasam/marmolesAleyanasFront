import { useEffect, useState } from 'react'
import './css/ContentLayout.css'
import { Project } from './Project'
import { CreateProjectButton } from './CreateProjectButton'
import { CustomSelectComponents } from './CustomSelectCompontent'
import { CustomInputComponent } from './CustomInputComponent'
import { ProjectCardComponent } from './ProjectCardComponent'
import { DeleteModalComponent } from './DeleteModalComponent'
import { UpdateProjectModal } from './UpdateProjectModal'
import { getProjects } from '../services/projects'
import { initialFormData } from '../services/utils'

export const Content = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState()
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('')

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [projectToUpdate, setProjectToUpdate] = useState(initialFormData)

  const handleSelectProject = (projectId) => {
    const project = projects.find((project) => project.id === projectId)
    setSelectedProject(project)
  }

  const handleUpdateProject = (id, newProject) => {
    const newArray = projects.map((project) => {
      if (project.id === id) {
        return newProject
      }
      return project
    })

    setProjects(newArray)
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
      <main className='py-8 px-12 space-y-4'>
        <div className='font-medium flex justify-between'>
          <h1 className='text-3xl'>Pedidos</h1>
          <CreateProjectButton
            onAddNewProject={(newProject) => {
              setProjects([...projects, newProject])
            }}
          />
        </div>

        <section className=' rounded '>
          <div className='flex flex-col justify-between items-center md:flex-row'>
            <CustomInputComponent setSearch={setSearch} />
            <CustomSelectComponents order={order} setOrder={setOrder} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4'>
            {filteredProjects.map((project) => (
              <ProjectCardComponent
                project={project}
                handleSelectProject={handleSelectProject}
                setProjectToDelete={setProjectToDelete}
                setShowDeleteModal={setShowDeleteModal}
                setProjectToUpdate={setProjectToUpdate}
                setShowUpdateModal={setShowUpdateModal}
                key={project.id}
              />
            ))}
          </div>

          {/* //Modal para eliminar un trabajo */}
          <DeleteModalComponent
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            onDeleteProject={(projectId) => {
              setProjects(
                projects.filter((project) => project.id !== projectId)
              )
            }}
            projectToDelete={projectToDelete}
          />

          {/* Modal para editar un trabajo */}
          <UpdateProjectModal
            showModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            project={projectToUpdate}
            onUpdateProject={handleUpdateProject}
          />
        </section>
      </main>
    )
  }

  return (
    <main className='py-8 px-12 space-y-4'>
      <div className='font-medium'>
        <h1 className='text-3xl'>
          <button className='underline' onClick={() => setSelectedProject()}>
            Pedidos
          </button>
          {' -> ' + selectedProject.name + ' - ' + selectedProject.dninif}
        </h1>
      </div>
      <section className=' rounded '>
        <Project
          project={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </section>
    </main>
  )
}
