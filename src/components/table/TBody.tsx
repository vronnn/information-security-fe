import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
type TBodyProps<T extends RowData> = {
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  table,
  isLoading = false,
  className,
  ...rest
}: TBodyProps<T>) {
  const row = table.getRowModel().rows;
  return (
    <tbody
      className={clsxm('divide-y divide-[#EBEBEB] bg-white', className)}
      {...rest}
    >
      {isLoading && (
        <tr className='bg-white'>
          <td
            colSpan={table.getAllColumns().length}
            className='whitespace-nowrap px-6 py-4 text-center text-sm text-base-secondary'
          >
            <div className='flex items-center justify-center gap-2'>
              <CgSpinner className='animate-spin' />
              <Typography variant='b4'>Loading...</Typography>
            </div>
          </td>
        </tr>
      )}
      {row.length === 0 && !isLoading ? (
        <tr className='bg-white'>
          <td
            colSpan={table.getAllColumns().length}
            className='whitespace-nowrap px-6 py-4 text-center text-sm text-base-secondary'
          >
            <Typography variant='b4'>Data not found</Typography>
          </td>
        </tr>
      ) : (
        row.map((row) => (
          <tr
            key={row.id}
            className={clsxm(
              'even:bg-gray-50 odd:bg-white',
              // row.getIsSelected() && '!bg-base-bluegray',
            )}
          >
            {row.getVisibleCells().map((cell) => {
              // console.log(cell.column.getSize());
              return (
                <Typography
                  key={cell.id}
                  as='td'
                  className='whitespace-nowrap truncate px-4 py-3.5 !text-base-black text-mid md:text-mid'
                  title={cell.getValue() as string}
                  style={{
                    width: cell.column.getSize(),
                    maxWidth: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Typography>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}
