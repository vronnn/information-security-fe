import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PiRocketBold } from 'react-icons/pi';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import { REGEX } from '@/constant/regex';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';

type registerAccForm = {
  name: string;
  email: string;
  password: string;
  telp_number: string;
};

type registerAccResponse = {
  id: string;
  name: string;
  telp_number: string;
  role: 'user' | 'admin';
  email: string;
  is_verified: boolean;
};

export default function RegisterPage() {
  const router = useRouter();
  const methods = useForm<registerAccForm>();
  const { handleSubmit, watch } = methods;
  const wemail = watch('email');
  const {
    mutateAsync: register,
    isLoading: registerIsLoading,
    error,
  } = useMutationToast<registerAccResponse, registerAccForm>(
    useMutation((data) => api.post('/api/user', data)),
  );
  const onSubmit = (data: registerAccForm) => {
    register(data).then(() => router.push('/register/activate'));
  };

  const { mutateAsync: resend, isLoading: resendIsLoading } = useMutationToast<
    void,
    { email: string }
  >(useMutation((data) => api.post('/api/user/verification-email', data)));

  const handleResend = () => {
    resend({ email: wemail }).then(() => {
      router.push('/register/activate');
    });
  };

  return (
    <main className='min-h-screen pt-10 sm:pt-20'>
      <section className='flex flex-col gap-y-2.5 sm:flex-row sm:items-center px-6 sm:px-0'>
        <div className='w-0 h-0.5 grow hidden sm:block bg-blue-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2'>
            Private Data
          </div>
          <div className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-blue-500 text-white ring-8 ring-gray-100 shrink-0'>
            1
          </div>
        </div>
        <div className='w-0.5 h-6 sm:w-0 sm:h-0.5 ml-[11px] sm:ml-0 sm:grow bg-gray-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2 text-gray-400'>
            Activation
          </div>
          <div className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-gray-300 text-white ring-8 ring-gray-100 shrink-0'>
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
        <div className='w-full'>
          <div className='text-center flex flex-col justify-center items-center pb-4 space-y-2.5 md:space-y-4 px-6'>
            <h1 className='text-2xl md:text-4xl font-medium'>
              Apply your dream job with ease
            </h1>
            <Typography
              variant='d'
              className='max-w-lg text-sm text-gray-500 !leading-normal'
            >
              Experience a seamless job application process that lets you apply
              for your dream job with just a view steps.
            </Typography>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col md:flex-row items-center justify-evenly w-10/12 gap-6 mx-auto'>
                <div className='w-full order-2 md:order-1 md:basis-1/2'>
                  <div className='space-y-4 md:max-w-md md:ml-auto'>
                    <Input
                      id='name'
                      label='Full Name'
                      placeholder='Enter your full name'
                      validation={{ required: 'Name must be filled' }}
                    />
                    <Input
                      type='email'
                      id='email'
                      label='Email Address'
                      placeholder='Enter your email'
                      validation={{ required: 'Email must be filled' }}
                    />
                    <Input
                      id='telp_number'
                      type='text'
                      label='Phone Number'
                      addon='+62'
                      placeholder='Enter your phone number'
                      validation={{
                        required: 'Phone number must be filled',
                        pattern: {
                          value: REGEX.PHONE,
                          message: 'Phone number is not valid',
                        },
                      }}
                    />
                    <Input
                      type='password'
                      id='password'
                      label='Password'
                      placeholder='Enter your password'
                      validation={{
                        required: 'Password must be filled',
                        minLength: {
                          value: 6,
                          message:
                            'Password must contain at least 6 characters',
                        },
                      }}
                    />
                  </div>
                </div>
                <div className='basis-1/2 order-1 md:order-2'>
                  <div className='max-w-lg h-full flex items-center max-h-96 overflow-hidden'>
                    <Image
                      src='/work-from-home.svg'
                      alt='regist-illustration'
                      width={960}
                      height={960}
                      className='scale-x-[-1]'
                    />
                  </div>
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
                <div className='flex items-center gap-2.5'>
                  {error?.response?.data.error === 'email already exist' && (
                    <Button
                      type='button'
                      autoFocus
                      onClick={handleResend}
                      variant='outline'
                      isLoading={resendIsLoading || registerIsLoading}
                    >
                      Resend verification
                    </Button>
                  )}
                  <Button
                    type='submit'
                    isLoading={registerIsLoading || resendIsLoading}
                  >
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
