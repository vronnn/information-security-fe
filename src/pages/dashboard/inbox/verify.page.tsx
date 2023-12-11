import { useMutation } from '@tanstack/react-query';
import { Check, XCircle } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/form/Dropzone';
import WithAuth from '@/components/hoc/WithAuth';
import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import { Separator } from '@/components/Separator';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';
import { VerifyForm, VerifyResponse } from '@/types/entities/message';

export default WithAuth(VerifyPage, ['user']);
function VerifyPage() {
  const form = useForm<VerifyForm>();
  const { handleSubmit } = form;
  const {
    mutateAsync: verify,
    isLoading: verifyIsLoading,
    data: digital_signature,
  } = useMutationToast<VerifyResponse, VerifyForm>(
    useMutation((data) =>
      api.post('/api/digital_signature/verify', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    ),
  );
  const onSubmit = (data: VerifyForm) => {
    verify(data);
  };
  return (
    <DashboardLayout>
      <Seo title='Verify' />
      <main className='px-10'>
        <Typography variant='h2' className='text-lg'>
          Verify Document
        </Typography>
        <section className='flex flex-col gap-4'>
          <div className='mt-4 basis-1/3'>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <DropzoneInput id='files' label={null} />
                </div>
                <div className='mt-4 flex items-center'>
                  <Button
                    type='submit'
                    isLoading={verifyIsLoading}
                    className='w-full'
                  >
                    Send
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
          {digital_signature && (
            <div className='mt-4 basis-2/3'>
              <Typography variant='h4' className='pl-2'>
                Digital Signature
              </Typography>
              <Separator className='mt-2 ml-2' />
              <table className='table-auto border-separate border-spacing-2'>
                <tr>
                  <td>
                    <Typography variant='b4'>Owner</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>:</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>
                      {digital_signature?.data.data.name}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant='b4'>Email</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>:</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>
                      {digital_signature?.data.data.email}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant='b4'>Status</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>:</Typography>
                  </td>
                  <td>
                    <Typography as='div' variant='b4'>
                      {digital_signature?.data.data.is_verified ? (
                        <Typography
                          as='div'
                          className='flex items-center gap-2'
                        >
                          <span className='text-sm'>Verified</span>
                          <Check className='text-green-500 rounded-full p-1 bg-green-100 w-4 h-4' />
                        </Typography>
                      ) : (
                        <Typography
                          as='div'
                          className='flex items-center gap-2'
                        >
                          <span className='text-sm'>Not verified</span>
                          <XCircle className='text-red-500 rounded-full p-1 bg-red-100 w-4 h-4' />
                        </Typography>
                      )}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant='b4'>Datetime</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>:</Typography>
                  </td>
                  <td>
                    <Typography variant='b4'>
                      {digital_signature?.data.data.date}
                    </Typography>
                  </td>
                </tr>
              </table>
            </div>
          )}
        </section>
      </main>
    </DashboardLayout>
  );
}
