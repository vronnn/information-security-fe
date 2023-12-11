import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { AxiosResponse } from 'axios';
import { PencilLine, Shield } from 'lucide-react';
import React from 'react';
import { FiEye } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import WithAuth from '@/components/hoc/WithAuth';
import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Typography from '@/components/typography/Typography';
import useServerTable from '@/hooks/useServerTable';
import api from '@/lib/axios';
import { buildGetFileUrl } from '@/lib/file';
import { buildPaginatedTableURL } from '@/lib/table';
import MessageModal from '@/pages/dashboard/inbox/MessageModal';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn, PaginatedApiResponse } from '@/types/api';
import { Notif } from '@/types/entities/message';
import { UserProps } from '@/types/entities/user';

export default WithAuth(InboxPage, ['user']);
function InboxPage() {
  const user = useAuthStore.useUser();
  const { tableState, setTableState } = useServerTable<Notif>({ pageSize: 10 });
  const columns: ColumnDef<Notif>[] = [
    {
      id: 'numbering',
      header: 'No',
      cell: (cell) => (
        <div className='text-center'>
          {tableState.pagination.pageSize * tableState.pagination.pageIndex +
            cell.row.index +
            1}
        </div>
      ),
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
    },
    {
      header: 'Message',
      accessorKey: 'body_content',
    },
    {
      header: () => <div className='grow flex justify-center'>Action</div>,
      enableSorting: false,
      accessorKey: 'filepath',

      id: 'Action',
      cell: (cell) => {
        const fileUrl = buildGetFileUrl({
          base_url: '/api/file/get',
          mode: 'aes',
          filename: cell.row.original.filepath,
        });
        return (
          <div className='flex items-center justify-center gap-2'>
            <Button
              size='small'
              variant='outline'
              icon={FiEye}
              onClick={() => handleDownloadFile(fileUrl)}
            />
            <ButtonLink
              href='/dashboard/inbox/verify'
              size='small'
              variant='outline'
              icon={Shield}
              iconClassName='w-3.5 h-3.5 text-gray-500'
            />
          </div>
        );
      },
    },
  ];

  //#region  //*=========== Fetch Data ===========
  const url = buildPaginatedTableURL({
    baseUrl: '/api/digital_signature/notifications',
    tableState,
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<Notif[]>,
    Error
  >({
    queryKey: [url],
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  //#endregion  //*======== Fetch Data ===========

  const NotifData = React.useMemo(() => {
    return queryData;
  }, [queryData]);

  //#region  //*=========== Get All User ===========
  const { data: users, isLoading: usersIsLoading } = useQuery<
    AxiosResponse<ApiReturn<UserProps[]>>
  >({
    queryKey: ['/api/user/all'],
    queryFn: () => {
      return api.get('/api/user/all');
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const userOptions: { value: string; label: string }[] =
    users?.data.data
      .filter(({ email }) => email !== user?.email)
      .map(({ email, name }) => ({
        value: email,
        label: name,
      })) ?? [];
  //#endregion  //*======== Get All User ===========

  const handleDownloadFile = async (fileUrl: string) => {
    try {
      api
        .get(fileUrl, {
          responseType: 'arraybuffer',
        })
        .then((res) => {
          const blob = new Blob([res.data], { type: 'application/pdf' });

          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.target = '_blank';
          link.rel = 'noopener noreferrer';

          link.click();
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <Seo title='Inbox' />
      <main className='px-10'>
        <div className='flex items-center justify-between'>
          <Typography variant='h2' className='text-lg'>
            My Notifications
          </Typography>
          <MessageModal options={userOptions} optionsIsLoading={usersIsLoading}>
            <Button leftIcon={PencilLine} leftIconClassName='w-4 h-4'>
              Tulis
            </Button>
          </MessageModal>
        </div>
        <section className='mt-6'>
          <ServerTable
            columns={columns}
            data={NotifData?.data ?? []}
            meta={queryData?.meta}
            tableState={tableState}
            setTableState={setTableState}
            withFilter
            withColumnVisibility
            isLoading={isLoading}
            placeholder='Search...'
            className='mt-8'
          />
        </section>
      </main>
    </DashboardLayout>
  );
}
