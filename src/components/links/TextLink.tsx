import * as React from 'react';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

enum TextLinkSize {
  'small',
  'base',
  'large',
}

export enum TextLinkVariant {
  'basic',
  'primary',
  'danger',
}

type TextLinkProps = {
  size?: keyof typeof TextLinkSize;
  variant?: keyof typeof TextLinkVariant;
} & UnstyledLinkProps;

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (
    { className, children, size = 'base', variant = 'primary', ...rest },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center justify-center font-medium group',
          'focus:outline-none focus-visible:ring',
          'transition duration-100',
          'disabled:cursor-not-allowed',
          'underline decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current',
          //#region  //*=========== Size ===========
          size === 'small' && 'text-xs md:text-sm gap-1.5',
          size === 'base' && 'text-sm  md:text-mid gap-2',
          size === 'large' && 'text-mid md:text-base gap-2.5',
          //#endregion  //*======== Size ===========

          //#region  //*=========== Variant ===========
          variant === 'primary' && [
            'text-blue-600 hover:text-blue-700 active:text-blue-800',
            'focus-visible:ring-primary-400',
          ],
          variant === 'basic' && [
            'text-base-black hover:text-base-dark active:text-base-dark',
            'focus-visible:ring-base-secondary',
          ],
          variant === 'danger' && [
            'text-red-500 hover:text-red-600 active:text-red-700',
            'focus-visible:ring-red-300',
          ],
          //#endregion  //*======== Variant ===========
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default TextLink;
