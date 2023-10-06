import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import toast from 'react-hot-toast';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import { ApiError, ApiReturn } from '@/types/api';

type OptionType = {
  loading?: string;
  success?: string;
  error?: string;
};

export default function useMutationToast<T, K>(
  mutation: UseMutationResult<
    AxiosResponse<ApiReturn<T>>,
    AxiosError<ApiError>,
    K
  >,
  customMessages: OptionType = {},
) {
  const { data, isError, isLoading, error } = mutation;

  const toastStatus = React.useRef<string>(data ? 'done' : 'idle');

  React.useEffect(() => {
    const toastMessage = {
      ...DEFAULT_TOAST_MESSAGE,
      ...customMessages,
    };

    // If it is not the first render
    if (toastStatus.current === 'done' && !isLoading) return;

    if (isError) {
      toast.error(
        typeof toastMessage.error === 'string'
          ? toastMessage.error
          : toastMessage.error(error),
        {
          id: toastStatus.current,
        },
      );
      toastStatus.current = 'done';
    } else if (isLoading) {
      toastStatus.current = toast.loading(toastMessage.loading);
    } else if (data) {
      toast.success(
        typeof toastMessage.success === 'string'
          ? toastMessage.success
          : toastMessage.success(data.data),
      );
      toastStatus.current = 'done';
    }

    return () => {
      toast.dismiss(toastStatus.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isLoading]);

  return { ...mutation };
}
