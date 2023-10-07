import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import EditorDropzone from '@/components/form/EditorDropzone';
import Layout from '@/components/layouts/Layout';
import Seo from '@/components/Seo';

export default function EditorDropzonePage() {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = () => {};
  return (
    <Layout>
      <Seo title='Editor Dropzone' />
      <main className='layout min-h-screen py-10'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditorDropzone
              id='photo'
              label='Photo'
              validation={{ required: 'Photo must be filled' }}
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg'],
                'video/*': ['.mp4', '.mov'],
              }}
              helperText='Please upload files with .png, .jpg, or .jpeg extension.'
              maxSize={100000000}
            />
          </form>
        </FormProvider>
      </main>
    </Layout>
  );
}
