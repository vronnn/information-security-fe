import 'react-image-lightbox-rotation/style.css';

import Image from 'next/legacy/image';
import * as React from 'react';
import Lightbox from 'react-image-lightbox-rotation';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';

type ImageFetchProps = {
  imgPath: string;
  label?: string;
  width?: number;
  height?: number;
  imgClassName?: string;
  alt: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ImageFetch = ({
  imgPath,
  alt,
  className,
  imgClassName,
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
      getImageURL({ url: `/api/file/${imgPath}` });
    }
  }, [getImageURL, imgPath]);

  return (
    <>
      <div {...props} className='cursor-pointer'>
        {imgSrc && (
          <div
            className={clsxm(
              'flex justify-center py-4 rounded-lg max-h-52',
              className,
            )}
          >
            <Image
              src={imgSrc as string}
              alt={alt}
              width={400}
              height={400}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              className={imgClassName}
              onClick={() => setIsOpen(true)}
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
    </>
  );
};

export default ImageFetch;
