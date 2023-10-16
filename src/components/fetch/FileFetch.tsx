import * as React from 'react';
import { CgFileDocument, CgSpinner } from 'react-icons/cg';
import { FiTrash } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Document, Page } from 'react-pdf';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { buildGetFileUrl } from '@/lib/file';
import { FileWithPreview } from '@/types/dropzone';

type FileFetchProps = {
  filePath: string;
  label?: string;
  width?: number;
  height?: number;
  fileClassName?: string;
  file?: FileWithPreview;
  file_name: string;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  withOption?: boolean;
  mode: string;
} & React.ComponentPropsWithoutRef<'div'>;

const FileFetch = ({
  filePath,
  file_name,
  withOption = true,
  deleteFile,
  file,
  mode,
  className,
  fileClassName,
  ...props
}: FileFetchProps) => {
  const [fileSrc, setFileSrc] = React.useState<string>();

  const getFileURL = React.useCallback(async ({ url }: { url: string }) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        setFileSrc(URL.createObjectURL(blob));
      });
  }, []);

  React.useEffect(() => {
    if (filePath) {
      const getFileUrl = buildGetFileUrl({
        base_url: '/api/file/get',
        mode: mode,
        filename: filePath,
      });
      getFileURL({ url: getFileUrl });
    }
  }, [getFileURL, filePath, mode]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file!);
  };

  return (
    <>
      <div {...props} className='cursor-pointer'>
        {fileSrc && (
          <div
            className={clsxm(
              'flex flex-col md:flex-row justify-center gap-2 min-w-full w-fit py-4 rounded-lg',
              className,
            )}
            style={{
              width: '100%',
              height: 'auto',
            }}
          >
            <Document
              file={fileSrc as string}
              loading={
                <div
                  className='grid place-items-center'
                  style={{ height: '400px' }}
                >
                  <div className='flex items-center gap-2 text-base-black'>
                    <CgSpinner className='animate-spin' />{' '}
                    <Typography variant='d'>Decrypting...</Typography>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className={clsxm('border w-fit', fileClassName)}
              />
            </Document>

            {withOption && (
              <div className='flex justify-between md:flex-col h-full gap-2 mt-2'>
                <div className='flex items-center gap-2 md:hidden'>
                  <CgFileDocument className='text-lg' />
                  <Typography variant='d' className='text-base-tertiary'>
                    {file_name}
                  </Typography>
                </div>
                <div className='flex items-center md:flex-col gap-2'>
                  <ButtonLink
                    href={fileSrc as string}
                    openNewTab
                    target='_blank'
                    icon={HiOutlineExternalLink}
                    variant='outline'
                    size='icon'
                    className='hover:bg-gray-100 focus:ring-0'
                    buttonClassName='rounded text-gray-500'
                    iconClassName='text-mid'
                  />
                  <Button
                    icon={FiTrash}
                    variant='outline'
                    size='icon'
                    className='text-red-500 hover:bg-red-100 rounded focus:ring-0'
                    onClick={handleDelete}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FileFetch;
