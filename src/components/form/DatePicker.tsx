import 'react-datepicker/dist/react-datepicker.css';

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type DatePickerProps = {
  id: string;
  label: string | null;
  placeholder?: string;
  validation?: RegisterOptions;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  format?: string | string[];
  readOnly?: boolean;
  helperText?: string;
  hideError?: boolean;
  containerClassName?: string;
} & Omit<ReactDatePickerProps, 'onChange'>;

export default function DatePicker({
  id,
  label,
  placeholder,
  validation,
  defaultYear,
  defaultMonth,
  defaultValue,
  format,
  readOnly = false,
  helperText,
  hideError = false,
  disabled,
  containerClassName,
  ...rest
}: DatePickerProps) {
  const {
    formState: { errors },
    control,
    clearErrors,
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className={clsxm('relative', containerClassName)}>
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

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div
              className={clsxm(
                'relative text-mid md:text-base',
                withLabel && 'mt-1',
              )}
            >
              <ReactDatePicker
                name={id}
                onChange={onChange}
                // onChangeRaw clears the bug required error each time the value is changed
                onChangeRaw={() => {
                  clearErrors(id);
                }}
                onBlur={onBlur}
                selected={value ? new Date(value) : undefined}
                className={clsxm(
                  'flex w-full rounded-lg shadow-sm',
                  'min-h-[2.25rem] md:min-h-[2.5rem]',
                  'px-3.5 py-0 border border-gray-300 text-base-dark caret-blue-600',
                  'focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
                  (readOnly || disabled) &&
                    'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                  error &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500 caret-red-600',
                )}
                placeholderText={placeholder}
                ariaDescribedBy={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat={format ? format : 'dd/MM/yyyy'}
                readOnly={readOnly}
                disabled={disabled}
                {...rest}
              />
              <HiOutlineCalendar className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-lg text-base-secondary' />
            </div>
          </>
        )}
      />
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
