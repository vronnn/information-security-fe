import { RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type FilterProps<T extends RowData> = {
  table: Table<T>;
  placeholder?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Filter<T extends RowData>({
  table,
  placeholder = 'Search',
  className,
  ...rest
}: FilterProps<T>) {
  const [filter, setFilter] = React.useState('');

  const handleClearFilter = () => {
    table.setGlobalFilter('');
    setFilter('');
  };

  // USE debouncing methods to ease the server request
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(filter);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filter, table]);

  return (
    <div className={clsxm('relative self-start', className)} {...rest}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <FiSearch className='text-lg md:text-xl text-base-secondary' />
      </div>
      <input
        type='text'
        value={filter ?? ''}
        onChange={(e) => {
          setFilter(String(e.target.value));
        }}
        placeholder={placeholder}
        className={clsxm(
          'flex w-full rounded-lg shadow-sm',
          'min-h-[2.25rem] md:min-h-[2.5rem] text-mid md:text-base',
          'px-9 py-0 border border-gray-300 text-base-black caret-blue-600',
          'focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
        )}
      />
      {table.getState().globalFilter !== '' && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
          <button type='button' onClick={handleClearFilter} className='p-1'>
            <FiXCircle className='text-xl text-base-secondary' />
          </button>
        </div>
      )}
    </div>
  );
}
