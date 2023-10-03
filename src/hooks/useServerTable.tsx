import {
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';

type useServerTableProps<T extends object> = {
  pageSize?: number;
  sort?: {
    key: Extract<keyof T, string>;
    type: 'asc' | 'desc';
  };
};

export default function useServerTable<T extends object>({
  pageSize = 10,
  sort,
}: useServerTableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [sorting, setSorting] = React.useState<SortingState>(
    sort
      ? [
          {
            id: sort.key,
            desc: sort.type === 'desc',
          },
        ]
      : [],
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  return {
    tableState: {
      globalFilter,
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
    },
    setTableState: {
      setGlobalFilter,
      setSorting,
      setPagination,
      setRowSelection,
      setColumnVisibility,
    },
  };
}
