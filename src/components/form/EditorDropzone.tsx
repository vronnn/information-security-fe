import dynamic from 'next/dynamic';
import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { TbPhotoOff } from 'react-icons/tb';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
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
};
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function EditorDropzone({
  id,
  accept,
  helperText,
  readOnly = false,
  hideError = false,
  maxSize = 1000000,
  validation,
  className,
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
  const [loading, setLoading] = React.useState(false);

  async function mockEncryption(file: File) {
    setLoading(true);
    setContent('Uploading file...');

    return new Promise<File>((resolve) => {
      setTimeout(() => {
        resolve(file);
        setContent(generateString(40));
        setLoading(false);
      }, 3000);
    });
  }

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

        await mockEncryption(acceptedFile);
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
    <Tabs defaultValue='editor' className={clsxm('w-full', className)}>
      <TabsList>
        <TabsTrigger value='editor'>Write</TabsTrigger>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
      </TabsList>
      <TabsContent value='editor'>
        <div className='rounded-lg border border-gray-300 p-2'>
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
                        rows={6}
                        placeholder='Write something or drag and drop file here'
                        className='w-full h-full px-3.5 py-2.5 text-mid focus:outline-none'
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                        value={content}
                      />
                    </div>
                  </div>

                  <div className='pt-1 flex items-center gap-1'>
                    {loading && <CgSpinner className='animate-spin mt-1' />}
                    {isDragReject ? (
                      <Typography variant='c0' className='text-red-500 mt-1'>
                        Please drop the supported file extension only
                      </Typography>
                    ) : (
                      helperText && (
                        <Typography
                          variant='c0'
                          className='mt-1 text-base-secondary'
                        >
                          {loading ? 'Wait for file encryption...' : helperText}
                        </Typography>
                      )
                    )}
                  </div>
                  {!hideError && error && (
                    <Typography variant='c2' className='mt-1 text-red-500'>
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
        <FileDisplay readOnly={readOnly} file={file} deleteFile={deleteFile} />
      </TabsContent>
    </Tabs>
  );
}
