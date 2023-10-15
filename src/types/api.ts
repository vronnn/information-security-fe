export type ApiResponse<T> = {
  config: object;
  data: T;
};

export type ApiReturn<T> = {
  success: boolean;
  message: string;
  data: T;
  code?: number;
};

export type ApiError = {
  message: string;
  status: boolean;
  error: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  meta: {
    page: number;
    max_page: number;
    total_data?: number;
  };
}
