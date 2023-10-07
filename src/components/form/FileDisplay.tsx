import 'react-image-lightbox-rotation/style.css';

import Image from 'next/image';
import * as React from 'react';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { HiOutlineExternalLink, HiOutlinePaperClip } from 'react-icons/hi';
import { TbPhotoCheck, TbScanEye } from 'react-icons/tb';
import Lightbox from 'react-image-lightbox-rotation';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import { FileWithPreview } from '@/types/dropzone';

type FileDisplayProps = {
  file: FileWithPreview | null;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  readOnly?: boolean;
};

export default function FileDisplay({
  deleteFile,
  file,
  readOnly,
}: FileDisplayProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file!);
  };

  const isImageType = file ? file.type.startsWith('image/') : false;
  const isVideoType = file ? file.type.startsWith('video/') : false;

  return (
    <>
      {file ? (
        <div className='space-y-2' key={file.preview}>
          {isImageType && (
            <div className='flex justify-center py-4 rounded-lg max-h-52'>
              <Image
                src={file.preview}
                alt='image'
                width={400}
                height={400}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
          {isVideoType && (
            <div className='flex justify-center py-4 rounded-lg'>
              <video
                src={file.preview}
                controls
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </div>
          )}
          <div className='flex min-h-[2.25rem] border rounded-lg items-center justify-between py-0 pl-3 pr-3 text-sm md:min-h-[2.5rem] z-50'>
            <div className='flex w-0 flex-1 items-center'>
              {isImageType ? (
                <TbPhotoCheck
                  className='h-5 w-5 flex-shrink-0 text-base-secondary'
                  aria-hidden='true'
                />
              ) : isVideoType ? (
                <AiOutlineVideoCamera
                  className='h-5 w-5 flex-shrink-0 text-base-secondary'
                  aria-hidden='true'
                />
              ) : (
                <HiOutlinePaperClip
                  className='h-5 w-5 flex-shrink-0 text-base-secondary'
                  aria-hidden='true'
                />
              )}
              <Typography
                variant='d'
                className='ml-2 w-0 flex-1 truncate text-base-black'
              >
                {file.name}
              </Typography>
            </div>
            <div className='ml-4 flex flex-shrink-0 items-center gap-1.5'>
              {isImageType ? (
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                  className='text-[1.375rem] text-base-secondary hover:text-base-tertiary hover:bg-transparent p-0 rounded-md'
                  icon={TbScanEye}
                />
              ) : (
                <ButtonLink
                  href={file.preview}
                  openNewTab
                  target='_blank'
                  size='icon'
                  variant='ghost'
                  icon={HiOutlineExternalLink}
                  buttonClassName='hover:bg-transparent rounded-md'
                  iconClassName='text-[1.35rem] text-base-secondary hover:text-base-tertiary p-0'
                />
              )}
              {!readOnly && (
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={handleDelete}
                  className='text-[1.175rem] text-red-500 hover:text-red-700 focus:ring-red-500 hover:bg-transparent p-0 rounded-md'
                  icon={FiTrash2}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex min-h-[2.25rem] border rounded-md items-center justify-between py-0 pl-3 pr-3 text-sm md:min-h-[2.5rem] z-50'>
          No file uploaded
        </div>
      )}

      {file && isOpen && (
        <Lightbox
          mainSrc={file.preview}
          rotate={0}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
