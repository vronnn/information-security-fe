import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type TextAreaProps = {
  id: string;
  label: string | null;
  rows?: number;
  placeholder?: string;
  validation?: RegisterOptions;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  id,
  label,
  rows = 3,
  placeholder,
  validation,
  helperText,
  readOnly = false,
  hideError = false,
  containerClassName,
  disabled,
  ...rest
}: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography
          as='label'
          variant='s3'
          className='text-base-black'
          htmlFor={id}
        >
          {label}
        </Typography>
      )}
      <div className='text-mid'>
        <textarea
          {...register(id, validation)}
          {...rest}
          name={id}
          id={id}
          rows={rows}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={clsxm(
            'block w-full rounded-lg shadow-sm',
            'px-3.5 py-2.5 border border-gray-300 text-base-dark caret-blue-600',
            'focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
            (readOnly || disabled) &&
              'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500 caret-red-600',
          )}
          aria-describedby={id}
        />
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
