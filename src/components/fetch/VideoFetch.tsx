import 'react-image-lightbox-rotation/style.css';

import * as React from 'react';
import Lightbox from 'react-image-lightbox-rotation';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';

type VideoFetchProps = {
  vidPath: string;
  label?: string;
  width?: number;
  height?: number;
  vidClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const VideoFetch = ({
  vidPath,
  className,
  vidClassName,
  ...props
}: VideoFetchProps) => {
  const [vidSrc, setVideoSrc] = React.useState<string>();
  const [isOpen, setIsOpen] = React.useState(false);

  const getVideoURL = React.useCallback(async ({ url }: { url: string }) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'video/mp4' });
        setVideoSrc(URL.createObjectURL(blob));
      });
  }, []);

  React.useEffect(() => {
    if (vidPath) {
      getVideoURL({ url: `/api/file/${vidPath}` });
    }
  }, [getVideoURL, vidPath]);

  return (
    <>
      <div {...props} className='cursor-pointer'>
        {vidSrc && (
          <div
            className={clsxm('flex justify-center py-4 rounded-lg', className)}
          >
            <video
              src={vidSrc as string}
              controls
              style={{ maxWidth: '100%', maxHeight: '200px' }}
              className={vidClassName}
              onClick={() => setIsOpen(true)}
            />
          </div>
        )}
        {isOpen && (
          <Lightbox
            mainSrc={vidSrc as string}
            rotate={0}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default VideoFetch;
