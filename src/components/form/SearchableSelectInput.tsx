import * as React from 'react';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { FiChevronDown, FiX } from 'react-icons/fi';
import Select, { components, MultiValue, StylesConfig } from 'react-select';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import { ExtractProps } from '@/lib/helper';

export type SearchableSelectInputProps = {
  id: string;
  label: string | null;
  placeholder?: React.ReactNode;
  validation?: RegisterOptions;
  type?: string;
  isMulti?: boolean;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  options: { value: string; label: string }[];
  containerClassName?: string;
  menuHeight?: string;
} & React.ComponentPropsWithoutRef<'select'> &
  ExtractProps<Select>;

export default function SearchableSelectInput({
  id,
  label,
  placeholder,
  validation,
  isMulti = false,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  options,
  containerClassName,
  menuHeight,
  ...rest
}: SearchableSelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  const customStyles: StylesConfig = {
    control: (styles, state) => ({
      ...styles,
      // red-500 and gray-300
      border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
      '&:hover': {
        border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
      },
      boxShadow: 'none',
      transition: 'none',
      '&:focus-within': {
        border: `1px solid ${error ? '#EF4444' : 'var(--color-primary-500)'}`,
        boxShadow: `0 0 0 1px ${
          error ? '#EF4444' : 'var(--color-primary-500)'
        }`,
      },
      '*': {
        boxShadow: 'none !important',
      },
      borderRadius: '0.5rem',
      padding:
        state.isMulti && state.hasValue
          ? '2px .75rem 2px 0.225rem'
          : '2px 0.75rem',
      '@media (min-width: 768px)': {
        padding:
          state.isMulti && state.hasValue
            ? '3.5px .75rem 3.5px 0.275rem'
            : '2px 0.75rem',
      },
      background: disabled || readOnly ? '#F3F4F6' : undefined,
      cursor: 'pointer',
    }),
    valueContainer: (styles, state) => ({
      ...styles,
      padding: 0,
      gap: state.isMulti && state.hasValue ? '0.05rem' : '0.5rem',
      maxHeight: '4.5rem',
      '@media (min-width: 768px)': {
        maxHeight: '4.875rem',
      },
      overflowY: 'auto',
    }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: menuHeight ? menuHeight : '16rem',
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      caretColor: error ? '#ef4444' : 'var(--color-primary-600)',
      color: '#212121',
      '::placeholder': {
        color: '#9a9a9a',
      },
    }),
    placeholder: (style) => ({
      ...style,
      color: '#9a9a9a',
      fontSize: '15px',
      lineHeight: '22px',
      '@media (min-width: 768px)': {
        fontSize: '16px',
        lineHeight: '24px',
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: 0,
      },
      padding: '1px 0',
      gap: '4px',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: '#9AA2B1',
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#9AA2B1',
      '&:hover': {
        color: '#707070',
      },
    }),
    clearIndicator: (styles) => ({
      ...styles,
      color: '#9AA2B1',
      '&:hover': {
        color: '#707070',
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? '#fff' : '#212121',
      background: state.isSelected
        ? 'var(--color-primary-500)'
        : state.isFocused
        ? 'var(--color-primary-100)'
        : 'white',
      ':hover': {
        background: state.isSelected
          ? 'var(--color-primary-500)'
          : 'var(--color-primary-100)',
      },
      fontSize: '14px',
      lineHeight: '20px',
      '@media (min-width: 768px)': {
        fontSize: '15px',
        lineHeight: '22px',
      },
    }),
    multiValue: (styles, state) => ({
      ...styles,
      background: state.data ? 'var(--color-primary-100)' : '#fff',
      paddingLeft: state.data ? '3px' : 0,
      color: 'var(--color-primary-700)',
      borderRadius: '6px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      maxHeight: '24px',
      maxWidth: '120px', // Adjust this value as needed
      '@media (min-width: 768px)': {
        maxWidth: '145px', // Adjust this value as needed
        maxHeight: '26px',
      },
      boxShadow: `0 0 0 1px ${error ? '#EF4444' : 'var(--color-primary-500)'}`,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      height: '24px',
      minWidth: '24px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      '@media (min-width: 768px)': {
        height: '26px',
        minWidth: '26px',
      },
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      fontSize: '13px',
      '@media (min-width: 768px)': {
        fontSize: '13.5px',
      },
    }),
  };

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
      <div
        className={clsxm(
          'relative',
          withLabel && 'mt-1',
          (readOnly || disabled) && 'cursor-not-allowed',
        )}
      >
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => (
            <Select
              {...field}
              instanceId={id}
              value={
                isMulti
                  ? (field.value ?? []).map(
                      (value: unknown) =>
                        options.find((option) => option.value === value) ??
                        null,
                    )
                  : options.find((opt) => opt.value === field.value)
              }
              onChange={(selectedOptions) => {
                isMulti
                  ? field.onChange(
                      (
                        selectedOptions as MultiValue<(typeof options)[number]>
                      ).map((option) => option.value),
                    )
                  : field.onChange(
                      (selectedOptions as (typeof options)[number])?.value ??
                        '',
                    );
              }}
              isDisabled={disabled}
              isClearable
              isMulti={isMulti}
              menuPlacement='auto'
              closeMenuOnSelect={!isMulti}
              placeholder={placeholder}
              options={options}
              classNames={{
                control: () =>
                  '!min-h-[2.25rem] md:!min-h-[2.5rem] text-mid md:text-base placeholder:text-base-placeholder',
              }}
              styles={customStyles}
              components={{
                DropdownIndicator: (props) => (
                  <components.DropdownIndicator {...props}>
                    <FiChevronDown className='text-xl' />
                  </components.DropdownIndicator>
                ),
                ClearIndicator: (props) => (
                  <components.ClearIndicator {...props}>
                    <FiX className='mr-0.5 text-lg' />
                  </components.ClearIndicator>
                ),
                MultiValueRemove: (props) => (
                  <components.MultiValueRemove {...props}>
                    <FiX size={14} />
                  </components.MultiValueRemove>
                ),
              }}
              {...rest}
            />
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
    </div>
  );
}
