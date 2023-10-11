import 'react-image-lightbox-rotation/style.css';

import * as React from 'react';
import { pdfjs } from 'react-pdf';

import FileFetch from '@/components/fetch/FileFetch';
import ImageFetch from '@/components/fetch/ImageFetch';
import VideoFetch from '@/components/fetch/VideoFetch';
import { FileWithPreview } from '@/types/dropzone';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

type FileDisplayProps = {
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  readOnly?: boolean;
  encryption: string;
  file_type: 'video' | 'image' | 'file';
};

export default function FileDisplay({
  encryption,
  file_type,
}: FileDisplayProps): React.ReactElement {
  return (
    <>
      <div className='space-y-2 min-h-[10rem]' key={encryption}>
        {file_type === 'image' && (
          <ImageFetch imgPath={encryption} alt='ID card' />
        )}
        {file_type === 'video' && <VideoFetch vidPath={encryption} />}
        {file_type === 'file' && <FileFetch filePath={encryption} />}
        {/* <div className='flex min-h-[2.25rem] border rounded-lg items-center justify-between py-0 pl-3 pr-3 text-sm md:min-h-[2.5rem] z-50'>
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
                  className='text-[1.375rem] text-base-secondary hover:text-base-tertiary focus:ring-0 hover:bg-transparent p-0 rounded-md'
                  icon={HiOutlineViewfinderCircle}
                />
              ) : (
                <ButtonLink
                  href={file.preview}
                  openNewTab
                  target='_blank'
                  size='icon'
                  variant='ghost'
                  icon={HiOutlineExternalLink}
                  buttonClassName='hover:bg-transparent rounded-md focus:ring-0'
                  iconClassName='text-[1.35rem] text-base-secondary hover:text-base-tertiary p-0'
                />
              )}
              {!readOnly && (
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={handleDelete}
                  className='text-[1.175rem] text-red-500 hover:text-red-700 focus:ring-0 hover:bg-transparent p-0 rounded-md'
                  icon={FiTrash2}
                />
              )}
            </div>
          </div> */}
      </div>
      {/* {file && isOpen && (
        <Lightbox
          mainSrc={file.preview}
          rotate={0}
          onCloseRequest={() => setIsOpen(false)}
        />
      )} */}
    </>
  );
}
