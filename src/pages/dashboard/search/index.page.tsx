import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiSend, FiTrash } from 'react-icons/fi';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineBarsArrowDown } from 'react-icons/hi2';

import Button from '@/components/buttons/Button';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import TextArea from '@/components/form/TextArea';
import WithAuth from '@/components/hoc/WithAuth';
import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import KeyModal from '@/pages/dashboard/search/KeyModal';
import { ApiReturn } from '@/types/api';
import { UserDisplayedProps, UserProps } from '@/types/entities/user';

type publicForm = {
  public_share_key: string;
};

type requestUserForm = {
  user_owner_id: string;
};

export default WithAuth(SearchPage, ['user']);
function SearchPage() {
  const queryClient = useQueryClient();
  const publicMethods = useForm<publicForm>();
  const privateRequestMethods = useForm<requestUserForm>();

  const { handleSubmit: handlePublicSubmit } = publicMethods;
  const { handleSubmit: handleRequestSubmit } = privateRequestMethods;

  const { data: requestData } = useQuery<
    AxiosResponse<ApiReturn<UserDisplayedProps[]>>,
    Error
  >({
    queryKey: ['request'],
    queryFn: () => {
      return api.get('/api/private-access/request');
    },
  });

  const { data: users, isLoading: usersIsLoading } = useQuery<
    AxiosResponse<ApiReturn<UserProps[]>>
  >({
    queryKey: ['/api/user/all'],
    queryFn: () => {
      return api.get('/api/user/all');
    },
    staleTime: Infinity,
  });

  const userOptions: { value: string; label: string }[] =
    users?.data.data.map(({ user_id, name }) => ({
      value: user_id,
      label: name,
    })) ?? [];

  const { mutate: requestUser, isLoading: requestUserIsLoading } =
    useMutationToast(
      useMutation({
        mutationFn: (data: requestUserForm) => {
          return api.post('/api/private-access', data);
        },
        onSettled: async () => {
          return await queryClient.invalidateQueries({ queryKey: ['request'] });
        },
      }),
    );

  const { mutate: deleteRequest, isLoading: deleteRequestIsLoading } =
    useMutationToast(
      useMutation({
        mutationFn: ({ id }: { id: string }) => {
          return api.delete(`/api/private-access/${id}`);
        },
        onSettled: async () => {
          return await queryClient.invalidateQueries({ queryKey: ['request'] });
        },
      }),
    );

  const onPublicSubmit = (data: publicForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const onRequestSubmit = (data: requestUserForm) => {
    requestUser(data);
  };

  const handleDelete = ({ id }: { id: string }) => {
    deleteRequest({ id });
  };

  return (
    <DashboardLayout>
      <Seo title='Search' />
      <main className='px-10'>
        <Tabs defaultValue='private'>
          <TabsList>
            <TabsTrigger value='private'>Private Sharing</TabsTrigger>
            <TabsTrigger value='public'>Public Sharing</TabsTrigger>
          </TabsList>
          <TabsContent value='public'>
            <FormProvider {...publicMethods}>
              <form
                onSubmit={handlePublicSubmit(onPublicSubmit)}
                className='relative mt-6'
              >
                <TextArea
                  id='public_share_key'
                  label={null}
                  placeholder='Enter the encrypted symmetric key here ...'
                  validation={{ required: 'Key must be filled' }}
                  rows={5}
                />
                <Button
                  type='submit'
                  icon={HiOutlineBarsArrowDown}
                  className='absolute top-3 right-3'
                  iconClassName='text-xl'
                />
              </form>
            </FormProvider>
          </TabsContent>
          <TabsContent value='private'>
            <section className='mt-6'>
              <FormProvider {...privateRequestMethods}>
                <form onSubmit={handleRequestSubmit(onRequestSubmit)}>
                  <div className='flex items-center gap-2.5 mt-3.5'>
                    <SearchableSelectInput
                      id='user_owner_id'
                      label={null}
                      placeholder='Pick a user to request'
                      options={userOptions}
                      isLoading={usersIsLoading}
                      validation={{
                        required: 'user must be filled',
                      }}
                      menuHeight='8rem'
                      className='grow'
                      containerClassName='grow'
                    />
                    <Button
                      type='submit'
                      variant='outline'
                      leftIcon={FiSend}
                      isLoading={requestUserIsLoading}
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </FormProvider>
              <table className='w-full mt-3.5 border-t border-b border-collapse'>
                <thead className='border-b bg-slate-50'>
                  <tr className='w-full'>
                    <th className='flex items-center justify-center py-4'>
                      No
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Pending</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='w-full divide-y'>
                  {(requestData?.data.data ?? []).map(
                    ({ name, email, user_id, status, id }, index) => (
                      <tr key={index} className='w-full even:bg-slate-100'>
                        <td className='flex items-center justify-center py-4'>
                          {index + 1}
                        </td>
                        <td>
                          <Typography className='text-center'>
                            {name}
                          </Typography>
                        </td>
                        <td>
                          <Typography className='text-center'>
                            {email}
                          </Typography>
                        </td>
                        <td>
                          <div className='flex justify-center items-center'>
                            <Typography
                              variant='c0'
                              className={clsxm(
                                'rounded-lg px-3 py-1 border',
                                status === 'pending' &&
                                  'bg-orange-100 text-orange-500 border border-orange-500',
                                status === 'approved' &&
                                  'text-green-500 bg-green-100 border-green-500',
                                status === 'rejected' &&
                                  'text-red-500 bg-red-100 border-red-500',
                              )}
                            >
                              {status}
                            </Typography>
                          </div>
                        </td>
                        <td>
                          <div className='flex justify-center items-center'>
                            {status === 'rejected' ? (
                              <Button
                                type='button'
                                size='small'
                                variant='outline'
                                isLoading={deleteRequestIsLoading}
                                icon={FiTrash}
                                onClick={() => {
                                  handleDelete({ id });
                                }}
                              />
                            ) : (
                              <KeyModal requestedId={user_id}>
                                {({ openModal }) => (
                                  <Button
                                    type='button'
                                    size='small'
                                    variant='outline'
                                    icon={HiOutlineEye}
                                    onClick={openModal}
                                    disabled={status === 'pending'}
                                  />
                                )}
                              </KeyModal>
                            )}
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
}
