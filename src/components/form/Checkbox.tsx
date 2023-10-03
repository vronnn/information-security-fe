import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

enum CheckboxSize {
  'small',
  'base',
  'large',
}

type CheckboxProps = {
  name: string;
  label: string | null;
  /** Add value only if you're using grouped checkbox, omit value if using a single checkbox */
  value?: string | number;
  validation?: RegisterOptions;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  errorExample?: boolean;
  size?: keyof typeof CheckboxSize;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>;

export default function Checkbox({
  name,
  label,
  value,
  validation,
  helperText,
  readOnly = false,
  hideError = false,
  errorExample = false,
  disabled,
  size = 'base',
  className,
  containerClassName,
  textClassName,
  ...rest
}: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  const withLabel = label !== null;

  return (
    <div className={containerClassName}>
      <div
        className={clsxm(
          'flex items-center gap-2.5 ml-[2px]',
          disabled && 'cursor-not-allowed',
        )}
      >
        <div className='relative leading-[0]'>
          <input
            {...register(name, validation)}
            {...rest}
            type='checkbox'
            name={name}
            id={`${name}_${value}`}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
            className={clsxm(
              'shrink-0 cursor-pointer shadow-sm peer appearance-none',
              // accent class for changing input base color (the content color adjust the accent)
              'ring-1 ring-base-icon rounded accent-blue-600',
              'checked:bg-blue-600 checked:ring-blue-600 hover:checked:ring-blue-700 hover:checked:!bg-blue-700 focus:checked:bg-blue-600 active:checked:bg-blue-700 active:checked:ring-blue-700',
              (readOnly || disabled) &&
                'cursor-not-allowed bg-gray-50 disabled:ring-gray-300 disabled:checked:bg-blue-400 disabled:checked:ring-blue-400 hover:disabled:checked:!bg-blue-400',
              (error || errorExample) &&
                'accent-red-500 ring-red-400 !shadow-error',
              //#region  //*=========== size ===========
              size === 'small' && ['h-3.5 w-3.5'],
              size === 'base' && ['h-4 w-4'],
              size === 'large' && ['h-[1.125rem] w-[1.125rem]'],
              //#endregion  //*======== size ===========
              className,
            )}
            aria-describedby={name}
          />
          <svg
            className={clsxm(
              'absolute top-1/2 -translate-y-[46%] left-1/2 -translate-x-1/2 hidden peer-checked:block pointer-events-none',
              size === 'small' && ['h-3 w-3'],
              size === 'base' && ['h-3.5 w-3.5'],
              size === 'large' && ['h-4 w-4'],
            )}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#fff'
            strokeWidth='3.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='20 6 9 17 4 12'></polyline>
          </svg>
        </div>
        {withLabel && (
          <Typography
            as='label'
            variant={size === 'small' ? 'b4' : size === 'large' ? 'b2' : 'd'}
            className={clsxm(
              '!text-base-black',
              (readOnly || disabled) && '!cursor-not-allowed',
              size === 'large' && 'font-normal',
              textClassName,
            )}
            htmlFor={`${name}_${value}`}
          >
            {label}
          </Typography>
        )}
      </div>
      {helperText && (
        <Typography variant='c2' className='mt-1 text-base-secondary'>
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant='c2' className='mt-1 text-red-500'>
          {error.message?.toString()}
        </Typography>
      )}
    </div>
  );
}
