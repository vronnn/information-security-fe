import * as React from 'react';

import clsxm from '@/lib/clsxm';

export enum TypographyVariant {
  'j0',
  'j1',
  'j2',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  's0',
  's1',
  's2',
  'sm',
  's3',
  's4',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'c0',
  'c1',
  'c2',
  't',
  'd',
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType = 'p'>({
  as,
  children,
  className,
  variant = 'b2',
  ...rest
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        //#region  //*=========== Variants ===========
        [
          variant === 'j0' && ['md:text-5xl font-bold'],
          variant === 'j1' && ['md:text-4xl font-bold'],
          variant === 'j2' && ['md:text-3xl font-bold'],
          variant === 'h1' && ['md:text-2xl font-semibold'],
          variant === 'h2' && ['md:text-xl font-semibold'],
          variant === 'h3' && ['md:text-lg font-semibold'],
          variant === 'h4' && ['md:text-base font-semibold'],
          variant === 'h5' && ['text-sm font-semibold'],
          variant === 's0' && ['md:text-xl font-medium'],
          variant === 's1' && ['md:text-lg font-medium'],
          variant === 's2' && ['md:text-base font-medium'],
          variant === 'sm' && ['text-mid font-medium'],
          variant === 's3' && ['text-sm font-medium'],
          variant === 's4' && ['text-xs font-medium'],
          variant === 'b1' && ['md:text-lg font-normal'],
          variant === 'b2' && ['md:text-base font-normal'],
          variant === 'b3' && ['md:text-base font-light'],
          variant === 'b4' && ['text-sm font-normal'],
          variant === 'b5' && ['text-sm font-light'],
          variant === 'c0' && ['text-xs font-normal'],
          variant === 'c1' && ['text-xs font-light'],
          variant === 'c2' && ['text-[11px] md:text-xs leading-[14px]'],
          // modal and dialog variant for poppins font
          variant === 't' && ['text-macro md:text-macro font-semibold'],
          variant === 'd' && ['!text-mid md:text-mid font-normal'],
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
