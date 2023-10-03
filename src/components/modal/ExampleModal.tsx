import * as React from 'react';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';

type ModalReturnType = {
  openModal: () => void;
};
export default function ExampleModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title='Modal Title'>
        <Modal.Body>
          <Typography variant='d'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            iste molestiae repudiandae odit possimus incidunt.
          </Typography>
        </Modal.Body>
        <Modal.Body>
          <div className='flex'>
            <Button variant='secondary' onClick={closeModal}>
              Got it, thanks
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
