import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

type TOptionProps = {
  children: React.ReactNode;
  icon?: IconType;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function TOption({
  children,
  icon: Icon,
  placeholder,
  value,
  onChange,
}: TOptionProps) {
  return (
    <div
      className={clsxm(
        'relative group flex items-center rounded-lg px-2.5 bg-white hover:bg-base-bluegray min-h-[1.875rem] md:min-h-[2rem]',
        'focus-within:ring focus-within:ring-blue-500 focus-visible:ring focus-visible:ring-blue-500',
      )}
    >
      {Icon && (
        <div className='pointer-events-none absolute inset-y-0 left-2.5 flex items-center'>
          <Icon className='text-base text-base-secondary' />
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        className={clsxm(
          'block rounded-lg pr-[2px] pl-6 py-1 text-sm text-base-secondary font-medium mt-[1.5px] appearance-none entries-option',
          'min-h-[1.875rem] md:min-h-[2rem] bg-white group-hover:bg-base-bluegray font-medium',
          'border-none outline-none focus:border-none focus:outline-none focus:ring-0',
        )}
      >
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
}
