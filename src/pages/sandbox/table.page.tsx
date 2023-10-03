import { Popover, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { BsFilter } from 'react-icons/bs';
import { FiChevronDown, FiChevronLeft, FiEye } from 'react-icons/fi';

import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import Button from '@/components/buttons/Button';
import Checkbox from '@/components/form/Checkbox';
import Layout from '@/components/layouts/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Typography from '@/components/typography/Typography';
import useServerTable from '@/hooks/useServerTable';
import clsxm from '@/lib/clsxm';
import { buildPaginatedTableURL } from '@/lib/table';
import { PaginatedApiResponse } from '@/types/api';

export type User = {
  id: string;
  name: string;
  salary: number;
  email: string;
  role: 'developer' | 'manager' | 'staff';
};

export default function TablePage() {
  const [roleFilter, setRoleFilter] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);

  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<User>({
    pageSize: 10,
  });
  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      //#region  //*=========== For Select Row Only ===========
      // header: ({ table }) => (
      //   <IndeterminateCheckbox
      //     {...{
      //       checked: table.getIsAllRowsSelected(),
      //       indeterminate:
      //         table.getIsSomeRowsSelected() ||
      //         table.getIsSomePageRowsSelected() ||
      //         (Object.keys(table.getState().rowSelection).length > 0 &&
      //           !table.getIsAllPageRowsSelected()),
      //       onChange: table.getToggleAllRowsSelectedHandler(),
      //     }}
      //   />
      // ),
      // cell: ({ row }) => (
      //   <div className='flex justify-center'>
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: row.getIsSelected(),
      //         disabled: !row.getCanSelect(),
      //         indeterminate: row.getIsSomeSelected(),
      //         onChange: row.getToggleSelectedHandler(),
      //       }}
      //     />
      //   </div>
      // ),
      //#endregion  //*======== For Select Row Only ===========
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
      enableResizing: true,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      size: 100,
      minSize: 120,
      enableResizing: true,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      size: 160,
      minSize: 180,
      enableResizing: true,
    },
    {
      header: 'Salary',
      accessorKey: 'salary',
      cell: ({ row }) => {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.original.salary);
        return (
          <Typography variant='d' className='font-medium'>
            {formatted}
          </Typography>
        );
      },
      size: 75,
      minSize: 120,
      enableResizing: true,
    },
    {
      header: 'Role',
      accessorKey: 'role',
      size: 75,
      minSize: 110,
      enableResizing: true,
    },
    {
      header: () => <div className='grow flex justify-center'>Action</div>,
      enableSorting: false,
      accessorKey: 'id',
      id: 'Action',
      cell: () => (
        <div className='flex justify-center'>
          <Button size='small' variant='outline' icon={FiEye} />
        </div>
      ),
      size: 20,
      enableResizing: true,
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  const url = buildPaginatedTableURL({
    baseUrl: '/api/user',
    tableState,
    additionalParam: {
      role: roleFilter,
      status: statusFilter,
    },
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<User[]>,
    Error
  >([url]);
  //#endregion  //*======== Fetch Data ===========

  return (
    <Layout>
      <Seo title='Table' />
      <main className='layout min-h-screen py-10'>
        <Breadcrumbs className='hidden md:flex' />
        <ButtonLink
          size='small'
          variant='outline'
          href='/sandbox'
          leftIcon={FiChevronLeft}
          className='flex md:hidden'
        >
          Back
        </ButtonLink>
        <section className='mt-6 space-y-4'>
          <Typography variant='h2' className='text-lg'>
            Table
          </Typography>
          <pre className='text-mid md:text-base'>
            {JSON.stringify({ tableState, url, isLoading }, null, 2)}
          </pre>
          <ServerTable
            columns={columns}
            data={queryData?.data ?? []}
            meta={queryData?.meta}
            tableState={tableState}
            setTableState={setTableState}
            header={
              <UserRoleFilterPopUp
                setRoleFilter={setRoleFilter}
                setStatusFilter={setStatusFilter}
              />
            }
            withFilter
            withColumnVisibility
            isLoading={isLoading}
            placeholder='Search...'
            className='mt-8'
          />
        </section>
      </main>
    </Layout>
  );
}

//#region  //*=========== table filter popover ===========
const RoleOption: Record<User['role'], string> = {
  developer: 'Developer',
  manager: 'Manager',
  staff: 'Staff',
};

function UserRoleFilterPopUp({
  setRoleFilter,
  setStatusFilter,
}: {
  setRoleFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  //#region  //*=========== form role ===========
  const roleMethods = useForm({
    mode: 'onTouched',
  });
  const { control: roleControl } = roleMethods;
  const rolefilter = useWatch({
    control: roleControl,
    name: 'roleFilter[]',
  });
  //#endregion  //*======== form role ===========

  //#region  //*=========== form status ===========
  const statusMethods = useForm({
    mode: 'onTouched',
  });
  const { control: statusControl } = statusMethods;
  const statusFilter = useWatch({
    control: statusControl,
    name: 'statusFilter[]',
  });
  //#endregion  //*======== form status ===========

  React.useEffect(() => {
    setRoleFilter(rolefilter);
  }, [rolefilter, setRoleFilter]);

  React.useEffect(() => {
    setStatusFilter(statusFilter);
  }, [statusFilter, setStatusFilter]);

  const totalFilter =
    rolefilter !== undefined && rolefilter.length > 0
      ? statusFilter !== undefined && statusFilter.length > 0
        ? rolefilter.length + statusFilter.length
        : rolefilter.length
      : statusFilter !== undefined && statusFilter.length > 0
      ? statusFilter.length
      : undefined;

  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button as='div'>
            <Button
              variant='outline'
              size='small'
              leftIcon={BsFilter}
              rightIcon={FiChevronDown}
              className='min-w-[8rem] justify-between'
              textClassName='grow text-left text-sm flex items-center gap-1.5'
              leftIconClassName='text-lg'
              rightIconClassName={clsxm(
                'text-mid transition duration-150',
                open && '-rotate-180',
              )}
            >
              Filter{' '}
              <span
                className={clsxm(
                  'shrink-0 text-white bg-blue-600 rounded-full px-1.5 text-[10px] min-w-[20px] flex justify-center items-center max-h-[1rem]',
                  (totalFilter <= 0 || !totalFilter) && 'hidden',
                )}
              >
                {totalFilter && `${totalFilter}`}
              </span>
            </Button>
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute z-10 mt-3 w-screen max-w-[13rem] transform sm:left-1/2 sm:-translate-x-1/2 ring-1 ring-gray-50 rounded-ml'>
              <div className='overflow-hidden rounded-ml shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative bg-white p-1.5'>
                  <FormProvider {...roleMethods}>
                    <div className='flex flex-col rounded-xl'>
                      {Object.entries(RoleOption).map(([key, value]) => (
                        <Checkbox
                          key={key}
                          name='roleFilter'
                          value={key}
                          label={value}
                          size='small'
                          containerClassName='px-3 rounded-lg hover:bg-base-bluegray cursor-pointer'
                          textClassName='w-full text-sm cursor-pointer py-2'
                        />
                      ))}
                    </div>
                  </FormProvider>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
//#endregion  //*======== table filter popover ===========
