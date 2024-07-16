import styles from './css/DateInput.module.css'
import { Dialog, Heading, Modal } from 'react-aria-components'
import { updateProject } from '../services/projects'
import { dniValidator, initialFormData } from '../services/utils'
import { toast } from 'sonner'
import { useState } from 'react'

export const UpdateProjectModal = ({
  showModal,
  setShowUpdateModal,
  project,
  onUpdateProject,
}) => {
  const [formData, setFormData] = useState(null)

  const data = formData ?? project

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Compara el proyecto actual con el proyecto inicial
    if (JSON.stringify(formData) === JSON.stringify(project)) {
      toast.error('No se ha hecho ningún cambio en el formulario')
      return
    }

    if (!dniValidator(data.dninif)) {
      return
    }

    toast.promise(updateProject(formData.id, formData), {
      loading: 'Procesando petición...',
      success: (updatedProject) => {
        setFormData(null)
        setShowUpdateModal(false)
        onUpdateProject(updatedProject.id, updatedProject)

        return 'El trabajo se ha modificado con éxito'
      },
      error: (error) => {
        return error.message
      },
    })
  }

  const handleCancel = () => {
    setFormData(null)
    setShowUpdateModal(false)
  }

  return (
    <Modal
      isDismissable
      isOpen={showModal}
      onOpenChange={setShowUpdateModal}
      className='flex flex-col items-center bg-white rounded p-8 w-[48rem] h-[30rem] shadow-lg'
    >
      <Dialog className='w-full h-full focus-visible:border-none focus-visible:outline-none'>
        <div className='flex flex-col items-center h-full'>
          <Heading slot='title' className='text-center text-2xl font-bold mt-2'>
            Modificar trabajo
          </Heading>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 h-full w-full pt-8 px-12'
          >
            <div className='flex'>
              <div className='flex gap-1 w-full items-center start'>
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-id size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z' />
                  <path d='M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                  <path d='M15 8l2 0' />
                  <path d='M15 12l2 0' />
                  <path d='M7 16l10 0' />
                </svg>
                <input
                  type='text'
                  id='dninif'
                  name='dninif'
                  value={data.dninif}
                  pattern='^(\d{8})([A-Z])$'
                  placeholder='DNI NIF'
                  className='p-2 border rounded'
                  onChange={handleChange}
                />
              </div>
              <div className='flex gap-1 w-full items-center justify-end'>
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-user size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
                  <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
                </svg>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Nombre y apellidos'
                  className='p-2 border rounded'
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='flex'>
              <div className='flex gap-1 w-full items-center justify-start'>
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-map-2 size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5' />
                  <path d='M9 4v13' />
                  <path d='M15 7v5.5' />
                  <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z' />
                  <path d='M19 18v.01' />
                </svg>
                <input
                  type='text'
                  id='address'
                  name='address'
                  className='p-2 border rounded'
                  placeholder='Dirección'
                  value={data.address}
                  onChange={handleChange}
                />
              </div>
              <div className='flex gap-1 w-full items-center justify-end'>
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-mail size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z' />
                  <path d='M3 7l9 6l9 -6' />
                </svg>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='p-2 border rounded'
                  placeholder='Correo electrónico'
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='flex'>
              <div className='flex gap-1 w-full items-center justify-start'>
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-phone size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
                </svg>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  pattern='^\d{9}$'
                  className='p-2 border rounded'
                  placeholder='Teléfono'
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
              <div className='flex gap-1 w-full items-center justify-end'>
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-device-landline-phone size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M20 3h-2a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-14a2 2 0 0 0 -2 -2z' />
                  <path d='M16 4h-11a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h11' />
                  <path d='M12 8h-6v3h6z' />
                  <path d='M12 14v.01' />
                  <path d='M9 14v.01' />
                  <path d='M6 14v.01' />
                  <path d='M12 17v.01' />
                  <path d='M9 17v.01' />
                  <path d='M6 17v.01' />
                </svg>
                <input
                  type='tel'
                  id='altphone'
                  name='altphone'
                  className='p-2 border rounded'
                  pattern='^\d{9}$'
                  placeholder='Teléfono alternativo'
                  value={data.altphone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              className={
                'flex gap-2 justify-center items-center ' +
                styles.datepickerToggle
              }
            >
              <button
                className={styles.datePickerToggleButton}
                type='button'
                onClick={() => {
                  const inputDate = document.querySelector('#finishDate')
                  inputDate.showPicker()
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
                  className='icon icon-tabler icons-tabler-outline icon-tabler-calendar-x size-8'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6.5' />
                  <path d='M16 3v4' />
                  <path d='M8 3v4' />
                  <path d='M4 11h16' />
                  <path d='M22 22l-5 -5' />
                  <path d='M17 22l5 -5' />
                </svg>
              </button>
              <input
                type='date'
                id='finishDate'
                name='finishDate'
                className={'p-2 border rounded ' + styles.datepickerInput}
                value={data.finishDate}
                min={data.finishDate}
                onChange={handleChange}
              />
            </div>
            <div className='flex gap-2 mt-auto'>
              <button
                type='submit'
                className='w-full font-bold text-lg bg-yellow-400 rounded py-2 px-4 '
              >
                Modificar
              </button>
              <button
                type='button'
                className='w-full text-lg border border-1 border-neutral-500 rounded py-2 px-4 '
                onClick={() => {
                  handleCancel()
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </Modal>
  )
}
