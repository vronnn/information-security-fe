import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
import { DetailUser } from '@/types/entities/user';

const FileDisplay = dynamic(() => import('@/components/form/FileDisplay'), {
  ssr: false,
});
export default WithAuth(DetailUserPage, ['admin']);
function DetailUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const url = `/api/user/admin/${id}`;
  const { data: detailUserData } = useQuery<ApiReturn<DetailUser>, Error>([
    url,
  ]);

  return (
    <DashboardLayout>
      <Seo title='Detail User' />
      <div className='mt-2 space-y-4 px-10'>
        <Typography variant='h2'>Detail User</Typography>
        <div className='grid lg:grid-cols-3 border rounded-lg px-6 py-4'>
          <div className='py-2 space-y-1'>
            <Typography variant='s3' className='text-base-icon'>
              Nama
            </Typography>
            <Typography variant='b1'>{detailUserData?.data.name}</Typography>
          </div>
          <div className='py-2 space-y-1'>
            <Typography variant='s3' className='text-base-icon'>
              Email
            </Typography>
            <Typography variant='b1'>{detailUserData?.data.email}</Typography>
          </div>
          <div className='py-2 space-y-1'>
            <Typography variant='s3' className='text-base-icon'>
              Phone Number
            </Typography>
            <Typography variant='b1'>
              {detailUserData?.data.telp_number}
            </Typography>
          </div>
          <div className='py-2 space-y-1'>
            <Typography variant='s3' className='text-base-icon'>
              Role
            </Typography>
            <Typography variant='b1'>{detailUserData?.data.role}</Typography>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 gap-6'>
          {detailUserData?.data.files.map((props, index) => (
            <div
              key={index}
              className='grid lg:grid-cols-2 gap-x-6 gap-y-4 content-start'
            >
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
