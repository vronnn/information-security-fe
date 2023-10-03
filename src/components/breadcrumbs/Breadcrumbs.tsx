import { useRouter } from 'next/router';
import * as React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { RiHome5Line } from 'react-icons/ri';

import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

type BreadcrumbsItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  listItem?: BreadcrumbsItem[];
  currentPath?: BreadcrumbsItem;
  withCurrentPathRouting?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumbs({
  listItem,
  currentPath,
  withCurrentPathRouting = false,
  className,
  ...rest
}: BreadcrumbsProps) {
  const router = useRouter();
  const { route } = router;
  const defaultCurrentPath = route.split('/')[route.split('/').length - 1];

  return (
    <div className={clsxm('flex items-center', className)} {...rest}>
      <UnstyledLink href='/'>
        <RiHome5Line className='text-base-secondary hover:text-base-tertiary text-lg font-medium shrink-0 pr-2 box-content' />
      </UnstyledLink>
      {listItem
        ? listItem.map((path, index) => (
            <div key={index} className='flex items-center'>
              <FiChevronRight className='text-base-secondary mt-[2px]' />
              <UnstyledLink href={path.href}>
                <Typography
                  variant='s3'
                  className='text-base-secondary hover:text-base-tertiary mt-[2px] px-2'
                >
                  {path.label}
                </Typography>
              </UnstyledLink>
            </div>
          ))
        : route
            .split('/')
            .slice(1, route.split('/').slice(1).length)
            .map((path, index) => (
              <div key={index} className='flex items-center'>
                <FiChevronRight className='text-base-secondary mt-[2px]' />
                <UnstyledLink
                  href={`/${route
                    .split('/')
                    .slice(1, route.split('/').slice(1).indexOf(path) + 2)
                    .join('/')}`}
                >
                  <Typography
                    variant='s3'
                    className='text-base-secondary hover:text-base-tertiary mt-[2px] px-2'
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Typography>
                </UnstyledLink>
              </div>
            ))}
      <FiChevronRight className='text-base-secondary mt-[2px]' />
      {withCurrentPathRouting ? (
        <UnstyledLink href={currentPath ? currentPath.href : route}>
          <Typography
            variant='s3'
            className='mt-[2px] text-base-black hover:text-black pl-2'
          >
            {currentPath
              ? currentPath.label
              : defaultCurrentPath.charAt(0).toUpperCase() +
                defaultCurrentPath.slice(1)}
          </Typography>
        </UnstyledLink>
      ) : (
        <Typography variant='s3' className='mt-[2px] text-base-black pl-2'>
          {currentPath
            ? currentPath.label
            : defaultCurrentPath.charAt(0).toUpperCase() +
              defaultCurrentPath.slice(1)}
        </Typography>
      )}
    </div>
  );
}
