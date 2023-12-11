import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { FiList } from 'react-icons/fi';

import ColumnPopover from '@/components/table/ColumnPopover';
import Filter from '@/components/table/Filter';
import PaginationControl from '@/components/table/PaginationControl';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';
import TOption from '@/components/table/TOption';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import { PaginatedApiResponse } from '@/types/api';

/**
 * Assurance so that every T type in the table has an unigue 'id' prop to handle the row selection
 * Ignore it if you are not using row selection (it's a bit tricky since we're using manual pagination)
 * @see https://github.com/TanStack/table/discussions/2661
 */
export type EnsureIdProperty<T> = T extends { id: string } ? T : never;

export type ServerTableState = {
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  columnVisibility: VisibilityState;
};

type SetServerTableState = {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
};

type ServerTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data: T[];
  header?: React.ReactNode;
  tableState: ServerTableState;
  setTableState: SetServerTableState;
  meta?: PaginatedApiResponse<T>['meta'];
  omitSort?: boolean;
  columnResizeMode?: 'onChange' | 'onEnd';
  withFilter?: boolean;
  withColumnVisibility?: boolean;
  withRowSelection?: boolean;
  placeholder?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ServerTable<T extends object>({
  columns,
  data,
  header: Header,
  tableState,
  setTableState,
  meta,
  omitSort = false,
  columnResizeMode = 'onChange',
  withFilter = false,
  withColumnVisibility = false,
  withRowSelection = false,
  placeholder,
  isLoading,
  className,
  ...rest
}: ServerTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    pageCount: meta?.max_page,
    state: {
      ...tableState,
    },
    defaultColumn: {
      minSize: 1,
      size: 1,
    },
    onGlobalFilterChange: setTableState.setGlobalFilter,
    onSortingChange: setTableState.setSorting,
    onPaginationChange: setTableState.setPagination,
    onRowSelectionChange: setTableState.setRowSelection,
    onColumnVisibilityChange: setTableState.setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    autoResetAll: false,
    // getRowId: (row) => row.id,
  });

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      <div
        className={clsxm(
          'flex flex-wrap items-stretch gap-3',
          withFilter ? 'sm:justify-between' : 'sm:justify-end',
        )}
      >
        {withFilter && <Filter table={table} placeholder={placeholder} />}
        <div className='flex flex-wrap items-end gap-x-2.5 gap-y-3'>
          {Header}
          {withColumnVisibility && <ColumnPopover table={table} />}
          <TOption
            icon={FiList}
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25].map((page) => (
              <option
                key={page}
                value={page}
                className='bg-white text-base-black'
              >
                {page}
              </option>
            ))}
          </TOption>
        </div>
      </div>
      <div className='-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden md:rounded-lg'>
            <table
              style={{
                minWidth: '100%',
                width: table.getCenterTotalSize(),
              }}
            >
              <colgroup>
                {table.getVisibleLeafColumns().map((column) => {
                  return (
                    <col
                      key={column.id}
                      span={1}
                      style={{
                        /* this is a method to outsmart the fact that col & colgroup tag 
                          doesn't obey the max-width att if your table is not fixed */
                        width:
                          column.columnDef.maxSize !== undefined &&
                          !(column.columnDef.maxSize > 9999)
                            ? column.columnDef.maxSize + '%'
                            : column.columnDef.size !== 1
                            ? column.columnDef.size
                            : 'auto',
                        minWidth:
                          column.columnDef.minSize !== 1
                            ? column.columnDef.minSize
                            : 'auto',
                      }}
                    />
                  );
                })}
              </colgroup>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} isLoading={isLoading} />
            </table>
          </div>
        </div>
      </div>

      <div
        className={clsxm(
          'flex flex-col md:flex-row gap-2.5 items-center mt-4',
          withRowSelection ? 'justify-between' : 'justify-end',
        )}
      >
        {withRowSelection && (
          <Typography
            variant='b5'
            className='text-base-secondary text-xs md:text-sm'
          >
            {Object.keys(table.getState().rowSelection).length} of{' '}
            {meta?.total_data ?? '-'} row(s) selected.
          </Typography>
        )}
        <PaginationControl data={data} table={table} isLoading={isLoading} />
      </div>
    </div>
  );
}
