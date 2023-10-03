import { LinkProps } from 'next/link';
import * as React from 'react';

import Button, { ButtonProps } from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';

export type ButtonLinkProps = {
  href: string;
  openNewTab?: boolean;
  className?: string;
  buttonClassName?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & ButtonProps &
  React.ComponentPropsWithRef<'a'>;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      openNewTab,
      className,
      buttonClassName,
      nextLinkProps,
      target,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        href={href}
        ref={ref}
        target={target}
        openNewTab={openNewTab}
        nextLinkProps={nextLinkProps}
        className={className}
      >
        <Button className={buttonClassName} {...rest}>
          {children}
        </Button>
      </UnstyledLink>
    );
  },
);

export default ButtonLink;
