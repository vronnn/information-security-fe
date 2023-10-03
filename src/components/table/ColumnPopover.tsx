import { Popover, Transition } from '@headlessui/react';
import { Table } from '@tanstack/react-table';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';
import { MdOutlineViewAgenda } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/form/Checkbox';
import { EnsureIdProperty } from '@/components/table/ServerTable';
import clsxm from '@/lib/clsxm';

type ColumnPopoverProps<T extends object> = {
  table: Table<EnsureIdProperty<T>>;
};

export default function ColumnPopover<T extends object>({
  table,
}: ColumnPopoverProps<T>) {
  const methods = useForm();
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button as='div'>
            <Button
              variant='outline'
              size='small'
              leftIcon={MdOutlineViewAgenda}
              rightIcon={FiChevronDown}
              textClassName='text-sm'
              leftIconClassName='text-sm'
              rightIconClassName={clsxm(
                'text-mid transition duration-150',
                open && '-rotate-180',
              )}
            >
              Views{' '}
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
                  <FormProvider {...methods}>
                    <div className='flex flex-col rounded-xl'>
                      {table
                        .getAllLeafColumns()
                        .filter((col) => !['select'].includes(col.id))
                        .map((column) => (
                          <Checkbox
                            key={column.id}
                            name={column.id}
                            label={
                              typeof column.columnDef.header === 'string'
                                ? column.columnDef.header
                                : column.id
                            }
                            size='small'
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            disabled={
                              column.getIsVisible() &&
                              table.getVisibleLeafColumns().length <= 2
                                ? true
                                : false
                            }
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
