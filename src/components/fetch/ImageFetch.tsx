/* eslint-disable @next/next/no-img-element */
import 'react-image-lightbox-rotation/style.css';

import * as React from 'react';
import { FiTrash } from 'react-icons/fi';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { TbPhoto } from 'react-icons/tb';
import Lightbox from 'react-image-lightbox-rotation';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { buildGetFileUrl } from '@/lib/file';
import { FileWithPreview } from '@/types/dropzone';

type ImageFetchProps = {
  imgPath: string;
  label?: string;
  width?: number;
  height?: number;
  imgClassName?: string;
  alt: string;
  file: FileWithPreview;
  file_name: string;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  withLabel?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const ImageFetch = ({
  imgPath,
  alt,
  className,
  imgClassName,
  file,
  file_name,
  deleteFile,
  withLabel = true,
  ...props
}: ImageFetchProps) => {
  const [imgSrc, setImgSrc] = React.useState<string>();
  const [isOpen, setIsOpen] = React.useState(false);

  const getImageURL = React.useCallback(async ({ url }: { url: string }) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const base64string = Buffer.from(
          new Uint8Array(res.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''),
          'binary',
        ).toString('base64');

        const contentType = res.headers['content-type'];
        return {
          data: `data:${contentType};base64,${base64string}`,
        };
      })
      .then((res) => {
        setImgSrc(res.data);
      });
  }, []);

  React.useEffect(() => {
    if (imgPath) {
      const getFileUrl = buildGetFileUrl({
        base_url: '/api/file/get',
        mode: 'aes',
        filename: imgPath,
      });
      getImageURL({ url: getFileUrl });
    }
  }, [getImageURL, imgPath]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  return (
    <>
      <div {...props} className='relative'>
        {imgSrc && (
          <div
            className={clsxm(
              'flex justify-center py-4 rounded-lg max-h-[16.65rem]',
              className,
            )}
          >
            <img
              src={imgSrc as string}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              className={imgClassName}
            />
          </div>
        )}
        {isOpen && (
          <Lightbox
            mainSrc={imgSrc as string}
            rotate={0}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </div>
      {withLabel && (
        <div className='flex min-h-[2.25rem] border rounded-lg items-center justify-between py-0 px-3 text-mid text-base-tertiary md:min-h-[2.5rem] z-50'>
          <div className='flex items-center gap-2'>
            <TbPhoto className='text-lg' />
            <Typography variant='d'>{file_name}</Typography>
          </div>
          <div className='flex items-center gap-1'>
            <Button
              icon={HiOutlineViewfinderCircle}
              variant='ghost'
              size='icon'
              className='text-lg text-gray-600 hover:bg-gray-100 focus:ring-0 rounded-md'
              onClick={() => setIsOpen(true)}
            />
            <Button
              icon={FiTrash}
              variant='ghost'
              size='icon'
              className='text-red-500 hover:bg-red-100 rounded-md focus:ring-0'
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageFetch;
