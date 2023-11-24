import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { FiShare2 } from 'react-icons/fi';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import WithAuth from '@/components/hoc/WithAuth';
import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';
import ShareModal from '@/pages/dashboard/profile/ShareModal';
import { ApiReturn } from '@/types/api';
import { MeRespond, UserDisplayedProps } from '@/types/entities/user';

export default WithAuth(ProfilePage, ['user']);
function ProfilePage() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<AxiosResponse<ApiReturn<MeRespond>>, Error>({
    queryKey: ['me'],
    queryFn: () => {
      return api.get('/api/user/me');
    },
  });

  const { data: notifData } = useQuery<
    AxiosResponse<ApiReturn<UserDisplayedProps[]>>,
    Error
  >({
    queryKey: ['notif'],
    queryFn: () => {
      return api.get('/api/private-access/owner');
    },
    staleTime: Infinity,
  });

  const { mutate: request, isLoading: requestIsLoading } = useMutationToast(
    useMutation({
      mutationFn: ({ id, status }: { id: string; status: string }) => {
        const formData = new FormData();
        formData.append('status', status);

        return api({
          url: `/api/private-access/${id}`,
          method: 'PATCH',
          data: formData,
        });
      },
      onSettled: async () => {
        return await queryClient.invalidateQueries({ queryKey: ['notif'] });
      },
    }),
  );

  const handleRequest = ({
    user_id,
    status,
  }: {
    user_id: string;
    status: string;
  }) => {
    request({ id: user_id, status: status });
  };

  return (
    <DashboardLayout>
      <Seo title='Profile' />
      <main className='px-10 pb-10'>
        <section className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Typography variant='h2'>Profile</Typography>
            <ShareModal
              public_key={user?.data.data.public_key}
              symmetric_key={user?.data.data.symmetric_key}
            >
              {({ openModal }) => (
                <Button type='button' onClick={openModal} leftIcon={FiShare2}>
                  Share key
                </Button>
              )}
            </ShareModal>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-6 border rounded-lg px-6 py-4'>
            <div className='py-2 space-y-1'>
              <Typography variant='s3' className='text-base-icon'>
                Nama
              </Typography>
              <Typography variant='s2'>{user?.data.data.name}</Typography>
            </div>
            <div className='py-2 space-y-1'>
              <Typography variant='s3' className='text-base-icon'>
                Email
              </Typography>
              <Typography variant='s2'>{user?.data.data.email}</Typography>
            </div>
            <div className='py-2 space-y-1'>
              <Typography variant='s3' className='text-base-icon'>
                Phone Number
              </Typography>
              <Typography variant='s2'>
                {user?.data.data.telp_number}
              </Typography>
            </div>
            <div className='py-2 space-y-1'>
              <Typography variant='s3' className='text-base-icon'>
                Role
              </Typography>
              <Typography variant='s2'>{user?.data.data.role}</Typography>
            </div>
            <div className='py-2 space-y-1 max-w-full'>
              <Typography variant='s3' className='text-base-icon'>
                Private Key
              </Typography>
              <Typography variant='s2' className='truncate'>
                {user?.data.data.private_key
                  ? user?.data.data.private_key
                  : '-'}
              </Typography>
            </div>
            <div className='py-2 space-y-1 max-w-full'>
              <Typography variant='s3' className='text-base-icon'>
                Public Key
              </Typography>
              <Typography variant='s2' className='truncate'>
                {user?.data.data.public_key ? user?.data.data.public_key : '-'}
              </Typography>
            </div>
            <div className='py-2 space-y-1 max-w-full'>
              <Typography variant='s3' className='text-base-icon'>
                Symmetric Key
              </Typography>
              <Typography variant='s2' className='truncate'>
                {user?.data.data.symmetric_key
                  ? user?.data.data.symmetric_key
                  : '-'}
              </Typography>
            </div>
          </div>
        </section>

        <section className='mt-8'>
          <Typography variant='h2'>Notifications</Typography>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[25rem] overflow-x-auto mt-3.5 border-t border-b border-collapse'>
              <thead className='border-b bg-slate-50 overflow-x-auto'>
                <tr className='w-full'>
                  <th className='flex items-center justify-center py-4'>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='w-full divide-y overflow-x-auto'>
                {(notifData?.data.data ?? []).map(
                  ({ name, email, id }, index) => (
                    <tr key={index} className='w-full even:bg-slate-100'>
                      <td className='flex items-center justify-center py-4'>
                        {index + 1}
                      </td>
                      <td>
                        <Typography className='text-center'>{name}</Typography>
                      </td>
                      <td>
                        <Typography className='text-center'>{email}</Typography>
                      </td>
                      <td>
                        <div className='flex justify-center items-center gap-2'>
                          <Button
                            type='button'
                            size='small'
                            variant='outline'
                            isLoading={requestIsLoading}
                            icon={HiOutlineCheck}
                            onClick={() => {
                              handleRequest({
                                user_id: id,
                                status: 'approved',
                              });
                            }}
                          />
                          <Button
                            type='button'
                            size='small'
                            variant='outline'
                            isLoading={requestIsLoading}
                            icon={HiOutlineX}
                            onClick={() => {
                              handleRequest({
                                user_id: id,
                                status: 'rejected',
                              });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
