import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/disclosure/Accordion';
import WithAuth from '@/components/hoc/WithAuth';
import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
import { ApiReturn } from '@/types/api';
import { fileProps } from '@/types/entities/file';

const FileDisplay = dynamic(() => import('@/components/form/FileDisplay'), {
  ssr: false,
});

export default WithAuth(DashboardPage, ['user']);
function DashboardPage() {
  const url = '/api/file';
  const { data: userFiles } = useQuery<ApiReturn<fileProps[]>, Error>([url]);
  return (
    <DashboardLayout>
      <Seo title='Dashboard' />
      <div className='px-8 min-h-screen'>
        <div className='flex flex-wrap items-center justify-between'>
          <Typography as='h1' variant='h1' className='text-2xl font-medium'>
            Documents
          </Typography>
          {/* <ToggleGroup
            type='single'
            rovingFocus={true}
            defaultValue='aes'
            value={mode}
            onValueChange={(value) => {
              if (value) setMode(value);
            }}
          >
            <ToggleGroupItem value='aes'>
              <Typography variant='s3' className='uppercase'>
                aes
              </Typography>
            </ToggleGroupItem>
            <ToggleGroupItem value='des'>
              <Typography variant='s3' className='uppercase'>
                des
              </Typography>
            </ToggleGroupItem>
            <ToggleGroupItem value='rc4'>
              <Typography variant='s3' className='uppercase'>
                rc4
              </Typography>
            </ToggleGroupItem>
          </ToggleGroup> */}
        </div>
        <div className='mt-4 space-y-4'>
          {userFiles?.data.map(({ ...props }, index) => (
            <div key={index} className='grid lg:grid-cols-2 gap-x-6 gap-y-4'>
              <div className='col-span-full'>
                <Typography variant='s2'>
                  {props.file_type === 'image'
                    ? 'ID Card'
                    : props.file_type === 'file'
                    ? 'Curriculum Vitae'
                    : 'Short Intro Video'}
                </Typography>
              </div>
              <FileDisplay
                {...props}
                mode={props.mode}
                withFileOption={true}
                withImgLabel={true}
                withVidOption={false}
                ImgContainerClassName='mb-2'
                VidContainerClassName='justify-normal w-full h-full p-0'
                VidClassName='w-full max-w-2xl h-full !max-h-[800px] border'
                FileContainerClassName='py-0'
                FileClassName='mx-auto'
                className='space-y-0'
              />
              <div className=''>
                <Accordion
                  type='single'
                  collapsible={true}
                  className='w-full rounded-lg shadow-sm border text-base-dark divide-y'
                >
                  <AccordionItem value='item-1'>
                    <AccordionTrigger>
                      <Typography variant='d' className='font-medium'>
                        Path
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Typography variant='b4' className='break-all'>
                        {props.path}
                      </Typography>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-2'>
                    <AccordionTrigger>
                      <Typography variant='d' className='font-medium'>
                        File Name
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Typography variant='b4' className='break-all'>
                        {props.file_name}
                      </Typography>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-3'>
                    <AccordionTrigger>
                      <Typography variant='d' className='font-medium'>
                        File Type
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Typography variant='b4' className='break-all'>
                        {props.file_type}
                      </Typography>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-4'>
                    <AccordionTrigger>
                      <Typography variant='d' className='font-medium'>
                        Mode
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Typography variant='b4' className='break-all'>
                        {props.mode.toUpperCase()}
                      </Typography>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-5'>
                    <AccordionTrigger>
                      <Typography variant='d' className='font-medium'>
                        Encryption
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Typography variant='b4' className='break-all'>
                        {props.encryption}
                      </Typography>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* <table
                  border={1}
                  className='border-separate border-spacing-x-4 border-spacing-y-2 h-fit border-red-400'
                >
                  <tbody>
                    <tr className='[&>*]:text-left [&>*]:align-top border-b border-red-300'>
                      <th>
                        <Typography variant='sm'>Path</Typography>
                      </th>
                      <td className='break-all text-mid'>{props.path}</td>
                    </tr>
                    <tr className='[&>*]:text-left [&>*]:align-top border-b border-red-300'>
                      <th>
                        <Typography variant='sm'>File name</Typography>
                      </th>
                      <td className='break-all text-mid'>{props.file_name}</td>
                    </tr>
                    <tr className='[&>*]:text-left [&>*]:align-top border-b border-red-300'>
                      <th>
                        <Typography variant='sm'>File type</Typography>
                      </th>
                      <td className='break-all text-mid'>{props.file_type}</td>
                    </tr>
                    <tr className='[&>*]:text-left [&>*]:align-top border-b border-red-300'>
                      <th>
                        <Typography variant='sm'>Encryption</Typography>
                      </th>
                      <td className='break-all text-mid'>{props.encryption}</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
