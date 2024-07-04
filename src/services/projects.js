import { API_HOST } from "../../config"
import { toast } from 'sonner'
import { getToken } from "./utils"

export const getProjects = async () => {
    const token = getToken()

    return fetch(`${API_HOST}/api/projects`,{
        method: 'GET',
        headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    ).then(async (response)=>{
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