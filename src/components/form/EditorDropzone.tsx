import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Controller, get, useFormContext } from 'react-hook-form';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import { TbPhotoOff } from 'react-icons/tb';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggles/ToggleGroup';
import Typography from '@/components/typography/Typography';
import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { buildPostFileUrl } from '@/lib/file';
import { ApiError, ApiReturn } from '@/types/api';
import { FileWithPreview } from '@/types/dropzone';

const FileDisplay = dynamic(() => import('@/components/form/FileDisplay'), {
  ssr: false,
});

type EditorDropzoneInputProps = {
  id: string;
  label: string | null;
  accept?: Accept;
  maxSize?: number;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: Record<string, unknown>;
  className?: string;
  defaultTab?: string;
  rows?: number;
};

type onDropFileResponse = {
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

type onDropFileRequirement = {
  file: File;
  file_type: 'video' | 'image' | 'file';
};

export default function EditorDropzone({
  id,
  label,
  accept,
  helperText,
  readOnly = false,
  hideError = false,
  maxSize = 1000000,
  validation,
  className,
  defaultTab = 'editor',
  rows = 6,
}: EditorDropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;
  const [mode, setMode] = React.useState('aes');
  const [tab, setTab] = React.useState(defaultTab);
  // const [encryptFileIsLoading, setEncryptFileIsLoading] = React.useState(false);

  // const encryptFile = React.useCallback(
  //   async ({ file, file_type }: { file: File; file_type: string }) => {
  //     setEncryptFileIsLoading(true);
  //     setContent('Uploading file...');
  //     setTimeout(() => {
  //       console.log(file, file_type);
  //       setEncryptFileIsLoading(false);
  //       setContent(file.name);
  //     }, 2000);
  //   },
  //   [],
  // );

  const url = buildPostFileUrl({
    base_url: '/api/file',
    mode: mode,
  });

  const {
    mutateAsync: encryptFile,
    isLoading: encryptFileIsLoading,
    data: encryptedData,
    reset: resetFile,
  } = useMutation<
    AxiosResponse<ApiReturn<onDropFileResponse>>,
    AxiosError<ApiError>,
    onDropFileRequirement
  >((data) =>
    api.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  );

  const encrypt = React.useCallback(
    async ({ file, file_type }: onDropFileRequirement) => {
      setContent('Encrypting file ...');
      encryptFile({ file, file_type }).then((res) => {
        setContent(
          res.data.data.aes_gcm
            ? res.data.data.aes_gcm
            : res.data.data.aes_ciphertext
            ? res.data.data.aes_ciphertext
            : res.data.data.aes_result,
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, encryptFile],
  );

  const fileValue = getValues(id);
  const [file, setFile] = React.useState<FileWithPreview | null>(
    fileValue ?? null,
  );
  const [content, setContent] = React.useState('');

  const onDrop = React.useCallback(
    async <T extends File>(
      acceptedFiles: T[],
      rejectedFiles: FileRejection[],
    ) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, null);
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message,
        });
      } else {
        const acceptedFile = acceptedFiles[0];
        const acceptedFilePreview = Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        });
        setFile(acceptedFilePreview);
        setValue(id, acceptedFilePreview, {
          shouldValidate: true,
        });
        clearErrors(id);
      }
    },
    [id, setValue, setError, clearErrors],
  );

  React.useEffect(() => {
    if (file) {
      encrypt({
        file,
        file_type: file.type.startsWith('video/')
          ? 'video'
          : file.type.startsWith('image/')
          ? 'image'
          : 'file',
      });
    }
  }, [mode, url, encrypt, file]);

  React.useEffect(() => {
    return () => {
      if (file && file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const deleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFile(null);
    setValue(id, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setContent('');
    resetFile();
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxFiles: 1,
      maxSize,
      noClick: true,
    });

  return (
    <Tabs
      defaultValue={defaultTab}
      onValueChange={(value) => {
        setTab(value);
      }}
      className={clsxm('w-full', className)}
    >
      <div className='flex items-center justify-between'>
        <TabsList>
          <TabsTrigger value='editor'>Write</TabsTrigger>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
        </TabsList>
        {tab === 'editor' && (
          <ToggleGroup
            type='single'
            rovingFocus={true}
            defaultValue='aes'
            value={mode}
            onValueChange={(value) => {
              if (value) setMode(value);
            }}
          >
            <ToggleGroupItem value='aes'>
              <Typography variant='s3' className='uppercase'>
                aes
              </Typography>
            </ToggleGroupItem>
            <ToggleGroupItem value='des'>
              <Typography variant='s3' className='uppercase'>
                des
              </Typography>
            </ToggleGroupItem>
            <ToggleGroupItem value='rc4'>
              <Typography variant='s3' className='uppercase'>
                rc4
              </Typography>
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      </div>

      <TabsContent value='editor'>
        <div
          className={clsxm(
            'rounded-lg border border-gray-300 p-2 relative',
            withLabel && 'pt-0',
            helperText && 'pb-0',
          )}
        >
          <div className='py-1 px-0.5 flex items-center justify-between'>
            {withLabel && (
              <Typography
                as='label'
                variant='s3'
                className='text-base-black font-semibold'
                htmlFor={id}
              >
                {label}
              </Typography>
            )}
            {encryptedData?.data.data.elapsed_time && (
              <div className='flex items-center gap-1'>
                <AiOutlineFieldTime />
                <Typography variant='b4' className='text-base-black'>
                  {encryptedData.data.data.elapsed_time}
                </Typography>
              </div>
            )}
          </div>
          {readOnly && !file && (
            <div
              className={clsxm(
                'flex items-center gap-2.5 w-full rounded-lg',
                'border border-gray-300 shadow-sm',
                'min-h-[2.25rem] md:min-h-[2.5rem]',
                'px-3.5 py-0 border border-gray-300 text-base-secondary',
              )}
            >
              <TbPhotoOff className='h-5 w-5 flex-shrink-0 text-base-secondary' />
              <Typography> No file uploaded</Typography>
            </div>
          )}

          {!readOnly && (
            <Controller
              name={id}
              control={control}
              rules={validation}
              render={({ field }) => (
                <div
                  className={clsxm([
                    'focus:ring-blue-800 group focus:outline-none',
                  ])}
                  {...getRootProps()}
                >
                  <input {...field} value={undefined} {...getInputProps()} />
                  <div className='pr-[.1px] w-full'>
                    <div
                      className={clsxm(
                        'w-full cursor-pointer rounded-lg',
                        'flex flex-col items-center justify-center gap-y-2 p-0.5',
                        error || isDragReject
                          ? 'dropzone-border-error border-red-500 group-focus:border-red-500'
                          : isDragActive || isFocused
                          ? 'dropzone-border-ondrag group-focus:border-blue-500'
                          : 'dropzone-border group-focus:border-blue-500',
                      )}
                    >
                      <textarea
                        rows={rows}
                        placeholder='Write something or drag and drop file here'
                        className='w-full h-full px-3.5 py-2.5 text-mid focus:outline-none'
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                        value={content}
                      />
                    </div>
                  </div>
                  <div className='flex items-center gap-1 py-1.5 px-0.5'>
                    {encryptFileIsLoading && (
                      <CgSpinner className='animate-spin' />
                    )}
                    {isDragReject ? (
                      <Typography variant='c0' className='text-red-500'>
                        Please drop the supported file extension only
                      </Typography>
                    ) : (
                      helperText && (
                        <Typography
                          variant='c0'
                          className='text-base-secondary'
                        >
                          {encryptFileIsLoading
                            ? 'Wait for file encryption...'
                            : helperText}
                        </Typography>
                      )
                    )}
                  </div>
                  {!hideError && error && (
                    <Typography variant='c2' className='pb-1.5 text-red-500'>
                      {error.message?.toString()}
                    </Typography>
                  )}
                </div>
              )}
            />
          )}
        </div>
      </TabsContent>
      <TabsContent value='preview'>
        {encryptedData ? (
          <FileDisplay
            file={file!}
            file_name={encryptedData.data.data.file_name}
            readOnly={readOnly}
            deleteFile={deleteFile}
            encryption={encryptedData.data.data.encryption}
            file_type={encryptedData.data.data.file_type}
            mode={mode}
          />
        ) : (
          <div className='min-h-[16.65rem] rounded-lg border border-gray-300 p-2 grid place-items-center'>
            <Typography variant='d' className='text-[#9a9a9a]'>
              No file uploaded yet
            </Typography>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
