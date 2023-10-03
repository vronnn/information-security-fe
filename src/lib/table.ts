import queryString, { StringifyOptions } from 'query-string';

import { ServerTableState } from '@/components/table/ServerTable';

type BuildPaginationTableParam = {
  /** API Base URL, with / on the front */
  baseUrl: string;
  tableState: ServerTableState;
  /** Parameter addition
   * @example include: ['user', 'officer']
   */
  additionalParam?: Record<string, unknown>;
  options?: StringifyOptions;
};

type BuildPaginationTableURL = (props: BuildPaginationTableParam) => string;

export const buildPaginatedTableURL: BuildPaginationTableURL = ({
  baseUrl,
  tableState,
  additionalParam,
  options,
}) => {
  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: {
        per_page: tableState.pagination.pageSize,
        page: tableState.pagination.pageIndex + 1,
        sort: tableState.sorting.length > 0 ? tableState.sorting[0].id : '',
        type:
          tableState.sorting.length > 0
            ? tableState.sorting[0].desc
              ? 'desc'
              : 'asc'
            : '',
        search: tableState.globalFilter,
        ...additionalParam,
      },
    },
    {
      arrayFormat: 'comma',
      skipEmptyString: true,
      ...options,
    },
  );
};
