import { toast } from 'sonner'

export const MONTHS = [
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

export const DAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

export const getToken = () => {
  const token = sessionStorage.getItem('jwt')
  return token
}

export const dniValidator = (dni) => {
  // Extraemos la letra del DNI
  const letra = dni.charAt(8)

  //Calculamos la letra que correspondería a partir de los números introducidos
  const cadena = 'TRWAGMYFPDXBNJZSQVHLCKET'
  const posicion = parseInt(dni) % (cadena.length - 1)
  const letraCalculada = cadena[posicion]

  // Comparamos la letra calculada con la letra proporcionada
  if (letra !== letraCalculada) {
    toast.error('El DNI no es correcto')
    return false
  }
  return true
}

export const getCurrentDate = () => {
  const today = new Date()
  const day = today.getDate().toString().padStart(2, '0')
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const year = today.getFullYear()
  const currentDate = `${year}-${month}-${day}`
  return currentDate
}

export const initialFormData = {
  dninif: '',
  name: '',
  address: '',
  email: '',
  phone: '',
  altphone: null,
  finishDate: '',
}
