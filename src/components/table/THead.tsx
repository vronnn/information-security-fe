import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type THeadProps<T extends RowData> = {
  omitSort?: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  omitSort,
  table,
  className,
  ...rest
}: THeadProps<T>) {
  return (
    <thead
      className={clsxm('border-b border-gray-200 bg-gray-50', className)}
      {...rest}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            // console.log(header.id, header.getSize(), header.getResizeHandler());
            return (
              <th
                key={header.id}
                scope='col'
                {...{
                  colSpan: header.colSpan,
                  style: {
                    width: header.getSize(),
                  },
                }}
                className='py-[12.5px] text-left text-mid text-base-dark font-semibold capitalize'
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={clsxm(
                      'relative flex items-center py-1 px-4 text-mid md:text-mid',
                    )}
                  >
                    <div
                      className={clsxm(
                        'flex items-center gap-2 w-full group',
                        !omitSort && header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : 'justify-center',
                      )}
                      onClick={
                        omitSort
                          ? () => null
                          : header.column.getToggleSortingHandler()
                      }
                    >
                      {typeof flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      ) === 'string' ? (
                        <Typography variant='d' className='font-semibold'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Typography>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                      {!omitSort &&
                      header.column.getCanSort() &&
                      !header.column.getIsSorted() ? (
                        <VscTriangleDown className='w-2.5 rotate-180 fill-transparent transition duration-150 group-hover:fill-base-black shrink-0' />
                      ) : (
                        {
                          asc: (
                            <VscTriangleDown className='w-2.5 rotate-180 fill-base-black shrink-0' />
                          ),
                          desc: (
                            <VscTriangleDown className='w-2.5 fill-base-black shrink-0' />
                          ),
                        }[header.column.getIsSorted() as string] ?? null
                      )}
                    </div>
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `${
                          index != headerGroup.headers.length - 1 && 'resizer'
                        } ${
                          header.column.getIsResizing()
                            ? 'isResizing bg-gray-400'
                            : 'bg-gray-300'
                        } w-[1px] hover:bg-gray-400 ${
                          !header.column.columnDef.enableResizing && 'hidden'
                        }`,
                        //#region  //*=========== For onChange columnResizeMode only ===========
                        // style: {
                        //   transform: header.column.getIsResizing()
                        //     ? `translateX(${
                        //         table.getState().columnSizingInfo.deltaOffset
                        //       }px)`
                        //     : 'translateX(0px)',
                        // },
                        //#endregion  //*======== For onChange columnResizeMode only ===========
                      }}
                    />
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
