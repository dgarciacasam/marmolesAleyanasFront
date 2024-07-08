import { API_HOST } from "../../config"
import { toast } from 'sonner'
import { getToken } from "./utils"

const token = getToken()

export const getProjects = async () => {
    return fetch(`${API_HOST}/api/projects`,{
        method: 'GET',
        headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(async (response)=>{
        if(!response.ok){
            if(response.status === 401){
                throw new Error('El token no es válido o ha expirado')
            }else{
                throw new Error('Error del servidor')
            }
        }
        const projects = await response.json()
        return projects
    }).catch((error)=>{
        toast.error(error.message)
    })
}

export const deleteProject = (id, name, dnicif) => {
    fetch(`${API_HOST}/api/projects/${id}`,{
        method:'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then((response)=>{
        if(!response.ok){
            if(response.status === 401){
                throw new Error('El token no es válido o ha expirado')
            }else{
                throw new Error('Error del servidor')
            }
        }
        toast.success(`Se ha eliminado el trabajo de ${name} - ${dnicif}`)
        return id
    }).catch((error)=>{
        toast.error(error.message)
        return null
    })
}