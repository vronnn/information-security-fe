import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { FiX } from 'react-icons/fi';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import { poppins } from '@/lib/font';
import { ExtractProps } from '@/lib/helper';

type ModalProps = {
  className?: string;
  children: React.ReactNode;
  /** Use sm:max-w-xx to adjust max-width */
  modalContainerClassName?: string;
  open: boolean;
  title?: string;
  withCloseButton?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ExtractProps<typeof Dialog>, 'onClose' | 'unmount'>;

export function ModalRoot({
  className,
  children,
  modalContainerClassName,
  open,
  title,
  withCloseButton = true,
  setOpen,
  ...rest
}: ModalProps) {
  // Set initial focus to the container div instead of automatically focused to the close button
  const containerRef = React.createRef<HTMLDivElement>();

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as='div'
        className={clsxm(
          'fixed inset-0 z-40 overflow-y-auto',
          poppins.className,
          className,
        )}
        {...rest}
        onClose={setOpen}
        initialFocus={containerRef}
      >
        <div
          className='flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'
          ref={containerRef}
        >
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={clsxm(
                'align inline-block transform rounded-xl bg-white text-left shadow-xl transition-all sm:align-middle',
                'py-5 sm:py-6',
                'sm:w-11/12 sm:max-w-lg',
                modalContainerClassName,
              )}
            >
              <div className='w-full'>
                <header className='flex justify-between items-center px-6'>
                  {title && <Typography variant='s1'>{title}</Typography>}
                  {withCloseButton && (
                    <div className='absolute top-0 right-0 mt-5 mr-4 sm:mt-6 sm:mr-6'>
                      <button
                        type='button'
                        className='focus:ring-primary-500 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2'
                        onClick={() => setOpen(false)}
                      >
                        <span className='sr-only'>Batal</span>
                        <FiX className='h-5 w-5' aria-hidden='true' />
                      </button>
                    </div>
                  )}
                </header>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Title({ className, ...rest }: ExtractProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title as='div' className={clsxm('px-6', className)} {...rest} />
  );
}

function Body({ className, children }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsxm('flex w-full flex-col mt-2.5 sm:mt-4 px-6', className)}
    >
      {children}
    </div>
  );
}

const Modal = Object.assign(ModalRoot, { Title, Body });
export default Modal;
