import { toast } from "sonner"
import { API_HOST } from "../../config"

export const register = (username, password) => {
    fetch(`${API_HOST}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    }).then((response)=> {
        if(!response.ok){
            throw new Error('Se ha producido un error en el servidor')
        }

        if(response.status === 401){
            throw new Error('El usuario ya existe')
        }
        toast.success('Usuario creado con éxito')

        
    }).catch((error)=>{
        toast.error(error.message)
    })
}

export const login = async (username,password) => {
    return fetch(`${API_HOST}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    }).then(async (response)=> {
        if(!response.ok){
            if(response.status === 401){
                throw new Error('No se ha podido identificar al usuario')
            }else{
                throw new Error('Se ha producido un error en el servidor')
            }
        }

        const data = await response.json()
        return data
    }).catch((error)=>{
        toast.error(error.message)
    })
}