import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

const TAG_SIZE = ['small', 'base'] as const;
type TagSize = (typeof TAG_SIZE)[number];

enum TagVariant {
  'DEFAULT',
  'primary',
  'secondary',
  'success',
  'danger',
  'orange',
  'warning',
  'aqua',
}

type TagProps = {
  children: React.ReactNode;
  size?: TagSize;
  color?: keyof typeof TagVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      className,
      color = 'DEFAULT',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={clsxm(
          'bg-opacity-10',
          [
            size === 'small' && ['py-0.5 text-xs'],
            size === 'base' && ['py-1 text-sm'],
          ],

          //#region  //*=========== Color ===========
          color === 'DEFAULT' && 'bg-gray-500 text-base-black',
          color === 'primary' && 'bg-primary-500 text-primary-600',
          color === 'secondary' && 'bg-secondary-500 text-secondary-600',
          color === 'danger' && 'bg-red-500 text-red-600',
          color === 'orange' && 'bg-orange-500 text-orange-600',
          color === 'warning' && 'bg-yellow-500 text-yellow-600 ',
          color === 'success' && 'bg-green-500 text-green-600',
          //#endregion  //*======== Color ===========
          'inline-flex items-center gap-1 rounded-full px-3',
          LeftIcon && 'pl-3',
          RightIcon && 'pr-3',
          className,
        )}
        ref={ref}
        {...rest}
      >
        {LeftIcon && (
          <div>
            <LeftIcon size='1em' className={clsxm(leftIconClassName)} />
          </div>
        )}
        {children}
        {RightIcon && (
          <div>
            <RightIcon size='1em' className={clsxm(rightIconClassName)} />
          </div>
        )}
      </div>
    );
  },
);

export default Tag;
