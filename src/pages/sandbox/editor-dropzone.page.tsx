import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import EditorDropzone from '@/components/form/EditorDropzone';
import Layout from '@/components/layouts/Layout';
import Seo from '@/components/Seo';

type JobRegistType = {
  file: File;
};

export default function EditorDropzonePage() {
  const methods = useForm<JobRegistType>();
  const { handleSubmit } = methods;
  const onSubmit = (data: JobRegistType) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <Layout>
      <Seo title='Editor Dropzone' />
      <main className='layout min-h-screen py-10'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <EditorDropzone
              id='file'
              label='Foto KTP'
              validation={{ required: 'Photo must be filled' }}
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg'],
                'video/*': ['.mp4', '.mov'],
                'application/pdf': ['.pdf'],
              }}
              className='max-w-md'
              helperText='Attach files with .png, .jpg, .jpeg, .mp4, .mov, or .pdf extension.'
              maxSize={100000000}
            />
            <Button type='submit' variant='outline' icon={FiSave} />
          </form>
        </FormProvider>
      </main>
    </Layout>
  );
}
