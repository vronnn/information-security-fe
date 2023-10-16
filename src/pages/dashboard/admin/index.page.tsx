import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { FiEye } from 'react-icons/fi';

import WithAuth from '@/components/hoc/WithAuth';
import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Typography from '@/components/typography/Typography';
import useServerTable from '@/hooks/useServerTable';
import { buildPaginatedTableURL } from '@/lib/table';
import { PaginatedApiResponse } from '@/types/api';
import { User } from '@/types/entities/user';

export default WithAuth(DashboardAdminPage, ['admin']);
function DashboardAdminPage() {
  //#region  //*=========== Table Def ===========
  const { tableState, setTableState } = useServerTable<Omit<User, 'token'>>({
    pageSize: 100,
  });
  const columns: ColumnDef<Omit<User, 'token'>>[] = [
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
      size: 10,
      maxSize: 8,
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      size: 100,
      minSize: 120,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      size: 120,
      minSize: 140,
    },
    {
      id: 'telp_number',
      header: 'Phone Number',
      accessorKey: 'telp_number',
      size: 75,
      minSize: 120,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      size: 75,
      minSize: 80,
    },
    {
      header: () => <div className='grow flex justify-center'>Action</div>,
      enableSorting: false,
      accessorKey: 'id',
      id: 'Action',
      cell: (cell) => (
        <div className='flex justify-center'>
          <ButtonLink
            href={`/dashboard/admin/${cell.row.original.id}`}
            size='small'
            variant='outline'
            icon={FiEye}
          />
        </div>
      ),
      size: 20,
      enableResizing: true,
    },
  ];
  //#endregion  //*======== Table Def ===========

  //#region  //*=========== Fetch Table ===========
  const url = buildPaginatedTableURL({
    baseUrl: '/api/user/admin',
    tableState,
  });
  const { data: dataUser, isLoading } = useQuery<
    PaginatedApiResponse<Omit<User, 'token'>[]>,
    Error
  >([url]);
  //#endregion  //*======== Fetch Table ===========

  return (
    <DashboardLayout>
      <Seo title='Admin' />
      <div className='mt-2 space-y-4 px-10'>
        <Typography variant='h2'>User Management</Typography>
        <ServerTable
          columns={columns}
          data={dataUser?.data ?? []}
          meta={dataUser?.meta}
          tableState={tableState}
          setTableState={setTableState}
          withFilter
          isLoading={isLoading}
          placeholder='Search...'
          className='mt-8'
        />
      </div>
    </DashboardLayout>
  );
}
