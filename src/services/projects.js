import { API_HOST } from '../../config'
import { toast } from 'sonner'
import { getToken } from './utils'

export const getProjects = async () => {
  const token = getToken()
  return fetch(`${API_HOST}/api/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('El token no es válido o ha expirado')
        } else {
          throw new Error('Error del servidor')
        }
      }
      const projects = await response.json()
      return projects
    })
    .catch((error) => {
      toast.error(error.message)
    })
}

export const createProject = async (project) => {
  const token = getToken()

  return fetch(`${API_HOST}/api/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }).then(async (response) => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('El token no es válido o ha expirado')
      } else {
        throw new Error('Error del servidor')
      }
    }

    return await response.json()
  })
}

export const updateProject = async (project, projectId) => {
  const token = getToken()
  return fetch(`${API_HOST}/api/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  }).then(async (response) => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Error al modificar el trabajo')
      } else {
        throw new Error('Error del servidor')
      }
    }

    toast.success('Se ha modificado el trabajo con éxito')
    return await response.json()
  })
}

export const deleteProject = (id, name, dninif) => {
  const token = getToken()
  fetch(`${API_HOST}/api/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Error eliminando el trabajo')
        } else {
          throw new Error('Error del servidor')
        }
      }
      toast.success(`Se ha eliminado el trabajo de ${name} - ${dninif}`)
      return id
    })
    .catch((error) => {
      toast.error(error.message)
      return null
    })
}
