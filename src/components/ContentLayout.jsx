import {Button, Dialog, DialogTrigger, Heading, Input, Label, Modal, TextField} from 'react-aria-components';
import './css/ContentLayout.css'
export const ContentLayout = ({
  title,
  children,
  button,
  setSelectedProject,
}) => {
  return (
    <main className='py-8 px-12 space-y-4'>
      <div className={`font-medium ${!button ? ' flex justify-between' : ''}`}>
        <h1 className='text-3xl'>
          {button && (
            <>
              <button
                className='underline'
                onClick={() => setSelectedProject()}
              >
                Pedidos
              </button>
              {' -> '}
            </>
          )}
          {title}
        </h1>
        {!button && (
          <DialogTrigger>
          <Button className='font-medium rounded bg-yellow-400 px-4 py-2 hover:scale-110 hover:font-semibold transition'>Nuevo trabajo</Button>
          <Modal isDismissable>
            <Dialog>
              <Heading slot="title">Notice</Heading>
              <p>Click outside to close this dialog.</p>
            </Dialog>
          </Modal>
          </DialogTrigger>
        )}
      </div>

      <section className=' rounded '>{children}</section>
    </main>
  )
}
