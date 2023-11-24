import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiChevronLeft } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import TextArea from '@/components/form/TextArea';
import Modal from '@/components/modal/Modal';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';
import { fileProps } from '@/types/entities/file';

type ModalReturnType = {
  openModal: () => void;
};

type ModalProps = {
  requestedId: string;
  children: (props: ModalReturnType) => JSX.Element;
};

type KeyInputModalProps = {
  requestedId: string;
  closeModal: () => void;
};

export type PrivateShareForm = {
  key: string;
};

export type PrivateShareResponse = {
  owner_id: string;
  user: {
    name: string;
    telp: string;
    token: string;
    file: fileProps[];
  };
};

const KeyInputModal = ({ closeModal, requestedId }: KeyInputModalProps) => {
  const router = useRouter();
  const methods = useForm<PrivateShareForm>();
  const { handleSubmit } = methods;
  const { mutateAsync: getPrivateData, isLoading: getPrivateDataIsLoading } =
    useMutationToast<PrivateShareResponse, PrivateShareForm>(
      useMutation({
        mutationFn: (data) => {
          return api.post(`/api/private-access/send-key/${requestedId}`, data);
        },
      }),
    );
  const onSubmit = (data: PrivateShareForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
    getPrivateData(data).then((res) => {
      sessionStorage.setItem('key', data.key);
      router.push(`/dashboard/search/${res.data.data.owner_id}`);
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <TextArea
          id='key'
          label={null}
          placeholder='Enter the key here ...'
          validation={{ required: 'Key is required' }}
          rows={4}
        />
        <div className='flex justify-between items-center'>
          <Button
            type='button'
            variant='outline'
            leftIcon={HiChevronLeft}
            onClick={closeModal}
            isLoading={getPrivateDataIsLoading}
            className='min-h-[2rem] md:min-h-[2.25rem]'
          >
            Back
          </Button>
          <Button
            type='submit'
            isLoading={getPrivateDataIsLoading}
            className='min-h-[2rem] md:min-h-[2.25rem]'
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default function KeyModal({ children, requestedId }: ModalProps) {
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
      <Modal open={open} setOpen={setOpen} title='Key Input'>
        <Modal.Body>
          <KeyInputModal closeModal={closeModal} requestedId={requestedId} />
        </Modal.Body>
      </Modal>
    </>
  );
}
