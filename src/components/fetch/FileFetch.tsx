import 'react-image-lightbox-rotation/style.css';

import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';
import Lightbox from 'react-image-lightbox-rotation';
import { Document, Page } from 'react-pdf';

import Typography from '@/components/typography/Typography';
import api from '@/lib/axios';

type FileFetchProps = {
  filePath: string;
  label?: string;
  width?: number;
  height?: number;
  fileClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const FileFetch = ({ filePath, ...props }: FileFetchProps) => {
  const [fileSrc, setFileSrc] = React.useState<string>();
  const [isOpen, setIsOpen] = React.useState(false);

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
      getFileURL({ url: `/api/file/${filePath}` });
    }
  }, [getFileURL, filePath]);

  return (
    <>
      <div {...props} className='cursor-pointer'>
        {fileSrc && (
          <div className='flex justify-center min-w-full w-fit py-4 rounded-lg'>
            <Document
              file={fileSrc as string}
              loading={
                <div
                  className='grid place-items-center'
                  style={{ height: '400px' }}
                >
                  <div className='flex items-center gap-2 text-base-black'>
                    <CgSpinner className='animate-spin' />{' '}
                    <Typography variant='d'>Loading...</Typography>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={1}
                height={400}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className='border'
                onClick={() => setIsOpen(true)}
              />
            </Document>
          </div>
        )}
        {isOpen && (
          <Lightbox
            mainSrc={fileSrc as string}
            rotate={0}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default FileFetch;
