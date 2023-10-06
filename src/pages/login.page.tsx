import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import Layout from '@/components/layouts/Layout';
import Seo from '@/components/Seo';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';

export type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const methods = useForm<LoginForm>({
    mode: 'onChange',
  });
  const { handleSubmit } = methods;
  const { mutateAsync: login, isLoading: loginIsLoading } = useMutationToast<
    LoginForm,
    LoginForm
  >(useMutation((data) => api.post('api/login', data)));
  const onSubmit = (data: LoginForm) => {
    login(data);
  };
  return (
    <Layout>
      <Seo title='Login' />
      <main className='h-screen grid place-items-center bg-white font-primary'>
        <div className='bg-white p-6 xs:p-8 md:p-10 rounded-3xl md:shadow-2xl space-y-6 w-full max-w-[26rem] mx-auto'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-bold'>Log in</h2>
            <p className='text-black/70'>to continue to Workhub</p>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2.5'>
              <Input
                type='email'
                id='email'
                label={null}
                placeholder='Email'
                validation={{ required: 'Email must be filled' }}
              />
              <Input
                type='password'
                id='password'
                label={null}
                placeholder='Password'
                validation={{
                  required: 'Password must be filled',
                  minLength: {
                    value: 6,
                    message: 'Password must contain at least 6 characters',
                  },
                }}
              />
              <Button
                type='submit'
                isLoading={loginIsLoading}
                className='w-full !mt-6'
              >
                Continue
              </Button>
            </form>
          </FormProvider>
          <p className='text-black/70 text-[13px] leading-4'>
            No account?{' '}
            <Link
              href='/signup'
              className='text-black underline decoration-white hover:decoration-stone-600 transition duration-150'
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
