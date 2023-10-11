import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineCheck } from 'react-icons/hi';
import { PiRocketBold } from 'react-icons/pi';

import Button from '@/components/buttons/Button';
import TextArea from '@/components/form/TextArea';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';

type activationAccForm = {
  token: string;
};

export default function ActivatePage() {
  const router = useRouter();
  const methods = useForm<activationAccForm>();
  const { handleSubmit } = methods;
  const { mutateAsync: activate, isLoading: activateIsLoading } =
    useMutationToast<void, activationAccForm>(
      useMutation((data) => api.post('/api/user', data)),
    );
  const onSubmit = async (data: activationAccForm) => {
    activate(data).then(() => router.push('/register/documents'));
  };
  return (
    <main className='min-h-screen pt-20'>
      <section className='flex flex-col gap-y-2.5 sm:flex-row sm:items-center px-6 sm:px-0'>
        <div className='w-0 h-0.5 grow hidden sm:block bg-blue-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2 text-gray-400'>
            Private Data
          </div>
          <HiOutlineCheck className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-blue-500 text-white ring-8 ring-blue-100 shrink-0' />
        </div>
        <div className='w-0.5 h-6 sm:w-0 sm:h-0.5 ml-[11px] sm:ml-0 sm:grow bg-blue-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2'>
            Activation
          </div>
          <div className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-blue-500 text-white ring-8 ring-gray-100 shrink-0'>
            2
          </div>
        </div>
        <div className='w-0.5 h-6 sm:w-0 sm:h-0.5 ml-[11px] sm:ml-0 sm:grow bg-gray-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2 text-gray-400'>
            Documents
          </div>
          <div className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-gray-300 text-white ring-8 ring-gray-100 shrink-0'>
            3
          </div>
        </div>
        <div className='w-0.5 h-6 sm:w-0 sm:h-0.5 ml-[11px] sm:ml-0 sm:grow bg-gray-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2 text-gray-400'>
            Confirmation
          </div>
          <div className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-gray-300 text-white ring-8 ring-gray-100 shrink-0'>
            4
          </div>
        </div>
        <div className='w-0 h-0.5 grow hidden sm:block bg-gray-100'></div>
      </section>
      <section className='min-h-[calc(100vh-6.5rem)] flex items-center pt-10'>
        <div className='w-full space-y-6'>
          <div className='max-w-xs mx-auto h-full flex items-center max-h-60 overflow-hidden'>
            <Image
              src='/work-from-home.svg'
              alt='regist-illustration'
              width={960}
              height={960}
              className='scale-x-[-1]'
            />
          </div>
          <div className='text-center flex flex-col justify-center items-center pb-4 space-y-2.5 md:space-y-4 px-6'>
            <h1 className='text-2xl md:text-4xl font-medium'>
              Activate your account
            </h1>
            <Typography
              variant='d'
              className='max-w-2xl text-sm text-gray-500 !leading-normal'
            >
              To proceed to the next step and activate your account, please
              enter the unique activation token we&apos;ve sent to your email.
              If you haven&apos;t received the email yet, please check your
              inbox, as well as your spam or social folders, as it may take a
              moment to arrive.
            </Typography>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col justify-start w-10/12 gap-6 mx-auto'>
                <div className='space-y-4 w-full md:max-w-2xl mx-auto'>
                  <TextArea
                    id='token'
                    label={null}
                    placeholder='Enter your token here ...'
                    validation={{ required: 'Token must be filled' }}
                  />
                </div>
              </div>
              <div className='flex justify-between items-center w-10/12 max-w-7xl mx-auto min-h-[6rem]'>
                <UnstyledLink
                  href='/'
                  className='flex items-center gap-1.5 text-base-black'
                >
                  <PiRocketBold className='text-xl' />
                  <Typography variant='h3'>Workhub</Typography>
                </UnstyledLink>
                <div>
                  <Button type='submit' isLoading={activateIsLoading}>
                    Next Step
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
}
