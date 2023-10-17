import { fileProps } from '@/types/entities/file';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  telp_number: string;
  is_verified: boolean;
  token: string;
};

export type MeRespond = {
  id: string;
  name: string;
  email: string;
  role: string;
  telp_number: string;
  is_verified: boolean;
};

export type DetailUser = {
  files: fileProps[];
} & MeRespond;
