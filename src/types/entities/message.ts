export type Notif = {
  name: string;
  email: string;
  subject: string;
  body_content: string;
  filepath: string;
};

export type MessageProps = {
  from: string;
  to: string;
  subject: string;
  body_content: string;
  body_files: File;
};

export type MessageResponse = {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  content: string;
  filepath: string;
  is_signed: true;
};

export type VerifyForm = {
  files: File;
};

export type VerifyResponse = {
  is_verified: boolean;
  name: string;
  email: string;
  date: string;
};
