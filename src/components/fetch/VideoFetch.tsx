import * as React from 'react';
import { FiTrash } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { buildGetFileUrl } from '@/lib/file';
import { FileWithPreview } from '@/types/dropzone';

type VideoFetchProps = {
  vidPath: string;
  label?: string;
  width?: number;
  height?: number;
  vidClassName?: string;
  fileClassName?: string;
  file: FileWithPreview;
  file_name: string;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview,
  ) => void;
  withOption?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const VideoFetch = ({
  vidPath,
  className,
  vidClassName,
  withOption = true,
  deleteFile,
  file,
  ...props
}: VideoFetchProps) => {
  const [vidSrc, setVideoSrc] = React.useState<string>();

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
      const getFileUrl = buildGetFileUrl({
        base_url: '/api/file/get',
        mode: 'aes',
        filename: vidPath,
      });
      getVideoURL({ url: getFileUrl });
    }
  }, [getVideoURL, vidPath]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  return (
    <>
      <div {...props}>
        {vidSrc && (
          <div
            className={clsxm(
              'flex justify-center py-4 rounded-lg gap-2',
              className,
            )}
          >
            <video
              src={vidSrc as string}
              controls
              style={{ maxWidth: '100%', maxHeight: '266px' }}
              className={vidClassName}
            />
            {withOption && (
              <div className='flex flex-col h-full gap-2'>
                <Button
                  icon={FiTrash}
                  variant='outline'
                  size='icon'
                  className='text-red-500 hover:bg-red-100 rounded focus:ring-0'
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VideoFetch;
