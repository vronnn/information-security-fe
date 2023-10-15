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
  file: FileWithPreview;
  file_name: string;
  mode: string;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  readOnly?: boolean;
  encryption: string;
  file_type: 'video' | 'image' | 'file';
};

export default function FileDisplay({
  file,
  file_name,
  mode,
  encryption,
  file_type,
  deleteFile,
}: FileDisplayProps): React.ReactElement {
  return (
    <>
      {encryption && (
        <div className='space-y-2 min-h-[10rem]' key={encryption}>
          {file_type === 'image' && (
            <ImageFetch
              imgPath={encryption}
              alt='ID card'
              className='border'
              file={file}
              file_name={file_name}
              deleteFile={deleteFile}
              mode={mode}
            />
          )}
          {file_type === 'video' && (
            <VideoFetch
              vidPath={encryption}
              file={file}
              deleteFile={deleteFile}
              file_name={file_name}
              mode={mode}
            />
          )}
          {file_type === 'file' && (
            <FileFetch
              filePath={encryption}
              deleteFile={deleteFile}
              file={file}
              file_name={file_name}
              mode={mode}
            />
          )}
        </div>
      )}
    </>
  );
}
