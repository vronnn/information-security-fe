import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/dialog/Sheet';
import DropzoneInput from '@/components/form/Dropzone';
import Input from '@/components/form/Input';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import TextArea from '@/components/form/TextArea';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';
import useAuthStore from '@/store/useAuthStore';
import { MessageProps, MessageResponse } from '@/types/entities/message';

type MessageModalProps = {
  children: React.ReactNode;
  options: {
    value: string;
    label: string;
  }[];
  optionsIsLoading: boolean;
};

export default function MessageModal({
  children,
  options,
  optionsIsLoading,
}: MessageModalProps) {
  const user = useAuthStore.useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<MessageProps>();
  const { handleSubmit } = form;
  const { mutateAsync: send, isLoading: sendIsLoading } = useMutationToast<
    MessageResponse,
    MessageProps
  >(
    useMutation((data) =>
      api.post('/api/digital_signature', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    ),
  );
  const onSubmit = (data: MessageProps) => {
    data.from = user?.email ?? '';
    send(data).then((res) => {
      if (res.data.data.is_signed) {
        setIsOpen(false);
      }
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>New Message</SheetTitle>
          <SheetDescription>
            Send your digitally signed PDF document to your friends.
          </SheetDescription>
        </SheetHeader>
        <div className='mt-4'>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-2'>
                <SearchableSelectInput
                  id='to'
                  label='Send to'
                  options={options}
                  isLoading={optionsIsLoading}
                  validation={{ required: 'Receiver is required' }}
                  menuHeight='8rem'
                />
                <Input
                  id='subject'
                  label={null}
                  addon='Subject'
                  validation={{ required: 'Subject is required' }}
                />
              </div>
              <div className='mt-4 space-y-2'>
                <TextArea
                  id='body_content'
                  label={null}
                  placeholder='Write something here'
                  validation={{ required: 'Content is required' }}
                  rows={8}
                />
                <DropzoneInput
                  id='body_files'
                  label={null}
                  validation={{ required: 'Document is required' }}
                />
              </div>
              <div className='mt-4 flex items-center'>
                <Button
                  type='submit'
                  isLoading={sendIsLoading}
                  className='w-full'
                >
                  Send
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
}
