import * as React from 'react';
import { IconType } from 'react-icons';
import { CgSpinner } from 'react-icons/cg';

import clsxm from '@/lib/clsxm';

export enum ButtonVariant {
  'primary',
  'secondary',
  'outline',
  'ghost',
  'danger',
  'unstyled',
}

enum ButtonSize {
  'icon',
  'small',
  'base',
  'large',
}

export type ButtonProps = {
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  isLoading?: boolean;
  icon?: IconType;
  leftIcon?: IconType;
  rightIcon?: IconType;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  textClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      icon: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconClassName,
      leftIconClassName,
      rightIconClassName,
      textClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'flex items-center justify-center rounded-lg shadow-sm group',
          'focus:outline-none focus-visible:outline',
          'font-medium transition-colors duration-75',
          'disabled:cursor-not-allowed',
          [
            size === 'icon' && ['w-6 h-6 text-sm p-0 shadow-none'],
            size === 'small' && [
              'min-h-[1.75rem] md:min-h-[2rem]',
              'gap-1.5 px-3.5 py-1 text-xs md:text-sm',
              LeftIcon && 'pl-2.5',
              RightIcon && 'pr-2.5',
              Icon && 'min-w-[1.75rem] p-0 text-sm md:min-w-[2rem] md:text-mid',
            ],
            size === 'base' && [
              'min-h-[2.25rem] md:min-h-[2.5rem]',
              'gap-2 px-4 py-1.5 text-sm md:text-mid',
              LeftIcon && 'pl-3',
              RightIcon && 'pr-3',
              Icon &&
                'min-w-[2.25rem] p-0 text-base md:min-w-[2.5rem] md:text-lg',
            ],
            size === 'large' && [
              'min-h-[2.75rem] md:min-h-[3rem]',
              'gap-2.5 px-[1.125rem] py-2 !text-mid md:!text-base',
              LeftIcon && 'pl-3.5',
              RightIcon && 'pr-3.5',
              Icon &&
                'min-w-[2.75rem] p-0 text-[19px] md:min-w-[3rem] md:text-[22px]',
            ],
          ],
          [
            variant === 'primary' && [
              'bg-blue-600 text-white',
              'border border-blue-600',
              'hover:bg-blue-700 hover:border-blue-700',
              'active:bg-blue-800 active:border-blue-800',
              'disabled:bg-blue-800 disabled:border-blue-800',
              'focus-visible:outline-blue-200',
            ],
            variant === 'secondary' && [
              'bg-blue-100 text-blue-600',
              'border border-blue-100',
              'hover:bg-blue-200 hover:border-blue-200',
              'active:bg-blue-200 active:border-blue-200',
              'disabled:bg-blue-200 disabled:border-blue-200',
              'focus:ring focus:ring-blue-600',
            ],
            variant === 'outline' && [
              'text-gray-700',
              'border border-gray-300',
              'hover:bg-base-white focus-visible:outline-base-light active:bg-base-light disabled:bg-base-light',
            ],
            variant === 'danger' && [
              'bg-red-500 text-white',
              'border border-red-500',
              'hover:bg-red-600 hover:border-red-600',
              'active:bg-red-700 active:border-red-700',
              'disabled:bg-red-700 disabled:border-red-700',
              'focus-visible:outline-red-700',
            ],
            variant === 'ghost' && [
              'hover:bg-blue-50 text-blue-600',
              'bg-transparent shadow-none',
              'focus:ring focus:ring-blue-600',
              'disabled:bg-blue-50',
            ],
          ],
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white',
              variant === 'outline' && 'text-gray-700',
              variant === 'secondary' && 'text-blue-600',
              variant === 'ghost' && 'text-blue-600',
            )}
          >
            <CgSpinner className='animate-spin' />
          </div>
        )}
        {Icon && <Icon className={clsxm(iconClassName)} />}
        {LeftIcon && !Icon && <LeftIcon className={clsxm(leftIconClassName)} />}
        {!Icon && <div className={clsxm(textClassName)}>{children}</div>}
        {RightIcon && !Icon && (
          <RightIcon className={clsxm(rightIconClassName)} />
        )}
      </button>
    );
  },
);

export default Button;
