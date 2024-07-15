import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from 'react-aria-components'

export const DeleteModalComponent = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteProject,
  projectToDelete,
}) => {
  return (
    <Modal
      isOpen={showDeleteModal}
      onOpenChange={setShowDeleteModal}
      isDismissable
      className='flex flex-col items-center bg-white rounded p-8 w-[28rem] h-[22rem] shadow-lg'
    >
      <Dialog>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center items-center rounded-full p-3 bg-yellow-300'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle w-10 h-10'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 9v4' />
              <path d='M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z' />
              <path d='M12 16h.01' />
            </svg>
          </div>
          <Heading slot='title' className='text-center text-2xl font-bold mt-2'>
            ¿Eliminar trabajo?
          </Heading>
        </div>
        <p className='text-gray-400 text-center mt-1 '>
          Se eliminará el trabajo de forma permanente.
        </p>
      </Dialog>
      <div className='w-full flex flex-col justify-center mt-auto gap-3'>
        <button
          className='w-full font-bold text-lg bg-yellow-400 rounded py-2 px-4 '
          onClick={() => {
            handleDeleteProject(
              projectToDelete.id,
              projectToDelete.name,
              projectToDelete.dninif
            )
          }}
        >
          Eliminar
        </button>
        <button
          className='w-full text-lg border border-1 border-neutral-500 rounded py-2 px-4 '
          onClick={() => {
            setShowDeleteModal(false)
          }}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  )
}
