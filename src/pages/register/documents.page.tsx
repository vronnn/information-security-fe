import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineCheck } from 'react-icons/hi';
import { PiRocketBold } from 'react-icons/pi';

import Button from '@/components/buttons/Button';
import EditorDropzone from '@/components/form/EditorDropzone';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

type documentsForm = {
  ktp: File;
  cv: File;
  introduction_video: File;
};

export default function DocumentsPage() {
  const router = useRouter();
  const methods = useForm<documentsForm>();
  const { handleSubmit } = methods;
  const onSubmit = (data: documentsForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
    router.push('/register/confirmation');
  };
  return (
    <main className='min-h-screen pt-10 sm:pt-20'>
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
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2 text-gray-400'>
            Activation
          </div>
          <HiOutlineCheck className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-blue-500 text-white ring-8 ring-blue-100 shrink-0' />
        </div>
        <div className='w-0.5 h-6 sm:w-0 sm:h-0.5 ml-[11px] sm:ml-0 sm:grow bg-blue-100'></div>
        <div className='relative flex items-center gap-4 sm:block w-full sm:w-fit'>
          <div className='static sm:absolute sm:w-40 sm:-top-10 sm:left-1/2 sm:-translate-x-1/2 text-center text-sm md:text-mid font-semibold order-2'>
            Documents
          </div>
          <div className='w-6 h-6 flex items-center justify-center text-xs rounded-full p-1 bg-blue-500 text-white ring-8 ring-gray-100 shrink-0'>
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
          <div className='text-center flex flex-col justify-center items-center pt-4 pb-6 space-y-2.5 md:space-y-4 px-6'>
            <h1 className='text-2xl md:text-4xl font-medium'>
              Upload Required Documents
            </h1>
            <Typography
              variant='d'
              className='max-w-lg text-sm text-gray-500 !leading-normal'
            >
              Before you proceed, please upload the following required documents
              with the specified file extensions.
            </Typography>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col md:flex-row items-start justify-evenly w-10/12 gap-6 mx-auto'>
                <div className='w-full order-2 md:order-1 md:basis-1/2'>
                  <div className='space-y-10 md:max-w-md md:ml-auto'>
                    <EditorDropzone
                      id='ktp'
                      label='ID card'
                      validation={{ required: 'ID card must be filled' }}
                      accept={{
                        'image/*': ['.png', '.jpg', '.jpeg'],
                      }}
                      helperText='Attach files with .png, .jpg, or .jpeg extension max 1 MB.'
                      maxSize={100000000}
                    />
                    <EditorDropzone
                      id='cv'
                      label='Curriculum Vitae'
                      validation={{ required: 'CV must be filled' }}
                      accept={{
                        'application/pdf': ['.pdf'],
                      }}
                      helperText='Attach files with .pdf extension only max 2 MB.'
                      maxSize={100000000}
                    />
                    <EditorDropzone
                      id='introduction_video'
                      label='Short Introduction Video'
                      validation={{
                        required: 'Introduction video must be filled',
                      }}
                      accept={{
                        'video/*': ['.mp4', '.mov'],
                      }}
                      helperText='Attach files with .mp4 or .mov extension max 20 MB.'
                      maxSize={100000000}
                    />
                  </div>
                </div>
                <div className='basis-1/2 sticky top-0 order-1 md:order-2'>
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
                  {/* <Button variant='outline'>Resend verification</Button> */}
                  <Button type='submit'>Next Step</Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
}
