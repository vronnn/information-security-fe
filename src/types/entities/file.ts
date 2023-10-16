export type onDropFileResponse = {
  path: string;
  file_name: string;
  file_type: 'video' | 'image' | 'file';
  encryption: string;
  aws_key: string;
  aes_plain_text: string;
  aes_block_cipher: string;
  aes_ciphertext?: string;
  aes_gcm?: string;
  aes_nonce?: string;
  aes_result: string;
  elapsed_time: string;
};

export type onDropFileRequirement = {
  file: File;
  file_type: 'video' | 'image' | 'file';
};

export type fileProps = {
  path: string;
  file_name: string;
  file_type: 'video' | 'image' | 'file';
  encryption: string;
  mode: 'aes' | 'des' | 'rc4';
};
