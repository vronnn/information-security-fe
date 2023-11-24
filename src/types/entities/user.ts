import { fileProps } from '@/types/entities/file';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  telp_number: string;
  is_verified: boolean;
  token: string;
  public_key: string;
  private_key: string;
  symmetric_key: string;
};

export type MeRespond = {
  id: string;
  name: string;
  email: string;
  role: string;
  telp_number: string;
  is_verified: boolean;
  public_key: string;
  private_key: string;
  symmetric_key: string;
};

export type UserDisplayedProps = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type DetailUser = {
  files: fileProps[];
} & MeRespond;
