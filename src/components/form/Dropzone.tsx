import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Controller, get, useFormContext } from 'react-hook-form';
import { TbPhotoOff, TbPhotoPlus } from 'react-icons/tb';

import FilePreview from '@/components/form/FilePreview';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import { FileWithPreview } from '@/types/dropzone';

type DropzoneInputProps = {
  id: string;
  label: string | null;
  accept?: Accept;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: Record<string, unknown>;
};

export default function DropzoneInput({
  id,
  label,
  accept,
  helperText,
  readOnly = false,
  hideError = false,
  validation,
}: DropzoneInputProps) {
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

  const fileValue = getValues(id);
  const [file, setFile] = React.useState<FileWithPreview | null>(
    fileValue ?? null,
  );

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
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
      maxSize: 1000000,
    });

  return (
    <div>
      {withLabel && (
        <Typography
          as='label'
          variant='s3'
          className='text-base-black'
          htmlFor={id}
        >
          {label}
        </Typography>
      )}

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

      {!readOnly && !file && (
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => (
            <div
              className={clsxm([
                'focus:ring-blue-800 group focus:outline-none',
                withLabel && 'mt-1',
              ])}
              {...getRootProps()}
            >
              <input {...field} value={undefined} {...getInputProps()} />
              <div className='pr-[.1px] w-full'>
                <div
                  className={clsxm(
                    'w-full cursor-pointer rounded-lg min-h-[10rem]',
                    'flex flex-col items-center justify-center gap-y-2 px-4 py-6',
                    error || isDragReject
                      ? 'dropzone-border-error border-red-500 group-focus:border-red-500'
                      : isDragActive || isFocused
                      ? 'dropzone-border-ondrag group-focus:border-blue-500'
                      : 'dropzone-border group-focus:border-blue-500',
                  )}
                >
                  <div className='w-10 h-10 text-base-icon -z-10'>
                    <TbPhotoPlus className='w-full h-full' />
                  </div>
                  <div className='text-center -z-10 text-base-secondary'>
                    {!isDragReject ? (
                      <Typography className='text-mid'>
                        Drag and drop file here
                        <span className={clsxm(isDragActive && 'hidden')}>
                          , or click to upload
                        </span>
                      </Typography>
                    ) : (
                      <Typography className='text-red-500'>
                        Please drop the supported file extension only
                      </Typography>
                    )}
                    <Typography variant='c0' className='mt-1'>
                      1 file(s) remaining
                    </Typography>
                  </div>
                </div>
              </div>
              {helperText && (
                <Typography variant='c2' className='mt-1 text-base-secondary'>
                  {helperText}
                </Typography>
              )}
              {!hideError && error && (
                <Typography variant='c2' className='mt-1 text-red-500'>
                  {error.message?.toString()}
                </Typography>
              )}
            </div>
          )}
        />
      )}

      {file && (
        <ul className='mt-1 divide-y divide-gray-300 rounded-lg border border-gray-300'>
          <FilePreview
            readOnly={readOnly}
            file={file}
            deleteFile={deleteFile}
          />
        </ul>
      )}
    </div>
  );
}
