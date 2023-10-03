import { RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import clsxm from '@/lib/clsxm';
import { buildPaginationControl } from '@/lib/pagination';

type PaginationControlProps<T extends RowData> = {
  data: T[];
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function PaginationControl<T extends RowData>({
  data,
  table,
  isLoading,
  className,
  ...rest
}: PaginationControlProps<T>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const paginationControl = buildPaginationControl(currentPage, pageCount, 1);
  const mobilePaginationControl = buildPaginationControl(
    currentPage,
    pageCount,
    0,
  );

  const handlePageControlClick = (page: string | number) => {
    if (page !== '...') {
      table.setPageIndex((page as number) - 1);
    }
  };

  return (
    <div
      className={clsxm(
        'flex items-center justify-between gap-x-2 md:justify-end',
        className,
      )}
      {...rest}
    >
      <div className='flex gap-1.5'>
        <Button
          variant='ghost'
          size='small'
          leftIcon={HiChevronLeft}
          disabled={!table.getCanPreviousPage() || isLoading}
          onClick={() => table.previousPage()}
        >
          prev
        </Button>
        <div className='hidden md:flex items-center gap-2'>
          {paginationControl.map((page, index) => (
            <Button
              key={index}
              variant='ghost'
              size='small'
              className={clsxm(
                'w-8 h-8 p-0 text-blue-600',
                currentPage === page &&
                  'bg-blue-600 text-blue-100 hover:bg-blue-600 hover:text-blue-100',
              )}
              onClick={() => handlePageControlClick(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <div className='flex items-center gap-2 md:hidden'>
          {mobilePaginationControl.map((page, index) => (
            <Button
              key={index}
              variant='ghost'
              size='small'
              className={clsxm(
                'w-8 h-8 p-0 text-blue-600',
                currentPage === page &&
                  'bg-blue-600 text-blue-100 hover:bg-blue-600 hover:text-blue-100',
              )}
              onClick={() => handlePageControlClick(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant='ghost'
          size='small'
          rightIcon={HiChevronRight}
          disabled={
            !table.getCanNextPage() ||
            data.length < table.getState().pagination.pageSize ||
            isLoading
          }
          onClick={() => table.nextPage()}
        >
          next
        </Button>
      </div>
    </div>
  );
}
