import 'react-image-lightbox-rotation/style.css';

import * as React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { TbPhotoCheck, TbPhotoShare, TbScanEye } from 'react-icons/tb';
import Lightbox from 'react-image-lightbox-rotation';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import { FileWithPreview } from '@/types/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  readOnly?: boolean;
};

export default function FilePreview({
  deleteFile,
  file,
  readOnly,
}: FilePreviewProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const imagesType = ['image/png', 'image/jpg', 'image/jpeg'];
  const typeIncluded = imagesType.includes(file.type);

  return (
    <>
      <li
        className='flex min-h-[2.25rem] items-center justify-between py-0 pl-3 pr-3 text-sm md:min-h-[2.5rem] z-50'
        key={file.name}
      >
        <div className='flex w-0 flex-1 items-center'>
          {typeIncluded ? (
            <TbPhotoCheck
              className='h-5 w-5 flex-shrink-0 text-base-secondary'
              aria-hidden='true'
            />
          ) : (
            <TbPhotoShare
              className='h-5 w-5 flex-shrink-0 text-base-secondary'
              aria-hidden='true'
            />
          )}
          <Typography className='ml-2 w-0 flex-1 truncate !text-mid md:!text-base text-base-black'>
            {file.name}
          </Typography>
        </div>
        <div className='ml-4 flex flex-shrink-0 items-center gap-1.5'>
          {typeIncluded ? (
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
      </li>
      {isOpen && (
        <Lightbox
          mainSrc={file.preview}
          rotate={0}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
